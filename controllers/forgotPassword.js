const User = require("../Model/user");
const crypto = require("crypto");

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const resetToken = crypto.randomBytes(32).toString("hex");

  res.status(200).json({
    message: "Password reset token generated",
    resetToken: resetToken,
  });
};

module.exports = forgotPassword;
