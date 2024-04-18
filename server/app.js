var express = require("express");
const authRoutes = require("./routes/auth");
const homeRoutes = require("./routes/home");
const app = express();
const bcrypt = require("bcrypt");

const PORT = process.env.PORT || 8000;

const { MongoClient } = require("mongodb");
require("dotenv").config();

app.use("/", homeRoutes);
app.use("/auth", authRoutes);

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });


module.exports = app