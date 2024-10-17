const express = require("express");
const getStatsInfo = require("../controllers/getStatsInfo");
const authorize = require("../middleware/authorize");
const router = express.Router();

router.get("/stats", authorize(["admin"]), getStatsInfo);

module.exports = router;
