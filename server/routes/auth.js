const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')


router.get('/login', (req, res)=>{
    res.send('Login page')
})

router.get('/register', (req,res)=>{
    res.send("Signup page")
})

router.get('/logout', (req,res)=>{
    res.send("logout functionality")
})

module.exports = router;