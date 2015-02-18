var express = require('express');
var router = express.Router();
var _ = require("underscore");


/* GET home page. */
router.get('/', function(req, res, next) {
  var body = {};
  body.languages = [req.i18n.locale];
  res.render("index", {title:req.i18n.__("Form"), body:body});
});
router.post('/', function(req, res, next) {
  req.checkBody('username', req.i18n.__('Username is required')).notEmpty();
  req.checkBody('password', req.i18n.__('Password is required')).notEmpty();
  req.checkBody('role', req.i18n.__('Role is required')).notEmpty();
  req.checkBody('projectType', req.i18n.__('Project Type is required')).notEmpty();
  req.checkBody('languages', req.i18n.__('At least one language should be chosen')).notEmpty();
  req.checkBody('email', req.i18n.__('Email is required')).notEmpty();
  req.checkBody('email', req.i18n.__('Email does not appear to be valid')).isEmail();
  req.checkBody("termsAndConditions", req.i18n.__("Should accept terms and conditions")).isOn();
// check the validation object for errors
  var errors = req.validationErrors();

  console.log(errors);

  if (errors) {
    var errorMap={};
    _.each(errors, function(error){
        errorMap[error.param] = error.msg;
    });
    res.status(400);
    res.render("index", {title:req.i18n.__("Form"), errors:errorMap, body:req.body})
  }
  else {
    res.render("submit", {title: req.i18n.__("Data submitted"), body:req.body});
  }
});
module.exports = router;
