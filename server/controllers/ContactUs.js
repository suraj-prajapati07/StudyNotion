const mailSender = require("../utils/mailSender");
const { contactUsEmail } = require('../mail/templates/contactFormRes');

exports.contactUsController = async(req, res) => {
    try{
        //fetch data from req body.....
        const { 
            email, 
            firstName, 
            lastName, 
            message, 
            phoneNo, 
            countryCode 
        } = req.body;

        //Send confermation mail , your data succesfully reached........
        const emailResponse = await mailSender(
            email,
            "Your Data send successfully",
            contactUsEmail(email, firstName, lastName, message, phoneNo, countryCode)
        );
        console.log("Email Response : ", emailResponse);

        //return response.......
        return res.json({
            success: true,
            message: "Email send successfully",
        })
    }
    catch(error){
        console.log("Error", error)
        return res.status(500).json({
            success: false,
            message: "Something went wrong while connecting with us",
        });
    }
}