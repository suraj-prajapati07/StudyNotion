const express = require("express");
const router = express.Router();

//Import Profile controllers........
const{
    updateProfile,
    deleteAccount,
    getUserAllDetails,
    updateDP,
    getEnrolledCourses,
    instructorDashboard,

} = require('../controllers/Profile');

//Middlewares......
const { auth, isStudent, isInstructor } = require("../middlewares/auth");

// ********************************************************************************************************
//                                      Profile routes
// ********************************************************************************************************
//Get user profile details.
router.get('/getUserAllDetails', auth, getUserAllDetails);
// Delet User Account.
router.delete('/deleteProfile', auth, deleteAccount);
//Update user profile.
router.put('/updateProfile',auth, updateProfile);
//Update DP.
router.put('/updateDisplayPicture', auth, updateDP);
//Get enrolled courses.
router.get('/getEnrolledCourses', auth, isStudent, getEnrolledCourses);

//Get instructor dashboard.
router.get('/instructorDashboard', auth, isInstructor, instructorDashboard);


module.exports = router;