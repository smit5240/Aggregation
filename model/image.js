var mongoose = require('mongoose');

var imageSchema = new mongoose.Schema({
    name:{
        type: String,
        require:true
    },
    path:{
        type: String,
        require:true
    },
});

const images = mongoose.model('Image', imageSchema);

module.exports = images;
