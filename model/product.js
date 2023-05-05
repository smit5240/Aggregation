const mongoose = require('mongoose');

const data = new mongoose.Schema({
    user:{
        type : mongoose.Schema.Types.ObjectId ,
        ref:"users"
    },
    name:{
        type: String,
        require:true
    },
    range:{
        type: Number,
        require:true
    },
    rate:{
        type: Number,
        require:true
    },
    modal:{
        type: String,
        require:true
    },
    link:{
        type: String,
        require:true
    },
    country:{
        type: String,
        require:true
    }

})

const product = mongoose.model('product' , data);
module.exports = product;