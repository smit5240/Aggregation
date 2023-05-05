const express  = require('express');
const router = express.Router();
const userController = require("../controllers/user.controller")


router.post("/postuser" , userController.postuser);
router.post("/loginuser" , userController.loginuser);
router.delete("/deleteuser/:id" , userController.deleteuser);
router.put("/updateuser/:id" , userController.updateuser);
router.get("/getuser" , userController.getuser);







module.exports = router;