const Section = require("../models/Section")
const Course = require("../models/Course")

exports.createSection = async(req,res)=>{
    try {
        // data fetch 
        const {sectionName, courseId} = req.body
        // data validation
        if(!sectionName || !courseId){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }
        // create section 
        const newSection  = await Section.create({sectionName})
        // section ko course me daldo 
        const updatedCourse = await Course.findByIdAndUpdate(courseId,
            {
                $push:{
                    courseContent:newSection._id
                }
            },
            {new:true}
            )
			.populate({
				path: "courseContent",
				populate: {
					path: "subSection",
				},
			})
			.exec();
        // reuturn response 
        return res.status(200).json({
            success:true,
            message:"Section Created Successfully",
            updatedCourse
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Unable to create section, please try again",
            error:error.message
        })
    }
}


exports.updateSection  = async(req,res)=>{
    try {
        // data input 
        const {sectionName, sectionId} = req.body;
        // update data 
        const section  = await Section.findByIdAndUpdate(sectionId, {sectionName},  {new:true}
            )
        // return respinse
        return res.status(200).json({
            success:true,
            message:section,
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Unable to update section, please try again",
            error:error.message
        })
    }
}
 

exports.deleteSection = async(req,res)=>{
    try {
        // get id -- assuming we are sending id in params 
        // check with req.params
        const {sectionId} = req.body

        // delete section 
        await Section.findByIdAndDelete(sectionId) 

        // return response
        return res.status(200).json({
            success:true,
            message:"Section deleted successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Unable to update section, please try again",
            error:error.message
        })
    }
}