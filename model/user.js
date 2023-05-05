const mongoose = require('mongoose');

const Userschema = new mongoose.Schema({
    name:{
        type: String,
        require:true
    },
    email:{
        type: String,
        require:true
    },
    password:{
        type: String,
        require:true
    },
    categories:{
        type: String,
        require:true
    },
    country:{
        type: String,
        require:true
    }

})

const User = mongoose.model('users' , Userschema);
module.exports = User;