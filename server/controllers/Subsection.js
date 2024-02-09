const Section  = require("../models/Section")
const SubSection  = require("../models/SubSection")
const { uploadImageToCloudinary } = require("../utils/imageUploader")


exports.createSubSection = async(req,res)=>{
    try {
        // first af all we have fetch sectionId, bcoz we have to insert subsection inside the section 
        // data fetch ,
        const {sectionId, title, timeDuration, description} = req.body
        // extract file 
        const video = req.files.videoFile
        // validation 
        if(!sectionId || !title || !timeDuration || ! description){
            return res.status(403).json({
                success:false,
                message:"All fields are required"
            })
        }
        // we do not have to store video , instead we want video url, so for that we have to upload the video to cloudinary 
        const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME)
        //so in above line, response me secure url milega video ka , so we have fetched that url

        // now 
        // create a subSection
        const SubSectionDetails = await SubSection.create({
            title:title,
            timeDuration:timeDuration,
            description:description,
            videoUrl:uploadDetails.secure_url,
        })
        // now push this subsection inside the sectio schema
        const updatedSection = await Section.findByIdAndUpdate({_id:sectionId},
                            {
                                $push:{
                                    subSection:SubSectionDetails._id
                                }
                            },
                            {new:true}
                        ).populate("subSection");
                        
        // return response 
        return res.status(200).json({
            success:true,
            message:"SubSection created Suuccessfully",
            updatedSection
        })

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Cannot create SubSection"
        })
    }
}

// update subSection 
exports.updateSubSection = async(req,res)=>{
    try {
        const {subSectionId, title, description, timeDuration, } = req.body;
        if(!subSectionId || !title || ! description || !timeDuration){
            return res.status(404).json({
                success:false,
                message:"All fields are required"
            })
        }

        const updatedSubSectionDetails = SubSection.findByIdAndUpdate({_id:subSectionId},
                            {
                                title:title,
                                description:description,
                                timeDuration:timeDuration
                            }
                            )

        //return response 
        return res.stautus(200).json({
            success:true,
            message:"SubSection updated Successfully"
        })


    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Cannot update SubSection"
        })
    }
}

exports.deleteSubSection = async(req,res)=>{
    try {
        const {subSectionId} = req.body

        await SubSection.findByIdAndDelete(subSectionId)

        return res.status(200).json({
            success:true,
            message:"SubSection deleted Successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Cannot update SubSection"
        })   
    }
}