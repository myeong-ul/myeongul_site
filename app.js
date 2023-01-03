//import modules
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//import routes
var indexRouter = require('./routes/index');
var novelRouter = require('./routes/novel');

var main = express();

// view engine setup
main.set('views', path.join(__dirname, 'views'));
main.set('view engine', 'pug');

//express-session setup
main.use(logger('dev'));
main.use(express.json());
main.use(express.urlencoded({ extended: false }));
main.use(cookieParser());
main.use(express.static(path.join(__dirname, 'public')));

//routes setup
main.use('/', indexRouter);
main.use('/novel', novelRouter);

// catch 404 and forward to error handler
main.use(function(req, res, next) {
  next(createError(404));
});

// error handler
main.use(function(err, req, res) {
  // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    console.log("err");
  // render the error page
    res.status(err.status || 500);
  //if status is 404, render 404 page
    res.render('error');
});

module.exports = main;
