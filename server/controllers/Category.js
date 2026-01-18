const Category = require('../models/Category');
const Course = require('../models/Course');
//Category --> handled by Admin.

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

//createCategory handler function.............
exports.createCategory = async(req, res) => {
    try{
        //fetch data.......
        const {name, description} = req.body;

        //validate data.....
        if(!name || !description){
            return res.status(400).json({
                success: false,
                message: 'All fields are required',
            });
        }

        //create entry in db........
        const categoryDetails = await Category.create({
            name: name,
            description: description,
        });
        console.log("Category Details : ", categoryDetails);

        //return response....
        return res.status(200).json({
            success: true,
            message: "Category created successfully",
        });
    }
    catch(err){
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while creating Category",
            error: err.message,
        });
    }
}

//getAllCategories handler function .............
exports.showAllCategories  = async(req, res) => {
    try{
        //fetch all category.....
        const allCategories = await Category.find({},
            //returning doc with name and description..
            {   name: true,
                description: true
            }
        );

        //return response.........
        return res.status(200).json({
            success: true,
            message: 'All Categories fetched successfully',
            data: allCategories,
        });
    }
    catch(err){
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while Geting all Categories Details",
            error: err.message,
        });
    }
}

//Category PageDetails --> Display courses accoring to categories.
exports.getCategoryPageDetails = async(req, res) => {
    try{
        //get categoryId....
        const {categoryId} = req.body;
        
        //1.get courses for the specified category.
        const selectedCategory = await Category.findById(categoryId)
        .populate({
            path: "courses",
            match: { status: "Published" },
            populate: [
                { path: "ratingAndReview" },
                { path: "instructor", select: "firstName lastName image" }
            ]
        })
        .exec();

        //validation -> Handle the case when the selected category courses is not found......
        if (!selectedCategory) {
            return res.status(404).json({ 
                success: false, 
                message: "Category not found" 
            });
        }

        // Handle the case when there are no courses.......
        if (selectedCategory.courses.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No courses found for the selected category.",
            });
        }

        //2.get courses for different categories......
        const categoriesExceptSelected =  await Category.find({
            _id : {$ne: categoryId},
        });

        let differentCategory = await Category.findOne(
            categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]._id
        )
        .populate({
            path: "courses",
            match:{status: "Published"},
            populate: [
                { path: "ratingAndReview" },
                { path: "instructor", select: "firstName lastName image" }
            ]
        })
        .exec();

        //3.get top selling courses....
        //fetch all categories  courses
        const allCategories = await Category.find()
                            .populate({
                                path: "courses",
                                match:{status: "Published"},
                                populate: [
                                    { path: "ratingAndReview" },
                                    { path: "instructor", select: "firstName lastName image" }
                                ]
                            })
                            .exec();
                            
        //store only courses
        const allCourses = allCategories.flatMap((category) => category.courses);
        //now find top-10 selled course
        const mostSellingCourses = allCourses.sort((a, b) => "");

        //4.get new courses

        //return response.........
        return res.status(200).json({
            success: true,
            data: {
              selectedCategory,
              differentCategory,
              mostSellingCourses
            },
        })
    }
    catch(err){
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err.message,
        });
    }
}