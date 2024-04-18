var express = require('express');
const authRoutes = require('./routes/auth')
const homeRoutes = require('./routes/home')
const app = express()
const bcrypt = require('bcrypt')

const PORT = process.env.PORT || 3000

const { MongoClient } = require("mongodb");
require("dotenv").config();


app.use('/'. homeRoutes)
app.use('/auth', authRoutes)


app.lisen(PORT, ()=>{
  console.log(`Server is running or port ${PORT}`)
})

