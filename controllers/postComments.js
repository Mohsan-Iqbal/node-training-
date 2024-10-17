const Post = require("../Model/post");

const postComments = async (req, res) => {
  try {
    const { postId, comment } = req.body;
    const userId = req.user.id;
    if (!comment) {
      return res.status(400).json({ message: "Comment is required" });
    }
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    post.comments.push({ user: userId, comment });
    await post.save();
    res.json({ message: "Comment added successfully" });
  } catch (error) {
    console.error("Error liking post:", error);
    res
      .status(500)
      .json({ message: "Failed to like post", error: error.message });
  }
};

module.exports = { postComments };
