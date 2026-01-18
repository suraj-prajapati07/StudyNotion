const CourseProgress = require("../models/CourseProgress");
const SubSection = require("../models/SubSection");

exports.updateCourseProgress = async(req,res) => {
    const{courseId, subSectionId} = req.body;
    const userId = req.user.id;
    try{
        //check subsection is valid or not.
        const subSection = await SubSection.findById(subSectionId);
        if(!subSection){
            return res.status(404).json({
                success: false,
                message: "Invalid Lecture",
            })
        }
        //check for old entry
        let courseProgress = await CourseProgress.findOne({
            courseId: courseId,
            userId: userId
        })
        // console.log("Course progress : ",courseProgress);
        if(!courseProgress){
            return res.status(404).json({
                success: false,
                message: "Course progress Does Not Exist",
            });
        }
        else{
            //if subsection  already mark as completed.
            if(courseProgress?.completedVideos?.includes(subSectionId)){
                return res.status(400).json({
                    success: false,
                    message: "Lecture already completed",
                });
            }
            //otherwise push.
            courseProgress?.completedVideos.push(subSectionId);
        }
        //save
        await courseProgress.save();
        return res.status(200).json({
            success: true,
            message: "Course progress updated successfully"
        })
    }
    catch(error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while updating course progress",
            error: error.message,
        });
    }
}