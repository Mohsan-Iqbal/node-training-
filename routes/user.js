const express = require("express");
const getUserInfo = require("../controllers/getUserInfo");
const authorize = require("../middleware/authorize");
const { addPost } = require("../controllers/addPost");
const { getPostsByUser } = require("../controllers/getPostsByUser");
const { postLikes } = require("../controllers/postLikes");
const { postComments } = require("../controllers/postComments");
const upload = require("../middleware/upload");
const router = express.Router();

router.get("/getUserInfo", authorize(["user"]), getUserInfo);
router.get("/dashboard", authorize(["user"]), (req, res) => {
  res.json({ msg: "Welcome to the dashboard" });
});
router.post("/add-post", authorize(["user"]), upload.single("image"), addPost);
router.get("/getPosts", authorize(["user"]), getPostsByUser);
router.post("/post-like-dislike", authorize(["user"]), postLikes);
router.post("/post-comments", authorize(["user"]), postComments);

module.exports = router;
