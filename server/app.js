// import modules
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");

require("dotenv").config();

const uri = process.env.URI;
// console.log(`Hello ${process.env.URI}`);
// app
const app = express();

// db
async function connect() {
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error);
  }
}

connect();

// midldlware
app.use(morgan("dev"));
app.use(cors({ prigin: true, credentials: true }));

// routes

// port
const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`giterver has started on port ${8000}`);
});
