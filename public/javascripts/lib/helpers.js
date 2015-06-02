define(["jquery", "underscore"], function($, _){
    "use strict";
    var Helpers = {
        validateEmail: function(email){
            var emailPattern = /^[a-zA-Z0-9]+(\.[a-zA-Z0-9_-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,4}$/;
            return emailPattern.test(email);
        },
        // format dd.mm.yyyy
        isDateString: function(date){
            var datePattern = /^(0[1-9]|[12][0-9]|3[01])([- /.])(0[1-9]|1[012])\2(19|20)\d\d$/;
            return datePattern.test(date);
        },
        // with protocol
        isUrl: function(url){

        }
    };
    return Helpers;
});