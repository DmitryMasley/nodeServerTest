define(["jquery", "underscore"], function($, _){
    "use strict";
    var Helpers = {
        validateEmail: function(email){
            return false;
        },
        // format dd.mm.yyyy
        isDateString: function(date){
            return false;
        },
        // with protocol
        isUrl: function(url){
            return false;
        }
    };
    return Helpers;
});