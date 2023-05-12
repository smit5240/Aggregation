const express = require('express');
const router  = express.Router();
const upload = require('../middleware/uploadfile');
const imagecontroller = require('../controllers/upload.controller')

router.post("/file" ,upload ,imagecontroller.uploadImage);


module.exports = router