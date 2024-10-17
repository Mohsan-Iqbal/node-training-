const User = require("../Model/user");
const bcrypt = require("bcrypt");
const env = require("dotenv");
const { createSecretToken } = require("../jwt/generateToken");

env.config();

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!(email && password)) {
    return res.status(400).json({ message: "Email and password is required" });
  }

  const user = await User.findOne({ email });
  if (!(user && (await bcrypt.compare(password, user.password)))) {
    return res.status(404).json({ message: "Invalid credentials" });
  }

  const token = createSecretToken(user);

  res.status(200).json({
    message: "User verified successfully",
    user: {
      id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
      role: user.role,
    },
    jwt: token,
  });
};

module.exports = login;
