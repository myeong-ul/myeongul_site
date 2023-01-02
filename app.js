var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var main = express();

// view engine setup
main.set('views', path.join(__dirname, 'views'));
main.set('view engine', 'pug');

main.use(logger('dev'));
main.use(express.json());
main.use(express.urlencoded({ extended: false }));
main.use(cookieParser());
main.use(express.static(path.join(__dirname, 'public')));

main.get('/', async (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
    // res.render('index');
});
main.get('/about', async (req, res) => {
    res.sendFile(path.join(__dirname, 'about.html'));
});
main.get('/img/:img', async (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'images', req.params.img));
});
main.get('/css/:css', async (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'stylesheets', req.params.css));
});
main.get('/js/:js', async (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'javascripts', req.params.js));
});
main.get('/json/:json', async (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'json', req.params.json));
});
main.get('/short_novel_names', async (req, res) => {
    res.sendFile(path.join(__dirname, 'short_novel_names.html'));
});

// catch 404 and forward to error handler
main.use(function(req, res, next) {
  next(createError(404));
});

// error handler
main.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  //if status is 404, render 404 page
    res.render('error');
});

module.exports = main;
