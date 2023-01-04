//import modules
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var accessLogStream = require('./log');
var indexRouter = require('./routes/index');
var novelRouter = require('./routes/novel');

//set app
var main = express();

// view engine setup
main.set('views', path.join(__dirname, 'views'));
main.set('view engine', 'pug');

//express-session setup
main.use(logger('[:remote-addr] [:date[web]] :method :url :status :response-time ms', {stream: accessLogStream}));
// main.use(logger('dev'));
main.use(express.json());
main.use(express.urlencoded({ extended: false }));
main.use(cookieParser());
main.use(express.static(path.join(__dirname, 'public')));

/* GET render page. */
main.get('/', function(req, res, next) {
    return res.render('index');
});
main.get('/about', function(req, res, next) {
    return res.render('about', { title: '명울에 대하여' });
});
main.get('/img/:img', async (req, res, next) => {
    return res.sendFile(path.join(__dirname,'public', 'images', req.params.img));
});
main.get('/css/:css', async (req, res, next) => {
    return res.sendFile(path.join(__dirname, 'public', 'stylesheets', req.params.css));
});
main.get('/404', function(req, res, next) {
    var error = new Error('Not Found');
    error.status = 404;
    return res.render('404',{title: '404: File Not Found', error: error});
});

//set router
main.use('/',indexRouter);
main.use('/novel', novelRouter);
main.get('/*', function(req, res, next) {
    return res.redirect('/404');
});

// catch 404 and forward to error handler
main.use(function(req, res, next) {
  next(createError(404));
});

// error handler
main.use((err, req, res, next) =>{
  // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
    if(err.status === 404){
        return res.redirect('/404');
    }
    else {
        res.status(err.status || 500);
        return res.render('error', {title: err.status + " : " + err.message, error: err, message: err.message});
    }
});

module.exports = main;
