require("dotenv").config();
const express = require("express");
const authRoutes = require("./routes/auth");
const homeRoutes = require("./routes/home");
const registerRoute = require("./routes/register");
const { connectToServer } = require("./db/conn");
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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", homeRoutes);
app.use("/auth", authRoutes);
app.use("/register", registerRoute);

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

module.exports = app;
