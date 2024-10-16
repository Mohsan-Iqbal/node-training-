const Post = require("../Model/post");
const path = require("path");

const addPost = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Image file is required" });
    }
    console.log("requested file: ", req);

    if (!req.body.title || !req.body.content) {
      return res
        .status(400)
        .json({ message: "Title and content are required" });
    }

    const existingPost = await Post.findOne({ title: req.body.title });
    if (existingPost) {
      return res
        .status(400)
        .json({ message: "Post with the same title already exists" });
    }

    const newPost = new Post({
      title: req.body.title,
      content: req.body.content,
      imagePath: path.join("/uploads/", req.file.filename),
      user: req.user.id,
    });

    const savedPost = await newPost.save();

    return res.status(201).json({
      message: "Post created successfully",
      post: savedPost,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to create post", error: error.message });
  }
};

module.exports = { addPost };
