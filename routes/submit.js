var express = require('express');
var router = express.Router();
var _ = require("underscore");

/* GET users listing. */
router.post('/', function(req, res, next) {
  _.keys(req.body);
  req.checkBody('username', 'Username is required').notEmpty().isAlpha();
  req.checkBody('password', 'Password is required').notEmpty();
  req.checkBody('role', 'Role is required').notEmpty();
  req.checkBody('projectType', 'Project Type is required').notEmpty();
  req.checkBody('languages', 'At least one language should be chosen').notEmpty();
  req.checkBody('email', 'Email is required').notEmpty();
  req.checkBody('email', 'Email does not appear to be valid').isEmail();
  req.checkBody("termsAndConditions", "Should accept terms and conditions").notEmpty().isOn();
// check the validation object for errors
  var errors = req.validationErrors();

  console.log(errors);

  if (errors) {
    res.render("submit_error", {messages:errors})
  }
  else {
    res.render("submit", {title: "Data submitted", body:req.body});
  }
});

module.exports = router;
