const jwt = require("jsonwebtoken");
const User = require("../Model/user");
const decodeToken = require("../jwt/decodeToken");

const getUserInfo = async (req, res) => {
  try {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ message: "Access denied. No token provided." });
    }

    const decoded = decodeToken(token);
    const userId = decoded.id;

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res
      .status(200)
      .json({ id: user._id, username: user.username, email: user.email });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = getUserInfo;
