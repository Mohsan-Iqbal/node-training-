const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  imagePath: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
