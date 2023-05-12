const express = require('express');
const router = express.Router();
const productcontroller = require('../controllers/product.controller')
const fatchuser = require('../middleware/authorise')



router.post("/addproduct" ,fatchuser ,  productcontroller.addproduct );
router.delete("/deleteproduct/:id" ,  productcontroller.deleteproduct);
router.put("/updateproduct" ,  productcontroller.updateproduct);
router.get("/getproduct" ,fatchuser ,  productcontroller.getproduct);






module.exports = router;