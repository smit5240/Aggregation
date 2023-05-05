const express  = require('express');
const bodyParser = require('body-parser')
const router = express.Router();


const jsonParser = bodyParser.json()
router.use("/user" , jsonParser , require("./user.router"));
router.use("/product" , jsonParser , require("./product.router"));






module.exports = router;