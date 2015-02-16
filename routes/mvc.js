var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render("mvc", {title:req.i18n.__("MVC")});
});

module.exports = router;
