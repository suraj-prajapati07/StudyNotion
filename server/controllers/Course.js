const Course = require('../models/Course');
const Category = require('../models/Category');
const User = require('../models/User');
const Section = require('../models/Section');
const SubSection = require('../models/SubSection');
const {uploadFileToCloudinary} = require('../utils/fileUploader');
const  convertSecondToDuration = require('../utils/secondToDuration');
const CourseProgress = require('../models/CourseProgress');

// 1. Create course handler function......
exports.createCourse = async(req, res) => {
    try{
        //fetch data........
        // console.log("--------------------Body Data------------------------")
        // console.log(req.body);
        let {
            courseName, 
            courseDescription, 
            whatYouWillLearn, 
            price, 
            tag ,
            category,
            status,
            instructions,
        } = req.body;

        //Tags and Instructions are coming -> Array of strings
        // ✅ Ensure tag & instructions are arrays
        const _tag = tag.split(',').map(item => item.trim());
        const _instructions = instructions.split(',').map(item => item.trim());

        //get thumbnail.........
        const thumbnail = req.files.thumbnail;

        //data validation.......
        if(
            !courseName || !courseDescription || !whatYouWillLearn || 
            !price || !category ||  !instructions.length || !tag.length
        ){
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            })
        }
        
        //get instructor details and Check if the user is an instructor.........
        const userId = req.user.id;
        const instructorDetails = await User.findById(userId, {
            accountType: "Instructor",
        });
        if(!instructorDetails){
            return res.status(404).json({
                success: false,
                message: "Instructor Details not found",
            })
        }
        // console.log("Instructor Details : ",instructorDetails);

        const categoryDetails = await Category.findById(category);
        // console.log("category details", categoryDetails)
        if (!categoryDetails) {
            return res.status(404).json({
                success: false,
                message: "Category Details Not Found",
            });
        }

        //upload image to cloudinary.......
        const uploadDetails = await uploadFileToCloudinary(
            thumbnail, 
            process.env.FOLDER_NAME, 
        );

        //create entry in db for new course......
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor: instructorDetails._id,
            whatYouWillLearn,
            price,
            tag: _tag,
            category: categoryDetails._id,
            thumbnail: uploadDetails.secure_url,
            status: status,
            instructions:  _instructions,
        });

        //add the new course to the user schema of instructor......
        await User.findByIdAndUpdate(
            {_id: instructorDetails._id},
            {
                $push: {
                    courses: newCourse._id,
                }
            },
            {new: true},
        );

        //HW: Update Categories schema.......
        await Category.findByIdAndUpdate(
            {_id: category},
            {
                $push:{courses: newCourse._id}
            },
            {new: true},
        );

        // Return the new course and a success message
        res.status(200).json({
            success: true,
            message: "Course Created Successfully",
            data: newCourse,
        });

    }
    catch(err){
        console.error(err)
        res.status(500).json({
            success: false,
            message: "Failed to create course",
            error: err.message,
        });
    }
}

// 2. Edit Course Details......
exports.editCourse = async (req, res) => {
    const { courseId } = req.body;
    try{
        // Fetch course
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found",
            });
        }

        // If thumbnail is found, update it
        if (req.files && req.files.thumbnail) {
            const thumbnail = req.files.thumbnail;
            const uploadDetails = await uploadFileToCloudinary(
                thumbnail,
                process.env.FOLDER_NAME
            );
            course.thumbnail = uploadDetails.secure_url;
        }

        // Update only the fields that are present in the request body
        const updates = req.body;
        console.log("Updates : ",updates);

        for (const key in updates) {
            // Skip courseId, don’t overwrite it
            if (key === "courseId") continue;
            const value = updates[key];
            if (key === "tag" || key === "instructions") {
                // Split the string by the comma (',') delimiter
                // and trim any whitespace from each resulting string.
                course[key] = value.split(',').map(item => item.trim());
            }
            else {
                // Assign the value directly if it's not a string or is empty
                course[key] = value;
            }
        }

        // Save the course
        await course.save();

        // Return updated course
        const updatedCourse = await Course.findById(courseId)
            .populate({
                path: "instructor",
                populate: {
                path: "additionalDetails",
                },
            })
            .populate({
                path: "courseContent",
                populate: {
                path: "subSection",
                },
            })
            .populate("ratingAndReview")
            .populate("category")
            .exec();

        return res.status(200).json({
            success: true,
            message: "Course Updated Successfully",
            data: updatedCourse,
        });
    } 
    catch (error) {
        console.error("Error in editCourse:", error);
        return res.status(500).json({
        success: false,
        message: "Something went wrong, while Editing the course",
        error: error.message,
        });
    }
};



// 3. Get a list of Course for a given Instructor......
exports.getInstructorCourses = async(req, res) => {
    try{
        //fetch user......
        const instructorId = req.user.id;

        //get instructor all courses......
        let instructorCourses = await Course.find({instructor: instructorId})
            .sort({ createdAt: -1 })
            .populate({
                path: "courseContent",
                populate:{
                    path: "subSection",
                },
            })
            .exec();

        //validate........
        if(instructorCourses.length === 0){
            return res.status(404).json({
                success: false,
                message: "Courses not found",
            });
        }

        //calculate course duration for each course
        for(let i=0; i < instructorCourses.length; i++){
            let totalDurationInSeconds = 0;
            for(let j=0; j < instructorCourses[i].courseContent.length; j++){
                totalDurationInSeconds += instructorCourses[i].courseContent[j].
                subSection.reduce((acc, curr) => acc + parseInt(curr.timeDuration), 0);
            }
            //add timeDuration field.
            // convert Mongoose doc to plain JS object
            instructorCourses[i] = instructorCourses[i].toObject();
            instructorCourses[i].duration = convertSecondToDuration(totalDurationInSeconds);
        }

        // console.log("Instructor Course : ",instructorCourses);
        // Return the instructor's courses
        return res.status(200).json({
            success: true,
            message: "Instructor Courses fetched Successfully",
            data: instructorCourses,
        });
    }
    catch (error) {
        return res.status(500).json({
          success: false,
          message: "Can't Fetch Instructor Course Details Data",
          error: error.message,
        });
    }
}


// 4. Get a single course details without videoUrl for public.
exports.getCourseDetails = async (req, res) => {
    try{
        //fetch courseId...
        const {courseId} = req.body;
        //fetch course details....
        const courseDetails = await Course.findOne(
            {_id: courseId})
            .populate({
                path: "instructor",
                populate: {
                  path: "additionalDetails",
                },
            })
            .populate({
                path: "courseContent",
                populate:{
                    path: "subSection",
                    //not select video url
                    select: "-videoUrl",
                },
            })
            .populate("category")
            .populate("ratingAndReview")
            .exec();
        
        //validate courseDetails.......
        if (!courseDetails) {
            return res.status(400).json({
              success: false,
              message: `Could not find course with id: ${courseId}`,
            });
        }
        
        //calculate course duration
        let totalDurationInSeconds = 0;
        courseDetails.courseContent.forEach((section) => {
            section.subSection.forEach((subsec) => {
                const timeDurationInSeconds = parseInt(subsec.timeDuration);
                totalDurationInSeconds += timeDurationInSeconds
            })
        })
        //convert total seconds to duration format
        const totalDuration = convertSecondToDuration(totalDurationInSeconds);
        //return response.....
        return res.status(200).json({
            success: true,
            message: "Course details fetched Successfully",
            data: {
                courseDetails,
                totalDuration,
            },
        });

    }
    catch(error){
        console.log(error)
        return res.status(404).json({
          success: false,
          message: `Can't Fetch Single Course Data`,
          error: error.message,
        });
    }
}


// 5. Get Authenticated full course details 
exports.getFullCourseDetails = async(req, res) => {
    try {
        //fetch courseId.
        const {courseId} = req.body;
        const userId = req.user.id;
        //find course.
        const courseDetails = await Course.findOne({
            _id: courseId,
            })
            .populate({
                path: "instructor",
                populate:{
                    path:"additionalDetails"
                }
            })
            .populate({
                path: "courseContent",
                populate: {
                    path: "subSection"
                }
            })
            .populate("ratingAndReview")
            .populate("category")
            .exec();
        //validate courseDetails
        if(!courseDetails){
            return res.status(400).json({
                success: false,
                message: `Course  Not Found With ID : ${courseId}`
            });
        }
       
        //calculate course duration
        let totalDurationInSeconds = 0;
        courseDetails.courseContent.forEach((section) => {
            totalDurationInSeconds += section.subSection.reduce((acc, curr) => 
                acc + parseInt(curr.timeDuration), 0);
        });
        const totalDuration = convertSecondToDuration(totalDurationInSeconds);

        //Total totalNoOfLecture
        let totalNoOfLecture = 0;
         courseDetails.courseContent.forEach((section) => {
            totalNoOfLecture += section.subSection.length;
        });

        //Also send  Course progress related info
        const courseProgress = await CourseProgress.findOne({
            courseId,
            userId,
        })
        const completedVideos = courseProgress?.completedVideos ? courseProgress.completedVideos : [];

        // console.log("pringting coursedetails",courseDetails);

        //return response
        return res.status(200).json({
            success: true,
            message: "Course Details Fetched Successfully",
            data: {
                courseDetails,
                totalDuration,
                completedVideos,
                totalNoOfLecture,
            }   
        })

    } 
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Can't Fetch Full Course Details",
            error: error.message,
        });
    }
}


// 6. Get all List of courses handler function......
exports.getAllCourses = async(req, res) => {
    try{

        const allCourses = await Course.find(
            { status: "Published" },
            {
              courseName: true,
              price: true,
              thumbnail: true,
              instructor: true,
              ratingAndReviews: true,
              studentsEnrolled: true,
            }
        )
        .populate("instructor")
        .exec();

        //return response.........
        return res.status(200).json({
            success: true,
            allCourses,
        });

    }
    catch (error) {
        console.log(error)
        return res.status(404).json({
          success: false,
          message: `Can't Fetch All Courses Data`,
          error: error.message,
        });
    }
}



// 7. Delete the Course........
exports.deleteCourse = async (req, res) => {
    try{
        //Fetch courseId......
        const {courseId} = req.body;

        //Find the course which is to be delete....
        const course = await Course.findById(courseId);

        //validate.....
        if(!course){
            return res.status(404).json({
                success: false,
                message: "Course not found",
            })
        }

        //Unenroll all the students from this course (means unenroll -> student ke courses[] se.)
        const studentsEnrolled = course.studentsEnrolled;
        for(const studentId of studentsEnrolled){
            await User.findByIdAndUpdate(studentId,
                {
                    $pull: {courses : courseId},
                }
            );
        }

        //Delete now.....
        //1. Delete section and subsection......
        const courseSection = course.courseContent;
        for(const sectionId of courseSection){
            const section = await Section.findById(sectionId);
            if(section){
                //Delete the subsection........
                const subSection = section.subSection;
                for(const subSectionId of subSection){
                    await SubSection.findByIdAndDelete(subSectionId);
                }

                // Delete the section...........
                await Section.findByIdAndDelete(sectionId)
            }
        }
        //2. Delete the course.........
        await Course.findByIdAndDelete(courseId);

        //Return response.........
        return res.status(200).json({
            success: true,
            message: "Course Deleted Successfully",
        });
    }
    catch (error) {
        return res.status(500).json({
          success: false,
          message: "Something went wrong, while deleting the course",
          error: error.message,
        });
    }  
}