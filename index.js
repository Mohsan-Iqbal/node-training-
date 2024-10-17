require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const dbConnection = require("./database/db");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const adminRoute = require("./routes/admin");
const authenticate = require("./middleware/authentication");

const app = express();
const PORT = process.env.PORT || 8000;

dbConnection();

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});

app.use("/auth", authRoute);
app.use("/user", authenticate, userRoute);
app.use("/admin", authenticate, adminRoute);

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
