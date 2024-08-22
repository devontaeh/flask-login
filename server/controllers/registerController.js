const { getDb } = require("../db/conn");
const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
  const { firstName, lastName, username, email, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  console.log("request data: ", {
    first_name: firstName,
    last_name: lastName,
    username,
    email,
    password,
  });

  try {
    const db = getDb();
    const users = db.collection("users");

    // check for duplicate username/email in the db
    const duplicate = await users.findOne({ $or: [{ username }, { email }] });
    console.log(duplicate);

    if (duplicate) {
      return res
        .status(409)
        .json({ success: false, message: "Username or email already exists." });
    }

    // pwd encryption
    const hashedPwd = await bcrypt.hash(password, 10);

    // create and store new user
    const result = await users.insertOne({
      first_name: firstName,
      last_name: lastName,
      username,
      email,
      password: hashedPwd,
    });

    console.log(result);
    res
      .status(201)
      .json({ success: true, message: `New user ${username} created!` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { handleNewUser };
