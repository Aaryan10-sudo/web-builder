const express = require("express");
const validateUser = require("../validator/auth.validate");
const {
  signupUser,
  verifyUser,
  loginUser,
  getUserDetails,
} = require("../controller/auth.controller");
const isAuthenticated = require("../middleware/isAuthenticated");
const router = express.Router();

router.route("/create").post(validateUser, signupUser);
router.route("/verify").post(verifyUser);
router.route("/login").post(loginUser);
router.route("/").get(isAuthenticated, getUserDetails);

module.exports = router;
