define(["helpers", "jquery"], function(helpers, $){
    "use strict";
    var ajax = function (args) {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == XMLHttpRequest.DONE) {
                if (xmlhttp.status == 200) {
                    args.responseSuccess(xmlhttp.responseText);
                }
                else {
                    args.responseError(xmlhttp.status);
                }
                args.responseComplete(xmlhttp.status, xmlhttp.responseText);
            }
        };
        xmlhttp.open(args.method, args.url, true);
        xmlhttp.send();
    };
    return ajax;
});
