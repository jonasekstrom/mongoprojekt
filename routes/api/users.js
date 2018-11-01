const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");
const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://admin:abc123@ds125683.mlab.com:25683/shareyourmusic";
const dbName = "shareyourmusic"; // Database Name

// Load Input Validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load User model
const User = require("../../models/User");

// @route   GET api/users/test
// @desc    Tests users route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Users Works" }));
router.get("/stats", (req, res) => {
  MongoClient.connect(
    url,
    { useNewUrlParser: true },
    (err, client) => {
      if (err) throw err; // if unable to connect
      const db = client.db(dbName); // ansluten
      const collectionName = "users";
      const collectionName2 = "playlist";
      let userStat = db.collection(collectionName).countDocuments({});
      let playlistStat = db.collection(collectionName2).countDocuments({});
      const appStat = {};
      userStat.then(data => {
        appStat.userCount = data;
      });
      playlistStat.then(data => {
        appStat.playlistCount = data;
        res.send(appStat);
      });
    }
  );
});

// @route   POST api/users/register
// @desc    Register user
// @access  Public
// @author  Jonas
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = "User already exist with this email";
      return res.status(400).json(errors);
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        userImg: req.body.userImg
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route   GET api/users/login
// @desc    Login User / Returning JWT Token
// @access  Public
// @author  Jonas
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email }).then(user => {
    // Check for user
    if (!user) {
      errors.email = "No user exists with that mail address";
      return res.status(404).json(errors);
    }

    // Check Password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User Matched
        const payload = { id: user.id, name: user.name, img: user.userImg }; // Create JWT Payload

        // Sign Token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        errors.password = "Wrong password";
        return res.status(400).json(errors);
      }
    });
  });
});

module.exports = router;
