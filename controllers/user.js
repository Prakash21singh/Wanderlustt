const User = require("../models/user");

module.exports.signup = async (req, res) => {
  try {
    let { username, email, password } = req.body;
    const newUser = await new User({
      email,
      username,
    });
    const registeredUser = await User.register(newUser, password);
    req.login(registeredUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "Welcome to wanderlustt");
      res.redirect("/listing");
    });
  } catch (error) {
    req.flash("error", error.message);
    res.redirect("/signup");
  }
};

module.exports.signupForm = (req, res) => {
  res.render("./users/signup.ejs");
};

module.exports.loginForm = (req, res) => {
  res.render("./users/login.ejs");
};

module.exports.logIn = async (req, res) => {
  req.flash("success", "Welcome back to Wanderlustt");
  let redirectUrl = res.locals.redirectUrl || "/listing";
  res.redirect(redirectUrl);
};

module.exports.logOut = (req, res) => {
  req.logOut((err) => {
    if (err) {
      next(err);
    }
    req.flash("success", "You're Logged out!!");
    res.redirect("/listing");
  });
};
