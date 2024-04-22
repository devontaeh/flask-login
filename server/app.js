require("dotenv").config();
const express = require("express");
const homeRoutes = require("./routes/home");
const registerRoute = require("./routes/register");
const loginRoute = require("./routes/login");
const { connectToServer } = require("./db/conn");
const cors = require('cors')
const app = express();

// connect to MongoDB
const connectDb = async () => {
  try {
    await connectToServer();
    console.log("connected");
  } catch (err) {
    console.log("error:", err);
  }
};

connectDb();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", homeRoutes);

app.use("/register", registerRoute);
app.use("/login", loginRoute);

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

module.exports = app;
