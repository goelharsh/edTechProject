// const Section  = require("../models/Section")
// const SubSection  = require("../models/SubSection")
// const { uploadImageToCloudinary } = require("../utils/imageUploader")


// // exports.createSubSection = async(req,res)=>{
// //     try {
// //         // first af all we have fetch sectionId, bcoz we have to insert subsection inside the section 
// //         // data fetch ,
// //         const {sectionId, title, timeDuration, description} = req.body
// //         // extract file 
// //         const video = req.files.videoFile
// //         // validation 
// //         // if(!sectionId || !title || !timeDuration || ! description){
// //         //     return res.status(403).json({
// //         //         success:false,
// //         //         message:"All fields are required"
// //         //     })
// //         // }
// //         if(!sectionId || !title || ! description){
// //             return res.status(403).json({
// //                 success:false,
// //                 message:"All fields are required"
// //             })
// //         }
// //         // we do not have to store video , instead we want video url, so for that we have to upload the video to cloudinary 
// //         const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME)
// //         console.log(uploadDetails)
// //         //so in above line, response me secure url milega video ka , so we have fetched that url

// //         // now 
// //         // create a subSection
// //         const SubSectionDetails = await SubSection.create({
// //             title:title,
// //             // timeDuration:timeDuration,
// //             description:description,
// //             videoUrl:uploadDetails.secure_url,
// //         })
// //         // now push this subsection inside the sectio schema
// //         const updatedSection = await Section.findByIdAndUpdate({_id:sectionId},
// //                             {
// //                                 $push:{
// //                                     subSection:SubSectionDetails._id
// //                                 }
// //                             },
// //                             {new:true}
// //                         ).populate("subSection");
                        
// //         // return response 
// //         return res.status(200).json({
// //             success:true,
// //             message:"SubSection created Suuccessfully",
// //             data:updatedSection
// //         })

// //     } catch (error) {
// //         return res.status(500).json({
// //             success:false,
// //             message:"Cannot create SubSection"
// //         })
// //     }
// // }

// // update subSection 
// // exports.updateSubSection = async(req,res)=>{
// //     try {
// //         const {subSectionId, title, description, timeDuration, } = req.body;
// //         if(!subSectionId || !title || ! description || !timeDuration){
// //             return res.status(404).json({
// //                 success:false,
// //                 message:"All fields are required"
// //             })
// //         }

// //         const updatedSubSectionDetails = SubSection.findByIdAndUpdate({_id:subSectionId},
// //                             {
// //                                 title:title,
// //                                 description:description,
// //                                 timeDuration:timeDuration
// //                             }
// //                             )

// //         //return response 
// //         return res.stautus(200).json({
// //             success:true,
// //             message:"SubSection updated Successfully"
// //         })


// //     } catch (error) {
// //         return res.status(500).json({
// //             success:false,
// //             message:"Cannot update SubSection"
// //         })
// //     }
// // }


// exports.createSubSection = async (req, res) => {
//   try {
//     // Extract necessary information from the request body
//     const { sectionId, title, description } = req.body
//     const video = req.files.video

//     // Check if all necessary fields are provided
//     if (!sectionId || !title || !description || !video) {
//       return res
//         .status(404)
//         .json({ success: false, message: "All Fields are Required" })
//     }
//     console.log( "Here is your uploaded video",video)

//     // Upload the video file to Cloudinary
//     const uploadDetails = await uploadImageToCloudinary(
//       video,
//       process.env.FOLDER_NAME
//     )
//     console.log(uploadDetails)
//     // Create a new sub-section with the necessary information
//     const SubSectionDetails = await SubSection.create({
//       title: title,
//       timeDuration: `${uploadDetails.duration}`,
//       description: description,
//       videoUrl: uploadDetails.secure_url,
//     })

//     // Update the corresponding section with the newly created sub-section
//     const updatedSection = await Section.findByIdAndUpdate(
//       { _id: sectionId },
//       { $push: { subSection: SubSectionDetails._id} },
//       { new: true }
//     ).populate("subSection")

//     // Return the updated section in the response
//     return res.status(200).json({ success: true, data: updatedSection })
//   } catch (error) {
//     // Handle any errors that may occur during the process
//     console.error("Error creating new sub-section:", error)
//     return res.status(500).json({
//       success: false,
//       message: "Internal server error",
//       error: error.message,
//     })
//   }
// }






// exports.updateSubSection = async (req, res) => {
//     try {
//       const { sectionId, title, description } = req.body
//       const subSection = await SubSection.findById(sectionId)
  
//       if (!subSection) {
//         return res.status(404).json({
//           success: false,
//           message: "SubSection not found",
//         })
//       }
  
//       if (title !== undefined) {
//         subSection.title = title
//       }
  
//       if (description !== undefined) {
//         subSection.description = description
//       }
//       if (req.files && req.files.video !== undefined) {
//         const video = req.files.video
//         const uploadDetails = await uploadImageToCloudinary(
//           video,
//           process.env.FOLDER_NAME
//         )
//         subSection.videoUrl = uploadDetails.secure_url
//         subSection.timeDuration = `${uploadDetails.duration}`
//       }
  
//       await subSection.save()
//       const updatedSubSection = await Section.findById(sectionId).populate("subSection");
//       return res.json({
//         success: true,
//         data:updatedSubSection,
//         message: "Section updated successfully",
//       })
//     } catch (error) {
//       console.error(error)
//       return res.status(500).json({
//         success: false,
//         message: "An error occurred while updating the section",
//       })
//     }
//   }

// // exports.deleteSubSection = async(req,res)=>{


// //     try {
// //         const {subSectionId} = req.body

// //         await SubSection.findByIdAndDelete(subSectionId)

// //         return res.status(200).json({
// //             success:true,
// //             message:"SubSection deleted Successfully"
// //         })
// //     } catch (error) {
// //         return res.status(500).json({
// //             success:false,
// //             message:"Cannot update SubSection"
// //         })   
// //     }
// // }
// // writing new code 


// exports.deleteSubSection = async (req, res) => {
//     try {
//       const { subSectionId, sectionId } = req.body
//       await Section.findByIdAndUpdate(
//         { _id: sectionId },
//         {
//           $pull: {
//             subSection: subSectionId,
//           },
//         }
//       )
//       const subSection = await SubSection.findByIdAndDelete({ _id: subSectionId })
  
//       if (!subSection) {
//         return res
//           .status(404)
//           .json({ success: false, message: "SubSection not found" })
//       }
//       const updatedSubSection = await Section.findById(sectionId).populate("subSection");
//       return res.json({
//         success: true,
//         data:updatedSubSection,
//         message: "SubSection deleted successfully",
//       })
//     } catch (error) {
//       console.error(error)
//       return res.status(500).json({
//         success: false,
//         message: "An error occurred while deleting the SubSection",
//       })
//     }
//   }



//___________________________________________


// Import necessary modules
const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

// Create a new sub-section for a given section
exports.createSubSection = async (req, res) => {
    try {
      // Extract necessary information from the request body
      const { sectionId, title, description } = req.body
      const video = req.files.video
  
      // Check if all necessary fields are provided
      if (!sectionId || !title || !description || !video) {
        return res
          .status(404)
          .json({ success: false, message: "All Fields are Required" })
      }
      console.log(video)
  
      // Upload the video file to Cloudinary
      const uploadDetails = await uploadImageToCloudinary(
        video,
        process.env.FOLDER_NAME
      )
      console.log(uploadDetails)
      // Create a new sub-section with the necessary information
      const SubSectionDetails = await SubSection.create({
        title: title,
        timeDuration: `${uploadDetails.duration}`,
        description: description,
        videoUrl: uploadDetails.secure_url,
      })
  
      // Update the corresponding section with the newly created sub-section
      const updatedSection = await Section.findByIdAndUpdate(
        { _id: sectionId }, 
        { $push: { subSection: SubSectionDetails._id } },
        { new: true }
      ).populate("subSection")
  
      // Return the updated section in the response
      return res.status(200).json({ success: true, data: updatedSection })
    } catch (error) {
      // Handle any errors that may occur during the process
      console.error("Error creating new sub-section:", error)
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      })
    }
  }
  
  exports.updateSubSection = async (req, res) => {
    try {
      const { sectionId,subSectionId, title, description } = req.body
      const subSection = await SubSection.findById(subSectionId)
  
      if (!subSection) {
        return res.status(404).json({
          success: false,
          message: "SubSection not found",
        })
      }
  
      if (title !== undefined) {
        subSection.title = title
      }
  
      if (description !== undefined) {
        subSection.description = description
      }
      if (req.files && req.files.video !== undefined) {
        const video = req.files.video
        const uploadDetails = await uploadImageToCloudinary(
          video,
          process.env.FOLDER_NAME
        )
        subSection.videoUrl = uploadDetails.secure_url
        subSection.timeDuration = `${uploadDetails.duration}`
      }
  
      await subSection.save()
  
      const updatedSection = await Section.findById(sectionId).populate("subSection")


      return res.json({
        success: true,
        data:updatedSection,
        message: "Section updated successfully",
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        success: false,
        message: "An error occurred while updating the section",
      })
    }
  }
  
  exports.deleteSubSection = async (req, res) => {
    try {
      const { subSectionId, sectionId } = req.body
      await Section.findByIdAndUpdate(
        { _id: sectionId },
        {
          $pull: {
            subSection: subSectionId,
          },
        }
      )
      const subSection = await SubSection.findByIdAndDelete({ _id: subSectionId })
  
      if (!subSection) {
        return res
          .status(404)
          .json({ success: false, message: "SubSection not found" })
      }

      const updatedSection = await Section.findById(sectionId).populate("subSection")
  
      return res.json({
        success: true,
        data:updatedSection,
        message: "SubSection deleted successfully",
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        success: false,
        message: "An error occurred while deleting the SubSection",
      })
    }
  }