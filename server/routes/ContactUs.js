const express = require("express");
const router = express.Router();

//Inport controller.......
const {contactUsController} = require('../controllers/ContactUs');

//define routes.......
router.post("/contact", contactUsController);

module.exports = router