const mongoose = require('mongoose');

const subSectionSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    
    description: {
        type: String,
    },

    timeDuration: {
        type: String,
    },

    videoUrl: {
        type: String,
    }
});

//export model.......
module.exports = mongoose.model("SubSection", subSectionSchema);