const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
// const fetch = require("node-fetch");
const bcrypt = require("bcrypt");
const passport = require("passport");

const initializePassport = require("../passport-config");
const flash = require("express-flash");
const session = require("express-session");
// const API_URL = require("../public/js/config");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.use(flash());
router.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

router.use(passport.initialize());
router.use(passport.session());

router.get("/", (req, res) => {
  res.render("index.ejs");
});

initializePassport(
  passport,
  (email) => users.find((user) => user.email === email),
  (id) => users.find((user) => user.id === id)
);

const users = [];
router.get("/login", (req, res) => {
  res.render("login.ejs", { layout: false });
});
router.get("/signup", (req, res) => {
  res.render("signup.ejs", { layout: false });
});
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  })
);
router.post("/signup", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    users.push({
      id: Date.now().toString(),
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
    console.log(users);
    res.redirect("/login");
  } catch (error) {
    console.log(error);
    res.redirect("/signup");
  }
});

module.exports = router;
