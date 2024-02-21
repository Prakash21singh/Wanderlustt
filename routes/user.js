const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const {
  signupForm,
  signup,
  loginForm,
  logIn,
  logOut,
} = require("../controllers/user.js");

router.route("/signup").get(signupForm).post(wrapAsync(signup));

router
  .route("/login")
  .get(loginForm)
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    logIn
  );

router.get("/logout", logOut);

module.exports = router;
