const express  = require('express');
const router = express.Router();
const userController = require("../controllers/samedata.controller")


router.get("/samedata" , userController.lookup);

module.exports = router;