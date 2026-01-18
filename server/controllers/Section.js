const Section = require('../models/Section');
const Course = require('../models/Course');
const SubSection = require('../models/SubSection');

//create section ......
exports.createSection = async(req, res) => {
    try{
        //fetch data..........
        const {sectionName, courseId} = req.body;

        //data validation.......
        if(!sectionName || !courseId){
            return res.status(400).json({
                success: false,
                message: 'All fields are required',
            });
        }

        //Create a new section with the given name.......
        const newSection = await Section.create({sectionName});

        // Add the new section to the course's content array.........
        //HW: use populate to display section and subSection in updatedCourse (courseContent fields)....
        const updatedCourseDetails = await Course.findByIdAndUpdate(
                courseId,
                {
                    $push: {
                        courseContent: newSection._id,
                    }
                },
                {new: true},
            )
            .populate({
                path: "courseContent",
                populate: {
                    path: "subSection",
                },
            })
            .exec();

        // console.log('Updates Course Details : ',updatedCourseDetails);
        // Return the updated course object in the response.......
        return res.status(200).json({
            success: true,
            message: 'Section created successfully',
            data: updatedCourseDetails,
        })
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong, while creating courseContent section',
            error: err.message,
        })
    }
}


//Update section...........
exports.updateSection = async(req, res) => {
    try{
        //fetch data.........
        const {sectionName, sectionId, courseId} = req.body;

        //validate data.......
        if(!sectionId || !sectionName){
            return res.status(400).json({
                success: false,
                message: 'All fields are required',
            });
        }

        //Now update section........
        const updatedSection = await Section.findByIdAndUpdate(
            sectionId,
            {sectionName},
            {new: true},
        );
        
        //send updated course in response
        const course = await Course.findById(courseId)
            .populate({
                path: "courseContent",
                populate: {
                    path: "subSection",
                },
            })
            .exec();
        
        //return response........
        return res.status(200).json({
            success: true,
            message: 'Section updated successfully',
            data: course,
        })

    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong, while updating courseContent section',
            error: err.message,
        });
    }
}

//Delete Section............
exports.deleteSection = async(req, res) => {
    try{
        //get Id - assuming that we are sending Id in params......
        const {sectionId, courseId} = req.body;

        const section = await Section.findById(sectionId);
        if(!section){
            return res.status(404).json({
                success: false,
                message: "Section not found",
            });
        }
        //first remove entry from courseContent arrray........
        await Course.findByIdAndUpdate(courseId, {
			$pull: {
				courseContent: sectionId,
			}
		});

        //Now delete section and subsection........
        //firstly -> subsection
        await SubSection.deleteMany({
            _id : {$in: section.subSection}
        });
        //secondly -> section
        await Section.findByIdAndDelete(sectionId);

        //return updated course in response
        const course = await Course.findById(courseId)
            .populate({
                path: "courseContent",
                populate: {
                path: "subSection",
                },
            })
            .exec();
        
        //return response........
        res.status(200).json({
			success:true,
			message:"Section deleted Successfully",
            data: course
		});

    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong, while deleting courseContent section',
            error: err.message,
        }); 
    }
}