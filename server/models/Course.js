const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    courseName: {
        type: String,
    },

    courseDescription: {
       type:String, 
    },

    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    whatYouWillLearn: {
        type: String,
    },

    price: {
        type: Number,
    },

    thumbnail:{
        type: String,
    },

    tag: {
		type: [String],
		required: true,
	},

    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
    },

    courseContent:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Section",
        }
    ],

    ratingAndReview: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "RatingAndReview",
        }
    ],

    studentsEnrolled: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    ],

    instructions: {
		type: [String],
	},

    status: {
		type: String,
		enum: ["Draft", "Published"],
	},

    createdAt: {
		type:Date,
		default: Date.now,
	},
});

//export model.......
module.exports = mongoose.model("Course", courseSchema);