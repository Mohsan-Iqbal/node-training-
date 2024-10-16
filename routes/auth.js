const express = require("express");

const login = require("../controllers/login");
const createUser = require("../controllers/signup");
const forgotPassword = require("../controllers/forgotPassword");
const resetPassword = require("../controllers/resetPassword");
const router = express.Router();
router.post("/signup", createUser);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

module.exports = router;
