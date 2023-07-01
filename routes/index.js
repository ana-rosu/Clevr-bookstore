const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index.ejs");
});

router.get("/login", (req, res) => {
  res.render("login.ejs");
});
router.get("/signup", (req, res) => {
  res.render("signup.ejs");
});
router.post("/login", (req, res) => {});
router.post("/signup", (req, res) => {});

router.get("*", (req, res) => {
  res.render("404.ejs");
});

module.exports = router;
