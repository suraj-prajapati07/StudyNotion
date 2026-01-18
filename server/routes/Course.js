const express = require("express");
const router = express.Router();

// #.Import controllers........

//1.Course Controllers Import
const {
  createCourse,
  getAllCourses,
  getCourseDetails,
  getFullCourseDetails,
  editCourse,
  getInstructorCourses,
  deleteCourse,
} = require("../controllers/Course");

//2.Section Controllers Import
const {
  createSection,
  updateSection,
  deleteSection
} = require('../controllers/Section');

//3.SubSection Controllers Import
const {
  createSubSection,
  updateSubSection,
  deleteSubSection
} = require('../controllers/SubSection');

//4.Categories Controllers Import
const {
  createCategory,
  showAllCategories,
  getCategoryPageDetails,
} = require("../controllers/Category");

//5.RatingAndReview Controllers Import
const {
  createRatingAndReview,
  getAverageRating,
  getAllRatingAndReviews
} = require('../controllers/RatingAndReview');

//6.Course Progress Controllers Import
const {updateCourseProgress} = require('../controllers/CourseProgress');

// #.Importing Middlewares
const { auth, isInstructor, isStudent, isAdmin } = require("../middlewares/auth");

// ********************************************************************************************************
//                                      Course routes
// ********************************************************************************************************
// Courses can Only be Created by Instructors
router.post('/createCourse', auth, isInstructor, createCourse);
// Edit Course routes
router.post("/editCourse", auth, isInstructor, editCourse);
//Add a Section to a Course
router.post("/addSection", auth, isInstructor, createSection);
// Update a Section
router.post("/updateSection", auth, isInstructor, updateSection);
// Delete a Section
router.post("/deleteSection", auth, isInstructor, deleteSection);
// Add a Sub Section to a Section
router.post("/addSubSection", auth, isInstructor, createSubSection);
// Update Sub Section
router.post("/updateSubSection", auth, isInstructor, updateSubSection);
// Delete Sub Section
router.post("/deleteSubSection", auth, isInstructor, deleteSubSection);
// Get all Courses Under a Specific Instructor
router.get("/getInstructorCourses", auth, isInstructor, getInstructorCourses);
// Delete a Course
router.delete("/deleteCourse", deleteCourse);

// Get all Registered Courses
router.get("/getAllCourses", getAllCourses);
// Get Details for a Specific Courses [without videoUrl]
router.post("/getCourseDetails", getCourseDetails);
// Get full Details for a Specific Courses [with videoUrl]
router.post("/getFullCourseDetails", auth, getFullCourseDetails);


router.post("/updateCourseProgress", auth, isStudent, updateCourseProgress);


// ********************************************************************************************************
//                                      Category routes (Only by Admin)
// ********************************************************************************************************
router.post('/createCategory', auth, isAdmin, createCategory);
router.get('/showAllCategories', showAllCategories);
router.post('/getCategoryPageDetails', getCategoryPageDetails);


// ********************************************************************************************************
//                                      Rating and Review
// ********************************************************************************************************
router.post("/createRating", auth, isStudent, createRatingAndReview);
router.get("/getAverageRating", getAverageRating);
router.get("/getReviews", getAllRatingAndReviews);

module.exports = router