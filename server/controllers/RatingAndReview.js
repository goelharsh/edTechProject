const {mongo, default:mongoose} = require("mongoose")
const RatingAndReview = require("../models/RatingAndReviews")
const Course = require("../models/Course")


// create rating 
exports.createRating = async(req,res)=>{
    try {
        // get user id 
        const userId = req.user.id
        // fetch data 
        const {rating, review, courseId} = req.body
        // check if user is enrolled or not 
        const courseDetails = await Course.findOne(
            {_id:courseId, 
            studentsEnrolled: {$elemMatch:{$eq:userId}}}
        )
        if(!courseDetails){
            return res.status(403).json({
                success:false,
                message:"Student is not enrolled in the course"
            })
        }
        // check if user has already given the rating 
        const alreadyReviewd = await RatingAndReview.findOne({user:userId, course:courseId})
        if(!alreadyReviewd){
            return res.status(403).json({
                success:false,
                message:"Course is already reviewed by the user"
            })
        }
        // create rating and review 
        const ratingReview = await RatingAndReview.create({
            rating, review, course:courseId, user:userId
        })
        // attatch both of these wih course 
        const updatedCourseDetails = await Course.findByIdAndUpdate({_id:courseId},{
            $push:{
                ratingAndReviews:ratingReview._id
            }
        }, {new:true});

        console.log(updatedCourseDetails)
        // return response 
        return res.status(200).json({
            succcess:true,
            message:"Rating and Reviews created successfully "
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Cannot create Rating"
        })
    }
}

// create average rating 
exports.getAverageRating = async(req,res)=>{
    try {
        // get course id 
        const courseId = req.body.courseId
        // calculate average rating 
        const result = await RatingAndReview.aggregate([
            {

                $match:{
                    // course id was string and now we have converted into object id 
                    course: new mongoose.Types.ObjectId(courseId)
                }
            },
            {
                $group:{
                    _id:null,
                    averageRating:{
                        $avg: "$rating"
                    }

                }
            }
        ])
        // return rating 
        if(result.length>0){
            return res.status(200).json({
                success:true,
                averageRating: result[0].averageRating
            })
        }

        // if no rating / review exist 
        return res.status(200).json({
            success:true,
            message:"Average rating is 0, no rating given till now",
            averageRating:0,
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Cannot find average rating"
        })
    }
}

// get all ratings 
exports.getAllRating = async(req,res)=>{
    try {
        const allReviews = await RatingAndReview.find({})
                                        .sort({rating:"desc"})
                                        .populate({
                                            path:"user",
                                            select:"firstName lastName, email image"
                                        })
                                        .populate({
                                            path:"course",
                                            select:"courseName"
                                        })
                                        .exec();

        return res.status(200).json({
            success:true,
            message:"All review fetched succssfylly",
            data:allReviews
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Cannot find all rating"
        })
    }
}













