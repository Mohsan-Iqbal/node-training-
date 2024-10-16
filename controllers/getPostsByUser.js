const Post = require("../Model/post");

const getPostsByUser = async (req, res) => {
  try {
    const userId = req.user.id;

    const posts = await Post.find({ user: userId });

    if (!posts.length) {
      return res.status(404).json({ message: "No posts found for this user" });
    }

    return res.status(200).json({ posts });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to get posts", error: error.message });
  }
};

module.exports = { getPostsByUser };
