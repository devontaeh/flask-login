var express = require('express');
const bcrypt = require('bcrypt')
const saltRounds = 10

const { MongoClient } = require("mongodb");
require("dotenv").config();


const connectionString = process.env.MONGO_URI;

// console.log(connectionString);


bcrypt.genSalt(saltRounds, function(err, salt){
  bcrypt.hash('myPlaintextPassowrd', salt, function(err, hash){
    console.log(hash)
  })
})




const port = process.env.PORT || 3000

var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/login');
var usersRouter = require('./routes/signup');

var app = express();

// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
