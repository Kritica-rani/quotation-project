const express = require("express");
const router = express.Router();
//import userController

const userController = require("../controller/index");

router.post("/signup", userController.signup);
router.post("/signin", userController.signIn);

module.exports = router;
