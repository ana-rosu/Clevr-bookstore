const express = require("express");
const router = express.Router();
const User = require("../models/user");

// All users route
router.get("/", (req, res) => {
  res.render("users/index");
});

// New user route
router.get("/new", (req, res) => {
  res.render("users/new", { user: new User() });
});

// Create user route
router.post("/", async (req, res) => {
  const user = new User({
    name: req.body.name,
  });
  try {
    const newUser = await user.save();
    res.redirect("users");
    //     // res.redirect(`users/${newUser.id}`);
  } catch {
    res.render("users/new", {
      user: user,
      errorMessage: "Error creating user",
    });
  }
});

module.exports = router;
