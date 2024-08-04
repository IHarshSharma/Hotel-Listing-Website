const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

const usersController = require("../controllers/users.js");

router.get("/signup", usersController.renderSignupForm);

router.post(
  "/signup",
  wrapAsync(usersController.usersSignup)
);

router.get("/login", usersController.renderLoginForm);

router.post(
  "/login",
  saveRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "login",
    failureFlash: true,
  }),
  usersController.postLoginPage);

router.get("/logout", usersController.usersLogout);

module.exports = router;
