var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var validator = require('express-validator');
var i18n = require("i18n-2");

var routes = require('./routes/index');
var submit = require('./routes/submit');
var mvc = require('./routes/mvc');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
i18n.expressBind(app, {
    // setup some locales - other locales default to vi silently
    locales: ['en', 'ru', 'de', 'fr', 'uk'],
    // set the default locale
    defaultLocale: 'en',
    // set the cookie name
    cookieName: 'locale'
});

// set up the middleware
app.use(function(req, res, next) {
    // read from cookies
    req.i18n.setLocaleFromCookie();
    // if there is param in the query - use it and overwrite the cookies
    if(req.param("lang")) {
        req.i18n.setLocaleFromQuery();
    }
    res.cookie('locale', req.i18n.locale);
    next();
});
app.use(express.static(path.join(__dirname, 'public')));
app.use(validator({customValidators:
{
    isOn:function(value){return value==="on"}
}}));
app.use('/', routes);
app.use('/submit', submit);
app.use('/mvc', mvc);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
