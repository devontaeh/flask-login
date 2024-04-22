const { getDb } = require("../db/conn");
const bcrypt = require("bcrypt");

const handleUserLogin = async (req, res) => {
  const { username, password } = req.body;

  //user didnt enter all required fields
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "username and password and requird" });
  }

  //authenticate username and validate password
  try {
    //get the database and collection
    const db = getDb();
    const users = db.collection("users");

    //find document that matches username and hashpwed
    const result = await users.findOne({username});
   
    if (result && bcrypt.compare(password, result.password)) {
      console.log(result);

      res.status(401).json({ success: true, message: `User ${username} read!` });
    } else {
      res.status(409).json({success: false,  message: "Invalid username and/or password" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { handleUserLogin };
