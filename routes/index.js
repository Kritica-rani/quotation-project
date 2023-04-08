const express = require("express");
const router = express.Router();
//import userController

const userController = require("../controller/index");
const quotationController = require("../controller/quotations");

router.post("/signup", userController.signup);
router.post("/signin", userController.signIn);
router.post("/create", quotationController.createQuotation);

module.exports = router;
