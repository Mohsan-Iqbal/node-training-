const Post = require("../Model/post");

const postLikes = async (req, res) => {
  try {
    const { postId } = req.body;
    const userId = req.user.id;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const isLiked = post.likes.includes(userId);
    if (isLiked) {
      post.likes = post.likes.filter((id) => id.toString() !== userId);
    } else {
      post.likes.push(userId);
    }

    await post.save();

    res.json({
      message: `Post ${isLiked ? "disliked" : "liked"} successfully`,
    });
  } catch (error) {
    console.error("Error liking post:", error);
    res
      .status(500)
      .json({ message: "Failed to like post", error: error.message });
  }
};

module.exports = { postLikes };
