require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.createSecretToken = (user) => {
  return jwt.sign(
    {
      id: user?._id,
      username: user?.username,
      email: user?.email,
      role: user?.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: 3 * 24 * 60 * 60,
    }
  );
};
