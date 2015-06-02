define([], function(){
    "use strict";
    var ajax = function (method, url, responseSuccess, responseError, responseComplete) {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == XMLHttpRequest.DONE) {
                if (xmlhttp.status == 200) {
                    responseSuccess(xmlhttp.responseText);
                }
                else if (xmlhttp.status == 400) {
                    responseError(xmlhttp.status);
                }
                else {
                    responseComplete(xmlhttp.status, xmlhttp.responseText)
                }
            }
        };
        xmlhttp.open(method, url, true);
        xmlhttp.send();
    };
    return ajax;
});