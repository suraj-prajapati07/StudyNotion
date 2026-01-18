//Import cloudinary........
const cloudinary = require('cloudinary').v2;

//load .env file config in process obj...
require('dotenv').config();

//define cloudinary connection method........
exports.cloudinaryConnect = () =>{
    try{
        cloudinary.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.API_KEY,
            api_secret: process.env.API_SECRET,
        });
        console.log("Cloudinary connected successfully");
    }
    catch(err){
        console.log("Cloudinary connection Issue");
    }
}