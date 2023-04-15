const express = require("express");
const router = express.Router();
//import passport
const passport = require("passport");
//import userController

const userController = require("../controller/index");
const quotationController = require("../controller/quotations");

router.post("/signup", userController.signup);
router.post("/signin", userController.signIn);
//private api
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),

  quotationController.createQuotation
);
//get all quotations
router.get(
  "/quotations",
  passport.authenticate("jwt", { session: false }),
  quotationController.getAllQuotations
);

module.exports = router;
