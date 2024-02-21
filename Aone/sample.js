const express = require("express");
const app = express();
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const sessionOptions = {
  saveUninitialized: true,
  resave: false,
  secret: "mysecretpasswordstring",
};

app.use(session(sessionOptions));
app.use(flash());
app.get("/register", (req, res) => {
  let { name } = req.query;
  req.session.name = name;
  req.flash("info", "flash is back");
  res.redirect("/get");
});

app.get("/get", (req, res) => {
  res.locals.msgs = req.flash("info");
  res.render("page.ejs", { name: req.session.name });
});
app.listen(3000, () => {
  console.log("app is listening on port 3000");
});
