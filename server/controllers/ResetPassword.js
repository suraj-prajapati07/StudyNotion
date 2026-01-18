const { passwordUpdated } = require("../mail/templates/passwordUpdate");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require('bcrypt');
const crypto = require('crypto');

//resetPasswordToken.......
exports.resetPasswordToken = async (req, res) => {
	try {
        //get email from req body.......
		const email = req.body.email;
        //email validation........
        if(!email){
            return res.json({
				success: false,
				message: "Email not found",
			});
        }

        //check user exist or not......
		const user = await User.findOne({ email: email });
		if (!user) {
			return res.json({
				success: false,
				message: `This Email: ${email} is not Registered With Us Please Enter a Valid Email `,
			});
		}

        //generate random token........
        // 20-char Token...
		const token = crypto.randomBytes(20).toString("hex");

        //update user by adding token and experyation time.......
		const updatedDetails = await User.findOneAndUpdate(
			{ email: email },
			{
				token: token,
				resetPasswordExpires: Date.now() + 5*60*1000, //valid for 5 min..
			},
			{ new: true }
		);
		console.log("DETAILS", updatedDetails);

		//Now send the mail containg the url.......

        //create url......
		const url = `http://localhost:3000/update-password/${token}`;
		//send mail....
		await mailSender(
			email, //email
			"Password Reset",//title
			`Your Link for email verification is ${url}. Please click this url to reset your password.` //body
		);

		res.json({
			success: true,
			message: "Email Sent Successfully, Please Check Your Email to Continue Further",
		});
	} 
    catch (error) {
		return res.json({
			error: error.message,
			success: false,
			message: `Some Error in Sending the Reset Message`,
		});
	}
};


//resetPassword.........
exports.resetPassword = async (req, res) => {
	try {
		const { password, confirmPassword, token } = req.body; 
        //token: frontend se url se extract hoke aa raha hoga.......

        //validate newPassword.......
		if (confirmPassword !== password) {
			return res.json({
				success: false,
				message: "Password and Confirm Password Does not Match",
			});
		}

        //get userdetails from db using token......
		const userDetails = await User.findOne({ token: token });
        //if no entry - invalid token.....
		if (!userDetails) {
			return res.json({
				success: false,
				message: "Token is Invalid",
			});
		}
        //token time check.......
		if ( userDetails.resetPasswordExpires < Date.now() ) {
			return res.status(403).json({
				success: false,
				message: `Token is Expired, Please Regenerate Your Token`,
			});
		}

        //hash password..........
		const hashedPassword = await bcrypt.hash(password, 10);
        //update password.....
		await User.findOneAndUpdate(
			{ token: token },
			{ password: hashedPassword },
			{ new: true }
		);

		//send confirmation mail to user.....
		await mailSender(
			userDetails.email,
			"Password Reset Successfully",
			passwordUpdated(
				userDetails.email,
				`${userDetails.firstName} ${userDetails.lastName}`,
				"reset"
			)
		);
        //return response........
		res.json({
			success: true,
			message: `Password Reset Successful`,
			email : userDetails.email
		});
	} 
    catch (error) {
		return res.json({
			error: error.message,
			success: false,
			message: `Some Error in Updating the Password`,
		});
	}
};