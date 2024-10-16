const express = require("express");
const getUserInfo = require("../controllers/getUserInfo");
const authorize = require("../middleware/authorize");
const { addPost } = require("../controllers/addPost");
const { getPostsByUser } = require("../controllers/getPostsByUser");
const upload = require("../middleware/upload");
const router = express.Router();

router.get("/getUserInfo", authorize(["user"]), getUserInfo);
router.get("/dashboard", authorize(["user"]), (req, res) => {
  res.json({ msg: "Welcome to the dashboard" });
});
router.post("/add-post", authorize(["user"]), upload.single("image"), addPost);
router.get("/getPosts", authorize(["user"]), getPostsByUser);

module.exports = router;
