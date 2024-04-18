const User = require("../model/User");
const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
    const { firstname, lastname, username, email, password } = req.body;
    if (!user || !pwd)
        return res
            .status(400)
            .json({ message: "Username and password are required" });

    // check for duplicate username/email in the db
    const duplicate = await User.findOne({
        $or: [{ username }, { email }],
    }).exec();

    if (duplicate) {
        return res.sendStatus(409).json({ message: "Username or email already exists." });
    }

    try {
        // pwd encryption
        const hashedPwd = await bcrypt.hash(password, 10);

        // create and store new user
        const result = await User.create({
            firstname,
            lastname,
            username,
            email,
            password: hashedPwd,
        });

        console.log(result);
        res.status(201).json({ success: `New user ${username} created!` });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { handleNewUser };
