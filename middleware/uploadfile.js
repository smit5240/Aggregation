const multer = require('multer');
const path = require('path');
const imageupload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/upload");
    },
    filename:function(req , file , cb){
      cb(null , `${file.fieldname + "-" + Date.now() + file.originalname}`)
    }
  })
}).single("User")


module.exports = imageupload;   