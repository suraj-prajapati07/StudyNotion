const SubSection = require('../models/SubSection');
const Section = require('../models/Section');
const { uploadFileToCloudinary } = require('../utils/fileUploader');

//Create subsection........
exports.createSubSection = async(req, res) => {
    try{
        //fetch data......
        const {sectionId, title, description} = req.body;

        //extract file......
        const video = req.files.videoFile;

        //data validation....
        if(!sectionId || !title || !description || !video){
            return res.status(400).json({
                success: false,
                message: 'All fields are required',
            });
        }

        //upload video to cloudinary.......
        const uploadDetails = await uploadFileToCloudinary(video, process.env.FOLDER_NAME);

        //create a subsection....
        const newSubSection = await SubSection.create({
            title: title,
            description: description,
            timeDuration: `${uploadDetails.duration}`,
            videoUrl: uploadDetails.secure_url,
        });

        //update section with this subsection ObjID......
        const updatedSection = await Section.findByIdAndUpdate(sectionId, 
            {
                $push:{
                    subSection: newSubSection._id,
                }
            },
            {new: true},
        ).populate("subSection");

        //return response.........
        return res.status(200).json({
            success: true,
            message: 'SubSection created successfully',
            data: updatedSection
        })
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong, while creating SubSection',
            error: err.message,
        })
    }
}


//Update subsection...........
exports.updateSubSection = async(req, res) => {
    try{
        //fetch data..........
        const {sectionId, subSectionId, title, description} = req.body;

        //find subsection by their Id and update corresponding fields........ 
        const subSection = await SubSection.findById(subSectionId);
        if(title !== undefined){
            subSection.title = title;
        }
        if(description !== undefined){
            subSection.description = description;
        }
        if(req.files && req.files.videoFile !== undefined){
            //extract file......
            const video = req.files.videoFile;
            //upload video to cloudinary.......
            const uploadDetails = await uploadFileToCloudinary(
                video, 
                process.env.FOLDER_NAME
            );
            //update newVideo url and duration......
            subSection.videoUrl = uploadDetails.secure_url
            subSection.timeDuration = `${uploadDetails.duration}`
        }

        //Now save the updated subsection.........
        await subSection.save();
        
        //retun updated section in response..
        const updatedSection = await Section.findById(sectionId).populate("subSection");
        return res.status(200).json({
            success: true,
            message: 'Section updated successfully',
            data: updatedSection,
        });
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong, while updating SubSection',
            error: err.message,
        })
    }
}


//Delete Subsection.........
exports.deleteSubSection = async(req, res) => {
    try{
        //fetch Id......
        const {subSectionId, sectionId} = req.body;

        //first remove entry from subSection arrray........
        await Section.findByIdAndUpdate(sectionId, {
            $pull: {
                subSection: subSectionId,
            }
        });

        //delete subsection......
        await SubSection.findByIdAndDelete(subSectionId);

        //retun updated section in response..
        const updatedSection = await Section.findById(sectionId).populate("subSection");
        res.status(200).json({
			success:true,
			message:"SubSection deleted successfully",
            data: updatedSection,
		});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong, while deleting SubSection',
            error: err.message,
        })
    }
}