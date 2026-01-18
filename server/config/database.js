//Instancetiate mongoose.....
const mongoose = require('mongoose');
//Load .env file in process.env obj.......
require('dotenv').config();

//connection logic......
exports.connectWithDB = () => {
    mongoose.connect(process.env.DATABASE_URL)
    .then( () => {
        console.log("DB Connected Successfully");
    })
    .catch( (err) => {
        console.log("DB Connection Failed");
        console.error(err);
        process.exit(1);
    })
}