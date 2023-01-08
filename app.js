//import modules
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('./log');
var indexRouter = require('./routes/index');
var novelRouter = require('./routes/novel');

//set app
var main = express();

// view engine setup
main.set('views', path.join(__dirname, 'views'));
main.set('view engine', 'pug');

//express-session setup
main.use(logger);

// main.use(logger('dev'));
main.use(express.json());
main.use(express.urlencoded({ extended: false }));
main.use(cookieParser());
main.use(express.static(path.join(__dirname, 'public')));

/* GET render page. */
main.get('/404', function(req, res, next) {
    var error = new Error('Not Found');
    error.status = 404;
    return res.render('404',{title: '404: File Not Found', error: error});
});

//set router
main.use('/',indexRouter);
main.use('/novel', novelRouter);
// main.get('/*', function(req, res, next) {
//     return res.status(404).redirect('/404');
// });

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
