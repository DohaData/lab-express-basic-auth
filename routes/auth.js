const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/User.model");

const router = express.Router();

const saltRounds = 10;

/* GET home page */
router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

// auth.routes.js
// the imports, get and post route remain untouched for now

router.get("/userProfile/:username", async (req, res) => {
  const user = await User.findOne({ username: req.params.username });
  res.render("auth/profile", user);
});

router.post("/signup", async (req, res, next) => {
  // console.log("The form data: ", req.body);

  const { username, email, password } = req.body;

  const hashedPassword = await bcrypt

    .genSalt(saltRounds)

    .then((salt) => bcrypt.hash(password, salt))

    .then((hashedPassword) => {
      return hashedPassword;
      })

    .catch((error) => next(error));

    await User.create({ username, email, passwordHash: hashedPassword });

  res.redirect(`/userProfile/${username}`);
});

module.exports = router;
