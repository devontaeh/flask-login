const express = require("express");
const { handleUserLogin } = require("../controllers/authController");
const router = express.Router();

/* GET home page. */
router.post("/", handleUserLogin);

module.exports = router;
