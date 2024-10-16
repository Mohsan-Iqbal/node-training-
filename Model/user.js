const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: String,
  username: String,
  email: String,
  password: String,
  role: { type: String, enum: ["user", "admin"], default: "user" },
});
const user = mongoose.model("user", userSchema);
module.exports = user;
