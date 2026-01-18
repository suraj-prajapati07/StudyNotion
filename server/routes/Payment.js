// Import the required modules
const express = require("express");
const router = express.Router();

//Import controllers.....
const {
    capturePayment, 
    verifyPayment, 
    sendPaymentSuccessEmail,
} = require('../controllers/Payment');
//Import middleware......
const { auth, isStudent } = require("../middlewares/auth")

//routes........
router.post("/capturePayment", auth, isStudent, capturePayment);
router.post("/verifyPayment",auth, isStudent, verifyPayment);
router.post('/sendPaymentSuccessEmail', auth, isStudent, sendPaymentSuccessEmail);

module.exports = router;