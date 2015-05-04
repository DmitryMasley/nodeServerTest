var express = require('express');
var router = express.Router();
var _ = require("underscore");


/* GET home page. */
router.get('/', function(req, res, next) {
    var collection = req.db.get('usercollection');
    collection.find({},{},function(e,images){
       res.json({
           code: "success",
           data: images
       })
    });
});
/* GET home page. */
router.post('/', function(req, res, next) {
    var collection = req.db.get('usercollection');
    collection.find({},{},function(e,images){
        res.json({
            code: "success",
            data: images
        })
    });
});
module.exports = router;
