var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var validator = require('express-validator');
var i18n = require("i18n-2");
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/test');

var routes = require('./routes/index');
var submit = require('./routes/submit');
var mvc = require('./routes/mvc');
var images = require('./routes/images');
var slideshow = require('./routes/slideshow');
var dragtest = require('./routes/dragtest');
var routertest = require('./routes/routertest');
var shopping_cart = require('./routes/shopping_cart');
var continent = require('./routes/continent');
var html5 = require('./routes/html5');
var nwcurrency = require('./routes/nwcurrency');

var app = express();
var collection = db.get("usercollection");
collection.remove();
collection.count({}, function(e, count){
    if(count === 0) {
        var images = require("./images.json");
        collection.insert(images);
    }

});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// Make our db accessible to our router
app.use(function(req,res,next){
    req.db = db;
    next();
});
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
app.use('/images.ajax', images);
app.use('/slideshow', slideshow);
app.use('/dragtest', dragtest);
app.use('/routertest', routertest);
app.use('/shopping_cart', shopping_cart);
app.use('/continent', continent);
app.use('/html5', html5);
app.use('/nwcurrency', nwcurrency);

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
