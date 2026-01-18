const RatingAndReview = require('../models/RatingAndReview');
const User = require('../models/User');
const Course = require('../models/Course');

//Create rating and review handler.......
exports.createRatingAndReview = async(req, res) => {
    try{
        //get user.....
        const userId = req.user.id;
        //fetch data.....
        const {courseId, rating, review} = req.body;

        //check if user is enrolled or not.......
        const courseDetails = await Course.findOne(
            {
                _id: courseId, 
                studentsEnrolled:{
                    $elemMatch:{$eq: userId},
                },
            }
        );
        if(!courseDetails) {
            return res.status(404).json({
                success:false,
                message:'Student is not enrolled in the course',
            });
        }

        //check if user already reviewed this course...
        const alreadyReviewed = await RatingAndReview.findOne(
            {user: userId, course: courseId},
        );
        if(alreadyReviewed){
            return res.status(403).json({
                success:false,
                message:'Course is already reviewed by the user',
            });
        }
        //Now create RatingAndReview.......
        const newRatingAndReview = await RatingAndReview.create({
            rating,
            review,
            user: userId,
            course: courseId,
        });

        //store/attach the RatingAndReview with this course.......
        //update course with this rating/review
        const updatedCourseDetails = await Course.findOneAndUpdate(
            {_id: courseId},
            {
                $push: {
                    ratingAndReview: newRatingAndReview._id,
                }
            },
            {new: true}
        );
        //return response.......
        return res.status(200).json({
            success: true,
            message: "Rating and Review Added successfully",
            data: newRatingAndReview,
        });
    }
    catch(err){
        console.error(err)
        res.status(500).json({
            success: false,
            message: "Failed to add Rating And Review",
            error: err.message,
        });
    }
}

//Get Avg rating.......
exports.getAverageRating = async(req, res) => {
    try{
        //get course Id.....
        const {courseId} = req.body;
        //calculate avg rating.....
        const result = await RatingAndReview.aggregate([
            //find courseId se related all RatingAndReview doc
            {
                $match:{
                    course: new mongoose.Types.ObjectId(courseId),
                },
            },
            //group into a single doc with field averageRating
            {
                $group:{
                    _id:null,
                    averageRating: { $avg: "$rating"},
                }
            }
        ]);

        //return avg rating in response......
        if(result.length > 0) {
            return res.status(200).json({
                success:true,
                averageRating: result[0].averageRating,
            });
        }

        //if no rating/Review exist.........
        return res.status(200).json({
            success:true,
            message:'Average Rating is 0, no ratings given till now',
            averageRating: 0,
        })

    }
    catch(error){
        console.error(err)
        res.status(500).json({
            success: false,
            message: "Something went wrong while finding Avg Rating",
            error: err.message,
        });
    }
}

//Get All RatingAndReviews.......
exports.getAllRatingAndReviews = async(req, res) => {
    try{
        //Fetch all rating and review......
        const allReviews = await RatingAndReview.find({})
                            .sort({rating: "desc"})
                            .limit(10)
                            .populate({
                                path: "user",
                                select: "firstName lastName email image",
                            })
                            .populate({
                                path: "course",
                                select: "courseName",
                            })
                            .exec()
                            

        // Return response.....
        return res.status(200).json({
            success:true,
            message:"All reviews fetched successfully",
            data:allReviews,
        });                    
    }
    catch(error){
        console.error(err)
        res.status(500).json({
            success: false,
            message: "Something went wrong while Fetching Avg Rating and Review",
            error: err.message,
        });
    }
}