var express = require('express');
var router = express.Router();
var _ = require("underscore");

/* GET users listing. */
router.post('/', function(req, res, next) {
  req.checkBody('username', req.i18n.__('Username is required')).notEmpty().isAlpha();
  req.checkBody('password', req.i18n.__('Password is required')).notEmpty();
  req.checkBody('role', req.i18n.__('Role is required')).notEmpty();
  req.checkBody('projectType', req.i18n.__('Project Type is required')).notEmpty();
  req.checkBody('languages', req.i18n.__('At least one language should be chosen')).notEmpty();
  req.checkBody('email', req.i18n.__('Email is required')).notEmpty();
  req.checkBody('email', req.i18n.__('Email does not appear to be valid')).isEmail();
  req.checkBody("termsAndConditions", req.i18n.__("Should accept terms and conditions")).notEmpty().isOn();
// check the validation object for errors
  var errors = req.validationErrors();

  console.log(errors);

  if (errors) {
    res.status(400);
    res.render("submit_error", {messages:errors})
  }
  else {
    res.render("submit", {title: "Data submitted", body:req.body});
  }
});

module.exports = router;
