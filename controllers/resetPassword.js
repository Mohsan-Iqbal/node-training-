const User = require("../Model/user");
const bcrypt = require("bcrypt");

const resetPassword = async (req, res) => {
  const { email, token, password } = req.body;
  if (!(email && token && password)) {
    return res
      .status(400)
      .json({ message: "Email, token, and password are required" });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const salt = 10;
  user.password = await bcrypt.hash(password, salt);
  await user.save();

  res.status(200).json({ message: "Password reset successfully" });
};

module.exports = resetPassword;
