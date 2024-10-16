const User = require("../Model/user");
const bcrypt = require("bcrypt");

const createUser = async (req, res) => {
  try {
    if (!(req.body.email && req.body.password && req.body.username)) {
      return res
        .status(400)
        .send({ message: "username , email, password  is required" });
    }

    const existingUser = await User.findOne({ email: req.body.email });

    if (existingUser) {
      return res
        .status(409)
        .send({ message: "User Already Exist. Please Login" });
    }

    const salt = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const payload = {
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    };
    if (req.body.role) {
      payload.role = req.body.role;
    }
    const newUser = new User(payload);

    const user = await newUser.save();

    res.status(201).json({
      message: "User created successfully",
      user: {
        id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.log("Got an error", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = createUser;
