/* global requirejs, describe, beforeEach, afterEach, it, assert */
define(["helpers"], function(Helpers){
    "use strict";
    describe("Email validation", function(){
        it("Should reject email without @", function(){
            assert.isFalse(Helpers.validateEmail("example.com"), "Should reject email without @");
        });
        it("Should reject email without domain", function(){
            assert.isFalse(Helpers.validateEmail("example@"), "Should reject email without domain")
            assert.isFalse(Helpers.validateEmail("example@gmail"), "Should reject email with invalid domain")
        });
        it("Should validate dots", function(){
            assert.isFalse(Helpers.validateEmail(".example@gmail.com"), "Email should not begin form '.'");
            assert.isFalse(Helpers.validateEmail("exam..ple@gmail.com"), "Dots shouldn't appear consecutively");
            assert.isFalse(Helpers.validateEmail("example@gmail..com"), "Dots shouldn't appear consecutively");
            assert.isTrue(Helpers.validateEmail("e.xam.ple@gmail.com"), "Single dot is allowed");
        });
        it("Should Allow numbers", function(){
            assert.isTrue(Helpers.validateEmail("1ex2am3ple@gm4ail.com"), "Allow numbers");
            assert.isTrue(Helpers.validateEmail("1ex2am3ple@gm.4ail.com"), "Allow numbers");
        });
        it("Should validate @ symbol", function(){
            assert.isFalse(Helpers.validateEmail("ex@mple@gmail.com"), "Only one @ allowed");
            assert.isFalse(Helpers.validateEmail("@exmplegmail.com"), "Should not start from @");
        });
        it("Not allow unicode characters", function(){
            assert.isFalse(Helpers.validateEmail("üñîçøðé@gmail.com"), "Should not allow unicode characters");
            assert.isFalse(Helpers.validateEmail("example@ыыы.com"), "Should not allow unicode characters");
        });
        it("Not allow special characters and punctuation", function(){
            assert.isFalse(Helpers.validateEmail("examp'e@gmail.com"), "Should not allow punctuation");
            assert.isFalse(Helpers.validateEmail("examp,e@gmail.com"), "Should not allow punctuation");
            assert.isFalse(Helpers.validateEmail("examp\"e@gmail.com"), "Should not allow special characters");
            assert.isFalse(Helpers.validateEmail("examp$e@gmail.com"), "Should not allow special characters");
            assert.isFalse(Helpers.validateEmail("examp<e@gmail.com"), "Should not allow special characters");
            assert.isFalse(Helpers.validateEmail("examp\\e@gmail.com"), "Should not allow special characters");
            assert.isFalse(Helpers.validateEmail("examp\/e@gmail.com"), "Should not allow special characters");
            assert.isFalse(Helpers.validateEmail("examp\/e@gmail.com"), "Should not allow special characters");
        });
    });
    describe("Date validation", function(){
        it("Should accept valid date", function(){
            assert.isTrue(Helpers.isDateString("21.11.1987"), "Valid date do not pass validation");
        });
        it("Should validate max values", function(){
            assert.isFalse(Helpers.isDateString("21.13.1987"), "Should validate month number");
            assert.isFalse(Helpers.isDateString("35.12.1987"), "Should validate days number");
        })
        it("Should validate in fixed format", function(){
            assert.isFalse(Helpers.isDateString("21/13/1987"));
        })
    });
});