const User = require("../models/User")
const mailSender = require("../utils/mailSender")
const bcrypt = require("bcrypt")
const crypto = require("crypto")
//resetPasswordToken


exports.resetPasswordToken = async (req,res)=>{
    try {
            // get email from request body 
    const email = req.body.email;
    // check user for this email, email validation    
    const user = await User.findOne({email:email});
    if(!user){
        return res.json({
            success:false,
            message: `This Email: ${email} is not Registered With Us Enter a Valid Email `,
        })
    }
    // generate token
    const token = crypto.randomBytes(20).toString("hex");
    console.log(token)
    // update user by adding token and expiration time 
    const updatedDetails = await User.findOneAndUpdate({email:email},
        {
            token:token,
            resetPasswordExpires: Date.now() + 3600000,
        },
        {new:true}
        )
    console.log("DETAILS", updatedDetails);
    // create url
    const url = `http://localhost:3000/update-password/${token}`
    // send mail containing the url
    await mailSender(email, "Password Reset Link", 
                        `Password Reset Link: ${url} `
                    )
    // return response 
     res.json({
        success:true,
        message:"Email sent successfully, please check email and change you password"
    });
    } catch (error) {
        return res.json({
            success:false,
            message:"Something went wrong while sending reset password mail"
        })
    }
}

//resetPassword
exports.resetPassword = async (req,res)=>{
    try {
            // data fetch 
    const {password, confirmPassword, token} = req.body;
    // validation 
    if(password!== confirmPassword){
        return res.status(403).json({
            success:false,
            message:"Password do not match"
        })
    }
    // get userDetails from db using token 
    const userDetails = await User.findOne({token:token})
    // if no entry--> means invalid token 
    if(!userDetails){
        return res.status(400).json({
            success:false,
            message:"Token is invalid"
        })
    }
    // else token time expires (so time check krlo)
    if(!(userDetails.resetPasswordExpires > Date.now())){
        return res.json({
            success:false,
            message:"Token is invalid, please regenerate your token "
        })
    }
    // hash password 
    const hashedPassword = await bcrypt.hash(password, 10)
    // update the password 
    await User.findOneAndUpdate(
        {token:token},
        {password:hashedPassword},
        {new:true}
    )
    // return response
    res.status(200).json({
        success:true,
        message:"Password reset Successfully"
    })
    } catch (error) {
        return res.status(500).json({
            success:false,
            messsage:"Something went wrong while sending reset password email"
        })
    }
}