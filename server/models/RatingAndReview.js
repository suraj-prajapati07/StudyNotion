const mongoose = require('mongoose');

const ratingAndReviewSchema = new mongoose.Schema({
	rating: {
		type: Number,
		required: true,
	},
	review: {
		type: String,
		required: true,
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "User",
	},
	course: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "Course",
		index: true,
	},
});

//export model.......
module.exports = mongoose.model("RatingAndReview", ratingAndReviewSchema);