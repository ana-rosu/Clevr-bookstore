const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index.ejs");
});
router.get("/login", (req, res) => {
  res.render("login.ejs", { layout: false });
});
router.get("/signup", (req, res) => {
  res.render("signup.ejs", { layout: false });
});
router.post("/login", (req, res) => {});
router.post("/signup", (req, res) => {});

router.get("*", (req, res) => {
  res.render("404.ejs", { layout: false });
});
module.exports = router;
