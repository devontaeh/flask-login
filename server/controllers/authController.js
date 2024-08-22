const { getDb } = require("../db/conn");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const path = require("path");

const handleUserLogin = async (req, res) => {
  const { username, password } = req.body;

  //user didnt enter all required fields
  if (!username || !password) {
    return res.status(400).json({ message: "username and password requird" });
  }

  //authenticate username and validate password
  try {
    //get the database and collection
    const db = getDb();
    const users = db.collection("users");

    //find document that matches username and hashpwed
    const result = await users.findOne({ username });

    if (result && (await bcrypt.compare(password, result.password))) {
      console.log(result);

      const accessToken = jwt.sign(
        { username },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "30s",
        }
      );
      const refreshToken = jwt.sign(
        { username },
        process.env.REFRESH_TOKEN_SECRET,
        {
          expiresIn: "1d",
        }
      );

      res.status(401).json({
        success: true,
        message: `User ${username} authenticated succesfully!`,
        accessToken,
        refreshToken,
      });
    } else {
      res
        .status(409)
        .json({ success: false, message: "Invalid username and/or password" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { handleUserLogin };
