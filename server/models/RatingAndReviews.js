const mongoose = require("mongoose")

const ratingAndReviewsSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    rating:{
        type:Number,
        required:true
    },
    review:{
        type:String,
        requierd:true
    },
    course: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "Course",
		index: true,
	},
})


module.exports = mongoose.model("RatingAndReviews", ratingAndReviewsSchema)