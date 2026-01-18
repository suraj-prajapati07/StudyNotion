const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },

    lastName: {
        type: String,
        required: true,
        trim: true,
    },

    email: {
        type: String,
        required: true,
        trim: true,
    },

    password: {
        type: String,
        required: true,
        trim: true,
    },

    accountType: {
        type: String,
        enum: ["Admin", "Instructor", "Student"],
        required: true,
    },

    //Additional details....
    additionalDetails: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Profile",
        required: true,
    },

    courses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
            required: true,
        }
    ],

    //course progress......
    courseProgress:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "CourseProgress",
            required: true,
        }
    ],

    //User image.....
    image: {
        type: String,
        required: true,  
    },

    token: {
        type: String,
    },

    resetPasswordExpires: {
        type: Date,
    },

    active: {
        type: Boolean,
        default: true,
    },
    approved: {
        type: Boolean,
        default: true,
    },

    
});

//export model.......
module.exports = mongoose.model("User", userSchema);