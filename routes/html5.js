var express = require('express');
var router = express.Router();
var _ = require("underscore");


/* GET home page. */
router.get('/', function(req, res, next) {
    var body = {};
    body.languages = [req.i18n.locale];
    res.render("html5", {title:req.i18n.__("Hello"), body:body});
});
module.exports = router;
