const nodemailer = require('nodemailer');
require('dotenv').config();


const mailSender = async(email, title, body) => {
    try{
        //establish connection......
        let transpoter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            }
        });
        //send mail.....
        let info = await transpoter.sendMail({
            from: "StduyNotion - by Suraj",
            to: `${email}`,
            subject: `${title}`,
            html: `${body}`,
        });
    }
    catch(err){
        console.log(err.message);
        console.error(err);
    }
}
//export......
module.exports = mailSender;