const User = require("../Model/user");
const Post = require("../Model/post");
const getStatsInfo = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalPosts = await User.countDocuments();
    const recentUsers = await User.find({ role: "user" })
      .sort({ createdAt: -1 })
      .limit(5);
    res.json({ totalUsers, totalPosts, recentUsers });
  } catch (error) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

module.exports = getStatsInfo;
