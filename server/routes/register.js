const express = require('expres')
const router = express.Router()

router.get('/register', (req, res)=>{
    res.send('Registration page')
})