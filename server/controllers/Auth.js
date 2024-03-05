const User  = require("../models/User")
const OTP  = require("../models/OTP")
const otpGenerator = require("otp-generator")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const Profile = require("../models/Profile")
const mailSender = require("../utils/mailSender")
const passwordUpdated  = require("../mail/templates/passwordUpdate")
require("dotenv").config
//sentOTP
exports.sentOTP = async (req, res) => {
	try {
		const { email } = req.body;

		// Check if user is already present
		// Find user with provided email
		const checkUserPresent = await User.findOne({ email });
		// to be used in case of signup

		// If user found with provided email
		if (checkUserPresent) {
			// Return 401 Unauthorized status code with error message
			return res.status(401).json({
				success: false,
				message: `User is Already Registered`,
			});
		}

		var otp = otpGenerator.generate(6, {
			upperCaseAlphabets: false,
			lowerCaseAlphabets: false,
			specialChars: false,
		});
		const result = await OTP.findOne({ otp: otp });
		console.log("Result is Generate OTP Func");
		console.log("OTP", otp);
		console.log("Result", result);
		while (result) {
			otp = otpGenerator.generate(6, {
				upperCaseAlphabets: false,
			});
		}
		const otpPayload = { email, otp };
		const otpBody = await OTP.create(otpPayload);
		console.log("OTP Body", otpBody);
		res.status(200).json({
			success: true,
			message: `OTP Sent Successfully`,
			otp,
		});
	} catch (error) {
		console.log(error.message);
		return res.status(500).json({ success: false, error: error.message });
	}
};

//signup
exports.signUp = async (req,res)=>{
    try {
        // fetch data 
        const {firstName, lastName, email, password, confirmPassword, accountType, contactNumber, otp} = req.body;
        // validate data
        if(!firstName || !lastName || !email || !password || !confirmPassword || !otp ){
            return res.status(403).json({
                success:false,
                message:"All fields are required"
            })
        }
        // match the two passwords 
        if(password!==confirmPassword){
            return res.status(400).json({
                success:false,
                message:"Password do not match"
            })
        }
        // check if user already exists 
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                success:false,
                message:"User already registered",
            })
        }
        // find most recent otp for the user 
        const recentOtp = await OTP.find({email}).sort({createdAt:-1}).limit(1)
        console.log(recentOtp)
        // validate otp
        if(recentOtp.length===0){
            // otp nhi mila
            return res.status(400).json({
                success:false,
                message:"OTP not found"
            })
        }else if( otp !== recentOtp[0].otp){
            return res.status(400).json({
                success:false,
                message:"Invalid OTP"
            })
        }
        //hash the password
        const hashedPassword = await bcrypt.hash(password,10)

        // create the user 
        let approved = "";
		approved === "Instructor" ? (approved = false) : (approved = true);
        // create entry in db 

        const profileDetails = await Profile.create({
            gender:null,
            dateOfBirth:null,
            about:null,
            contactNumber:null
        })
        const user = await User.create({firstName, lastName, email, contactNumber, password:hashedPassword, accountType:accountType, additionalDetails:profileDetails._id, image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`})
        // return res 
        return res.status(200).json({
            success:true,
            message:"User registered Successfully",
            user
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:'User cannot be registered. Pls try again'
        })
    }
}

//login
exports.login = async (req,res)=>{
    try {
        //  fetch data 
        const {email, password} =req.body;
        // validate the data
        if(!email || !password){
            return res.status(403).json({
                success:false,
                message:"All fields are required !"
            })
        }
        // check user exist or not 
        const user = await User.findOne({email}).populate("additionalDetails")
        if(!user){
            return res.status(401).json({
                success:false,
                message:"User is not registered, please sign up first"
            })
        }
        // generate JWT, after matching the password
        if(await bcrypt.compare(password, user.password)){
            const payload = {
                email: user.email,
                id: user._id,
                accountType: user.accountType  
            }
            const token = jwt.sign(payload, process.env.JWT_SECRET,{
                expiresIn:"24h"
            })
            user.token = token;
            user.password = undefined;

            // create cookie and send response
            const options = {
                expiresIn: new Date(Date.now() + 3*24*60*60*1000),
                httpOnly:true,
            }
            res.cookie("token", token, options).status(200).json({
                success:true,
                token,
                user, 
                message:"Logged in successfully"
                })
        }
        else{
            return res.status(401).json({
                success:false,
                message:"Password is incorrect"
            });
        }
        
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Login failure, pls try again later"
        })
    }
}

//changePassword
// exports.changePassword = async(req,res)=>{
//     try {
//         // get the data 
//         const userDetails = await User.findById(req.user.id);
//         // get the oldPassword, newPassword
//         const {oldPassword, newPassword, confirmNewPassword} = req.body;
//         // validate old password
//         const isPasswordMatch = await bcrypt.compare(oldPassword, userDetails.password)
//         if(!isPasswordMatch){
//             return res.status(401).json({
//                 success:false,
//                 message:"Password is incorrect"
//             })
//         }
//         // if(newPassword !== confirmNewPassword) {
//         //     // If new password and confirm new password do not match, return a 400 (Bad Request) error
// 		// 	return res.status(400).json({
// 		// 		success: false,
// 		// 		message: "The password and confirm password does not match",
// 		// 	});
//         // }
//         // update password 
//         const encryptedPassword = await bcrypt.hash(newPassword,10)
       
//         const updatedUserDetails = User.findByIdAndUpdate(
//             req.user.id,   
//             {password:encryptedPassword},
//             {new:true}
//         )
//         // send mail - password updated 
//         try {
//             const emailResponse = await mailSender(
//               updatedUserDetails.email,
//               passwordUpdated(
//                 updatedUserDetails.email,
//                 `Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
//               )
//             )
//             console.log("Email sent successfully:", emailResponse.response)
//           } catch (error) {
//             // If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
//             console.error("Error occurred while sending email:", error)
//             return res.status(500).json({
//               success: false,
//               message: "Error occurred while sending email",
//               error: error.message,
//             })
//           }
//         // send res 
//         return res
//         .status(200)
//         .json({ success: true, message: "Password updated successfully" })
//     } catch (error) {
//         // If there's an error updating the password, log the error and return a 500 (Internal Server Error) error
//     console.error("Error occurred while updating password:", error)
//         return res.status(500).json({
//         success: false,
//         message: "Error occurred while updating password",
//         error: error.message,
//         })
//     }
// }

exports.changePassword = async (req, res) => {
	try {
		// Get user data from req.user
		const userDetails = await User.findById(req.user.id);

		// Get old password, new password, and confirm new password from req.body
		const { oldPassword, newPassword, confirmNewPassword } = req.body;

		// Validate old password
		const isPasswordMatch = await bcrypt.compare(
			oldPassword,
			userDetails.password
		);
		if (!isPasswordMatch) {
			// If old password does not match, return a 401 (Unauthorized) error
			return res
				.status(401)
				.json({ success: false, message: "The password is incorrect" });
		}

		// Match new password and confirm new password
		if (newPassword !== confirmNewPassword) {
			// If new password and confirm new password do not match, return a 400 (Bad Request) error
			return res.status(400).json({
				success: false,
				message: "The password and confirm password does not match",
			});
		}

		// Update password
		const encryptedPassword = await bcrypt.hash(newPassword, 10);
		const updatedUserDetails = await User.findByIdAndUpdate(
			req.user.id,
			{ password: encryptedPassword },
			{ new: true }
		);

		// Send notification email
		try {
			const emailResponse = await mailSender(
				updatedUserDetails.email,
				passwordUpdated(
					updatedUserDetails.email,
					`Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
				)
			);
			console.log("Email sent successfully:", emailResponse.response);
		} catch (error) {
			// If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
			console.error("Error occurred while sending email:", error);
			return res.status(500).json({
				success: false,
				message: "Error occurred while sending email",
				error: error.message,
			});
		}

		// Return success response
		return res
			.status(200)
			.json({ success: true, message: "Password updated successfully" });
	} catch (error) {
		// If there's an error updating the password, log the error and return a 500 (Internal Server Error) error
		console.error("Error occurred while updating password:", error);
		return res.status(500).json({
			success: false,
			message: "Error occurred while updating password",
			error: error.message,
		});
	}
};





