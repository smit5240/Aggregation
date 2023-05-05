const mongoose = require('mongoose');
require('dotenv').config();
const KEY = process.env.KEY;

const Connect = async () => {
    const connectionParams = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      };
   await mongoose.connect(KEY , connectionParams).then( (res) => {
        console.log("Connection Successfull");
    }).catch( (error) => {
        console.log("EROR -->" , error);
    })
}


module.exports = Connect