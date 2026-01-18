const Profile = require('../models/Profile');
const User = require('../models/User');
const Course = require('../models/Course');
const { uploadFileToCloudinary } = require('../utils/fileUploader');
const convertSecondToDuration = require('../utils/secondToDuration');
const CourseProgress = require('../models/CourseProgress');
require('dotenv').config();

//update profile.........
exports.updateProfile = async(req, res) => {
    try{
        // console.log("Request body : ",req.body);
        //get data.....
        const {
            firstName = "",
            lastName = "",
            dateOfBirth = "",
            about = "",
            contactNumber = "",
            gender = "",
        } = req.body;
        //get user Id...
        const userId = req.user.id;
        // console.log("User Id : ",userId);
        //data validation........
        if(!contactNumber || !gender || !userId){
            return res.status(400).json({
                success: false,
                message: "Some fields are missing",
            });
        }

        //update name......
        const user = await User.findByIdAndUpdate(userId, {
            firstName,
            lastName,
        });
        await user.save();

        //find profile and update additional details....
        const userDetails = await User.findById(userId);
        const profileId = userDetails.additionalDetails;
        const profileDetails = await Profile.findById(profileId);

        //update additional details.....        
        profileDetails.dateOfBirth = dateOfBirth;
        profileDetails.gender = gender;
        profileDetails.about = about;
        profileDetails.contactNumber = contactNumber;
        
        //save ...
        await profileDetails.save();

        const updatedUserDetails = await User.findById(userId)
            .populate("additionalDetails")
            .exec();

        //return response.......
        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            updatedUserDetails,
        });

    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong, while updating Profile',
            error: err.message,
        });
    }
}


//Get user all details (including additional details)...
exports.getUserAllDetails = async(req, res) => {
    try{
        //Fetch user Id....
        const id = req.user.id;
        //Get user details..
        const user = await User.findById(id).populate("additionalDetails").exec();
        //Check user exist or not...
        if(!user){
            return res.status(400).json({
                success:false,
                message:"User Not Found"
            });
        };

        return res.status(200).json({
            success:true,
            message:"User details Found",
            user,
        });
    }
    catch(err){
        console.error(err);
        return res.status(400).json({
            success:false,
            message:"Something went wrong while fetching User Details",
            error:err.message
        });
    }
}


//Update Dp...
exports.updateDP = async(req, res) => {
    try{
        //fetch user id...
        const userId = req.user.id;
        //fetch dpFile.......
        const dp = req.files.dpImage;
        //data validation.......
        if(!userId || !dp){
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }
        //upload dp to cloudinary server....
        const dpDetails = await uploadFileToCloudinary(dp, process.env.FOLDER_NAME, 1000,1000);

        //update profile.........
        const updatedProfile = await User.findByIdAndUpdate(
            userId,
            {image:dpDetails.secure_url},
            {new:true}
        );
        //return response.....
        return res.status(200).json({
            success:true,
            message:"Uploaded Display Picture Successfully",
            data : updatedProfile,
        });
    }
    catch(err){
        console.error(err);
        return res.status(400).json({
            success:false,
            message:"Something went wrong while updating User DP",
            error:err.message,

        });
    }
}


//Get user enrolled courses.........
exports.getEnrolledCourses = async(req, res) => {
    try{

        const userId = req.user.id;
        //find user enrolled courses..
        let userDetails = await User.findOne(
            {_id: userId}
        )
        .populate({
            path: "courses",
            populate: {
                path: "courseContent",
                populate: "subSection",
            },  
        })
        .exec();
        //validate..
        if (!userDetails) {
            return res.status(400).json({
                success: false,
                message: `Could not find user with id: ${userDetails}`,
            });
        }
        //Now calculate progress percentage and timeDuration of each course.
        //And add this 2 field (timeDuration & progressPercentage) in each course.
        userDetails = userDetails.toObject();

        //loop over each course
        for(var i=0; i < userDetails.courses.length; i++){
            let totalDurationInSeconds = 0;
            let totalSubSectionLength = 0;
            //loop over courseContent
            for(var j=0; j < userDetails.courses[i].courseContent.length; j++){
                //Duration........
                totalDurationInSeconds += userDetails.courses[i].courseContent[j].
                subSection.reduce((acc, curr) => acc + parseInt(curr.timeDuration), 0);
                //Add the field -> totalDuration
                userDetails.courses[i].totalDuration = convertSecondToDuration(totalDurationInSeconds);
                //SubSection Length(Total Lecture of a single course).......
                totalSubSectionLength += userDetails.courses[i].courseContent[j].subSection.length;
            }
            // Find Course progress
            const courseProgress = await CourseProgress.findOne({
                courseId: userDetails.courses[i]._id,
                userId: userId
            });
            const lectureCompletedCount = courseProgress?.completedVideos?.length;
            if(totalSubSectionLength === 0){
                userDetails.courses[i].progressPercentage = 100;
            }
            else{
                //Add field -> progressPercentage
                const multiplier = Math.pow(10, 2);
                userDetails.courses[i].progressPercentage = 
                Math.round((lectureCompletedCount / totalSubSectionLength) * 100 * multiplier) / multiplier;
            }
        }

        return res.status(200).json({
            success: true,
            message:"Enrolled Courses Get Successfully",
            data: userDetails.courses,
        });
    }
    catch(err){
        console.error(err);
        return res.status(400).json({
            success:false,
            message:"Something went wrong while fetching Enrolled Courses",
            error:err.message,
        });
    }
}


//Get instructorDashboard.........
exports.instructorDashboard = async(req, res) => {
    const userId = req.user.id;
    try{
        //fetch all courses of this instructor
        const allCourses = await Course.find({instructor: userId});
        if(!allCourses.length){
            return res.status(404).json({
                success: false,
                message: "Courses Not Fount"
            })
        }
        //Interprating how many student enrolled and how much amount generated in each courses.
        const interpretedCoursesData = allCourses.map((course) => {
            const totalEnrolledStudents = course.studentsEnrolled.length;
            const totalGeneratedAmount = course.price * totalEnrolledStudents;

            const courseDataWithStats = {
                _id: course._id,
                courseName: course.courseName,
                courseDescription: course.courseDescription,
                thumbnail: course.thumbnail,
                price: course.price,

                totalEnrolledStudents,
                totalGeneratedAmount
            }
            return courseDataWithStats;
        })
        // console.log("Interpreted Stats Data: ",interpretedCoursesData);
        return res.status(200).json({
            success: true,
            message: "Instructor ",
            data: interpretedCoursesData
        })

    }
    catch(err){
        console.error(err);
        return res.status(400).json({
            success:false,
            message:"Something went wrong while fetching instructor Dashboard",
            error:err.message,
        });
    }
}

//Delete Account......
exports.deleteAccount = async(req, res) => {
    console.log("Deleting Account");
    try{
        //get user id....
        const userId = req.user.id;

        //validation.....
        if(!userId){
            return res.status(400).json({
                success: false,
                message: "User Id missing ",
            });
        }

        // Delete Profile Assosiated with the User..
        //find profile....
        const user = await User.findById(userId);
        if(!user){
            //user not found.....
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        const profileId = userDetails.additionalDetails;
        await Profile.findByIdAndDelete(profileId);

        //Unenroll User From All the Enrolled Courses.
        //also delete from  studentsEnrolled array.
        for(const courseId of user.courses){
            await Course.findByIdAndDelete(
                courseId,
                {
                    $pull:{
                        studentsEnrolled:userId
                    }
                },
                {new:true}
            );
        }

        //delete user........
        await User.findByIdAndDelete(userId);

        //return response...
        return res.status(200).json({
			success: true,
			message: "User Account deleted successfully",
		});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong, while deleting User Account',
            error: err.message,
        });
    }
}