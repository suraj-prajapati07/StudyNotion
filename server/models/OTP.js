const mongoose = require('mongoose');
const mailSender = require('../utils/mailSender');
const emailTemplate = require('../mail/templates/emailVerificationTemplate');

const OTPSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        //expire in 3 minute.......
        expires: 5*60,
    }
});

//send mail verification........
async function sendVerificationEmail(email, otp) {
    try{
        let title = "Verification Email from StudyNotion"; 
        const mailResponse = await mailSender(
            email,
			title,
			emailTemplate(otp)
        );
        console.log('Email sent Successfully : ',mailResponse);
    }
    catch(err){
        console.log("Error occured while verification of email : ",err);
        throw err;
    }
}

//pre middleware.......
OTPSchema.pre('save', async function(next){
    await sendVerificationEmail(this.email, this.otp);
    //go to next middleware.......
    next();
});

//export model.......
module.exports = mongoose.model("OTP", OTPSchema);