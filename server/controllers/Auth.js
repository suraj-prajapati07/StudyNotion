const User = require('../models/User');
const OTP = require('../models/OTP');
const Profile = require('../models/Profile');
const otpGenerator = require('otp-generator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mailSender = require('../utils/mailSender');
const {passwordUpdated} = require('../mail/templates/passwordUpdate');
require('dotenv').config();

//SendOTP.......
exports.sendOTP = async(req, res) => {
    try{
        //fetch email........
        const {email} = req.body;
        //check user already exist.....
        const user = await User.findOne({email});
        if(user){
            return res.status(401).json({
                success: false,
                message: "User already registered",
            });
        }
        //now generate OTP.......
        let otp = otpGenerator.generate(6, {
            digits: true,
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });
        console.log("Generated OTP : ",otp);
        //check unique otp generated or not, otherwise generate it.....
        const result = await OTP.findOne({otp: otp});
        while(result){
            otp = otpGenerator.generate(6, {
                digits: true,
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false,
            });
            result = await OTP.findOne({otp: otp});
            //-->Wrong method.....
        }
        // Save to DB
        const otpBody = await OTP.create({ email, otp });
        //return response.....
        res.status(200).json({
            success: true,
            message: 'OTP Sent Successfully',
            otp,
        });
    }
    catch(err){
        console.error(err);
        res.status(500).json({
            success: false,
            error: err.message,
            message: 'OTP not sent',
        });
    }
}

//Signup....
exports.signup = async(req, res) => {
    try{
        //fetch data........
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            accountType,
            otp,
        } = req.body;
        //validate data.......
        if(!firstName || !lastName || !email || !password || !confirmPassword || !otp){
            return res.status(403).json({
                success: false,
                message: "All fields are required",
            });
        }
        //password match.......
        if(password !== confirmPassword){
            return res.status(403).json({
                success: false,
                message: "Password does not match, please try again",
            });
        }
        //check user already exist.........
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(401).json({
                success: false,
                message: "User is already registered",
            });
        }

        //find most recent OTP stored for the user.....
        const resentOTP = await OTP.find({email}).sort({createdAt: -1}).limit(1);
        console.log("Recent OTP : ", resentOTP);
        //validate otp......
        if(resentOTP.length === 0){
            //otp not found.....
            return res.status(400).json({
                success: false,
                message: "OTP not found",
            })
        }
        else if(otp !== resentOTP[0].otp){
            //invalid otp.......
            return res.status(400).json({
                success: false,
                message: "Invalid OTP",
            })
        }

        //hash password........
        const hasedPassword = await bcrypt.hash(password, 10);
        //create entry in db.......
        const profileDetails = await Profile.create({
            gender: null,
            dateOfBirth: null,
            about: null,
            contactNumber: null,
        })
        
        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hasedPassword,
            accountType,
            additionalDetails: profileDetails._id,
            image: `https://api.dicebear.com/9.x/initials/svg?seed=${firstName[0]}${lastName[0]}`,
        });
        //return res....
        return res.status(200).json({
            success: true,
            message: 'User is registered successfully',
            user,
        });
    }
    catch(err){
        console.error(err);
        return res.status(500).json({
            success: false,
            error: err.message,
            message: 'Error occur while registring User',
        });
    }
}


//Login.....
exports.login = async (req, res) => {
	try {
		// Get email and password from request body
		const { email, password } = req.body;

		// Check if email or password is missing
		if (!email || !password) {
			// Return 400 Bad Request status code with error message
			return res.status(400).json({
				success: false,
				message: `Please Fill up All the Required Fields`,
			});
		}

		// check user exist or not.........
		const user = await User.findOne({ email }).populate("additionalDetails").exec();
		if (!user) {
			// Return 401 Unauthorized status .....
			return res.status(401).json({
				success: false,
				message: `User is not Registered with Us Please SignUp to Continue`,
			});
		}

		// Generate JWT token and Compare Password
		if (await bcrypt.compare(password, user.password)) {
            //password matched......
            const payload = { 
                email: user.email,
                id: user._id,
                accountType: user.accountType 
            }

			const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "24h"});

			//store token in existing user obj and hide password...
			user.token = token;
			user.password = undefined;
			// Set cookie for token and return success response
			const options = {
                //expire in 3-days.......
				expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
				httpOnly: true,
			}
			res.cookie("token", token, options).status(200).json({
				success: true,
				token,
				user,
				message: `User Login Success`,
			});
		} 
        else{
            //password not matched.......
            return res.status(401).json({
                success: false,
                message: `Password is incorrect`,
            });
		}
	}
    catch(error){
		console.error(error);
		// Return 500 Internal Server Error status code with error message
		return res.status(500).json({
			success: false,
			message: `Login Failure Please Try Again`,
		});
	}
};


// Change Password......
exports.changePassword = async (req, res) => {
	try {
        // Get old password, new password, and confirm new password from req.body
		const { oldPassword, newPassword, confirmPassword } = req.body;

		// Get user data from req.user
		const userDetails = await User.findById(req.user.id);

		// Validate old password
		const isPasswordMatch = await bcrypt.compare(oldPassword,userDetails.password);
		if (!isPasswordMatch) {
			// old password does not match, return 401 (Unauthorized) error
			return res.status(401).json({ 
                success: false, message: "The password is incorrect"
            });
		}

		// Validate new password.....
		if (newPassword !== confirmPassword) {
			return res.status(400).json({
				success: false,
				message: "The password and confirm password does not match",
			});
		}

		// Check user uses alredy used password?...
		if (newPassword === oldPassword) {
			return res.status(400).json({
				success: false,
				message: "Use a new password",
			});
		}

		// Now Update password.........
		const hashPassword = await bcrypt.hash(newPassword, 10);

		const updatedUserDetails = await User.findByIdAndUpdate(req.user.id,
			{ password: hashPassword },
			{ new: true } //returning new doc....
		);

        // Send notification email..........
        try{
            const emailResponse = mailSender(
                updatedUserDetails.email,
                "Password Changed Successfully",
                passwordUpdated(
					updatedUserDetails.email,
					`${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`,
                    "update"
				)

            );
            console.log("Email sent successfully:", emailResponse.response);
        }
        catch(err){
            console.error("Error occurred while sending email:", err);
			return res.status(500).json({
				success: false,
				message: "Error occurred while sending email",
				error: err.message,
			});
        }

        // Return success response
		return res.status(200).json({
            success: true, 
            message: "Password updated successfully" 
        });
		
	} 
    catch (error) {
		console.error("Error occurred while updating password:", error);
		return res.status(500).json({
			success: false,
			message: "Error occurred while updating password",
			error: error.message,
		});
	}
};
