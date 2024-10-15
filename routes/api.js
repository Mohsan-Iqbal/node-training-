const express = require("express");
const getUserInfo = require("../controllers/getUserInfo");
const router = express.Router();
router.get("/getUserInfo", getUserInfo);

module.exports = router;
