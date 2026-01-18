const {instance} = require('../config/razorpay');
const Course = require('../models/Course');
const User = require('../models/User');
const mailSender = require('../utils/mailSender');
const {courseEnrollmentEmail} = require('../mail/templates/courseEnrollmentEmail');
const {paymentSuccessEmail} = require('../mail/templates/paymentSuccessEmail');
const { default: mongoose } = require('mongoose');
const CourseProgress = require('../models/CourseProgress');
const crypto = require("crypto");
//load env file
require('dotenv').config();


//1.Initiate the Razorpay order and Capture the payment ........
exports.capturePayment = async(req, res) => {
    //who and which course is buying?
    //multiple courses may be coming from cart 
    const {courses} = req.body;
    const userId = req.user.id;

    //validate courses.....
    if(courses.length === 0){
        return res.status(400).json({
            success: false,
            message: 'Course  not found',
        })
    }
    
    //Calculate amount for all courses
    let totalAmount = 0;
    for(const courseId of courses){
        let course;
        //validate course.....
        try{
            course = await Course.findById(courseId);
            if(!course) {
                return res.status(200).json({
                    success:false, 
                    message:"Could not find the course",
                });
            }

            //check user already pay for the same course?
            //uid is string and in Course it is refer as Object, so convert it into Obj..
            const uid  = new mongoose.Types.ObjectId(userId);
            if(course.studentsEnrolled.includes(uid) ){
                return res.status(200).json({
                    success:false, 
                    message:"Student is already Enrolled in this course"
                });
            }
            //set amount for paying...
            totalAmount += course.price;
        }
        catch(error) {
            console.log(error);
            return res.status(500).json({
                success:false, 
                message: "Something went wrong while validating course",
                error: error.message
            });
        }
    }
    //Now create order...
    const options = {
        amount: totalAmount * 100, // totalAmount=3000*100 --> 3000.00 
        currency: "INR",
        receipt: Math.random(Date.now()).toString(), //receipt number (unique no.)..
        notes:{ //optional...
            courses,
            userId,
        }
    }
    //Initiate the payment using razorpay.....
    try{
        const paymentResponse = await instance.orders.create(options);
        // console.log("Payment Details : ",paymentResponse);

        //return response...
        return res.json({
            success:true,
            message: "Payment Initiated successfully",
            data: paymentResponse,
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false, 
            message: "Something went wrong while initiating course Order",
            error: error.message,
        });
    }
}

//3.Verify the payment And Enroll the student
exports.verifyPayment = async(req, res) => {
    //fetch data from req body
    const razorpay_order_id = req.body?.razorpay_order_id;
    const razorpay_payment_id = req.body?.razorpay_payment_id;
    const razorpay_signature = req.body?.razorpay_signature;
    const courses = req.body?.courses;
    const userId = req.user.id;
    //validate data
    if (
        !razorpay_order_id ||
        !razorpay_payment_id ||
        !razorpay_signature ||
        !courses ||
        !userId
    ) {
        return res.status(200).json({ 
            success: false, 
            message: "Payment Failed" 
        });
    }
    //some steps, you have to follow
    let body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_SECRET)
        .update(body.toString())
        .digest("hex");
    
    //compare signature
    if(razorpay_signature === expectedSignature){
        //Payment  Authorised
        //a.Enroll student
        await enrollStudent(courses, userId, res);
        //b.return response
        return res.status(200).json({ 
            success: true, 
            message: "Payment Verified" 
        });
    }
    //Payment not Authorised
    return res.status(200).json({ 
        success: false, 
        message: "Payment Failed" 
    });
}

//function for enrolling student
const enrollStudent = async (courses, userId, res) => {
    //validate
    if (!courses || !userId) {
        return res.status(400).json({
            success: false,
            message: "Please Provide Course ID and User ID",
        });
    }
    //find the course and enroll the student in it.......
    for(const courseId of courses){
        try{
            const enrolledCourse = await Course.findOneAndUpdate(
                {_id: courseId},
                {
                    $push: {
                        studentsEnrolled : userId,
                    }
                },
                {new: true},
            );
            //validate enrolled course....
            if(!enrolledCourse) {
                return res.status(500).json({
                    success:false,
                    message:'Course not Found',
                });
            }

            //find the student and add the course to their list of enrolled courses...
            //And also initiate course progress status...
            const newCourseProgress = await CourseProgress.create({
                courseId: courseId,
                userId: userId,
                completedVideos: [],
            });
            //Associate with user
            const enrolledStudent = await User.findOneAndUpdate(
                {_id: userId},
                {
                    $push:{
                        courses: courseId,
                        courseProgress: newCourseProgress._id,
                    }
                },
                {new: true},
            );
            //send course enroll confirmation mail
            const mailResponse = await mailSender(
                enrolledStudent.email,
                `Successfully Enrolled into ${enrolledCourse.courseName}`,
                courseEnrollmentEmail(
                    enrolledCourse.courseName,
                    `${enrolledStudent.firstName} ${enrolledStudent.lastName}`
                )
            );

        }
        catch(error){
            console.log(error);
            return res.status(400).json({ 
                success: false, 
                error: error.message 
            });
        }
    }
}




//2.Send Payment successful mail.....
exports.sendPaymentSuccessEmail = async(req, res) => {
    //fetch data......
    const {orderId, paymentId, amount} = req.body;
    //fetch user....
    const userId = req.user.id;
    //validate data.....
    if(!orderId || !paymentId || !amount || !userId) {
        return res.status(400).json({
            success:false, 
            message:"Please provide all the fields"
        });
    }

    try{
        //student ko dhundo......
        const enrolledStudent = await User.findById(userId);
        //send mail.....
        await mailSender(
            enrolledStudent.email,
            `Payment Recieved`,
            paymentSuccessEmail(
                `${enrolledStudent.firstName}`,
                amount/100,
                orderId, 
                paymentId
            )
        );
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false, 
            message: "Something went wrong while sending payment success email",
            error: error.message,
        });
    }
}











//verify the payment.
// exports.verifyPayment = async (req, res) => {
//     //Payment is authorized: when [signature == webhookSecret]

//     const webhookSecret = "12345678";
//     const signature = req.headers["x-razorpay-signature"];
//     //3-steos to convert webhookSecret to digest(encrypted format)..
//     const shasum =  crypto.createHmac("sha256", webhookSecret);
//     shasum.update(JSON.stringify(req.body));
//     const digest = shasum.digest("hex");

//     if(signature === digest) {
//         //Payment is Authorised
//         //Now provide the course to user....
//         //How to fetch courseId and uid? --> by notes (becoz this request is comming from razorpay not frontend)...
//         const {userId, courseId} = req.body.payload.payment.entity.notes;
//         try{
//             //find the course and enroll the student in it.......
//             const enrolledCourse = await Course.findOneAndUpdate(
//                 {_id: courseId},
//                 {
//                     $push: {
//                         studentsEnrolled : userId,
//                     }
//                 },
//                 {new: true},
//             );
//             //validate enrolled course....
//             if(!enrolledCourse) {
//                 return res.status(500).json({
//                     success:false,
//                     message:'Course not Found',
//                 });
//             }

//             //find the student and add the course to their list of enrolled courses...
//             const enrolledStudent = await User.findOneAndUpdate(
//                 {_id: userId},
//                 {
//                     $push:{
//                         courses: courseId,
//                     }
//                 },
//                 {new: true},
//             );
            
//             //Send confirmation mail to the student.......
//             const emailResponse = await mailSender(
//                 enrolledStudent.email,
//                 `Successfully Enrolled into ${enrolledCourse.courseName}`,
//                 courseEnrollmentEmail(enrolledCourse.courseName, `${enrolledStudent.firstName}`
//                 )
//             );

//             //return response.....
//             console.log(emailResponse);
//             return res.status(200).json({
//                 success:true,
//                 message:"Signature Verified and COurse Added",
//             });    

//         }
//         catch(error){
//             console.log(error);
//             return res.status(500).json({
//                 success:false, 
//                 message: "Something went wrong while verifying Signature and providing course to the user",
//                 error: error.message,
//             });
//         }
//     }
//     else{
//         //signature not matched......
//         return res.status(400).json({
//             success:false,
//             message:'Invalid request',
//         });
//     }

// }