const {uploadImageToCloudinary}  = require("../utils/imageUploader")
const User = require("../models/User")
const Course = require("../models/Course")
const Category = require("../models/Category");

// create course 
exports.createCourse = async (req,res) =>{
    try {
        // fetch data    
        let {courseName,
			courseDescription,
			whatYouWillLearn,
			price,
			tag,
			category,
			status,
			instructions,} = req.body

        // fetch thumbnail 
        const thumbnail = req.files.thumbnailImage

        // validation
        if(!courseName ||
			!courseDescription ||
			!whatYouWillLearn ||
			!price ||
			!tag ||
			!thumbnail ||
			!category
        ){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }
		if (!status || status === undefined) {
			status = "Draft";
		}
        // check for instructor 
        const userId = req.user.id;
        const instructorDetails = await User.findById(userId, {
			accountType: "Instructor",
		})
        console.log("Instructor Details ",instructorDetails)


        if(!instructorDetails){
            return res.status(404).json({
                success:false,
                message:"Instructor Details are not found"
            })
        }

        // check given tag is valid or not 
        const categoryDetails = await Category.findById(category)
        if(!categoryDetails){
            return res.status(404).json({
                success:false,
                message:"Tag Details are not found"
            })
        }

        // upload image to cloudinary
        const thumbnailImage = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME)
		console.log(thumbnailImage);
        // create an entry for new course 
        const newCourse = await Course.create({
			courseName,
			courseDescription,
			instructor: instructorDetails._id,
			whatYouWillLearn: whatYouWillLearn,
			price,
			tag: tag,
			category: categoryDetails._id,
			thumbnail: thumbnailImage.secure_url,
			status: status,
			instructions: instructions,
        })

        // add the new course to the user schema of instructor
        await User.findByIdAndUpdate(
            {_id: instructorDetails._id},
            {
                $push:{
                    courses: newCourse._id
                }
            },
            {new:true}
        )
		// Add the new course to the Categories
		await Category.findByIdAndUpdate(
			{ _id: category },
			{
				$push: {
					course: newCourse._id,
				},
			},
			{ new: true }
		);
        // update the tag schema 
        return res.status(200).json({
            success:true,
            message:"Course created Succussfully",
            data:newCourse
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Failed to create corse",
            error:error.message
        })   
    }
}

// get all courses 
exports.getAllCourses = async(req,res)=>{
    try {
        const allCourses = await Course.find({},
            {
				courseName: true,
				price: true,
				thumbnail: true,
				instructor: true,
				ratingAndReviews: true,
				studentsEnroled: true,
			}
            )
			.populate("instructor")
			.exec();
        return res.status(200).json({
            success:true,
            message:"Data for all courses fetched successfully",
            data:allCourses
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Cannot fetch course data",
            error:error.message
        })
    }
}

// GET COURSE DETAILS
exports.getCourseDetails = async(req,res)=>{
    try {
        // get id 
        const {courseId} = req.body;
        // find course detail
        const courseDetails = await Course.find(
            {_id:courseId})
            .populate(
                {
                    path:"instructor",
                    populate:{
                        path:"additionalDetails",
                    },
                }
            )
            .populate("category")
            //.populate("ratingAndreviews")
            .populate({
                path:"courseContent",
                populate:{
                    path:"subSection",
                },
            })
            .exec();

            // validation
            if(!courseDetails){
                return res.status(400).json({
                success:false,
                message:`Could not find the course with ${courseId}`
            })
        }
            console.log(courseId)       
    //return response
    return res.status(400).json({
        success:true,
        message:"Course details fetched successfully",
        data:courseDetails
    })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
        success:false,
        message:"Could not fetch details"
        })
    }
}



