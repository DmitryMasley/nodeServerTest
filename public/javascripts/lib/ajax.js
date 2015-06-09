define(["helpers", "jquery"], function(Helpers, $){
    "use strict";
    var ajax = function (args) {
        var xmlhttp = new XMLHttpRequest(); // Create new request.
        var timedout = false; // Whether we timed out or not.
        // Start a timer that will abort the request after timeout ms.
        var timeout = (args && args.timeout) ? args.timeout : 30000;
        var timer = setTimeout(function() { // Start a timer. If triggered,
            timedout = true; // set a flag and then
            request.abort(); // abort the request.
        },timeout);
        xmlhttp.onreadystatechange = function () { // Define event listener.
            if (xmlhttp.readyState == XMLHttpRequest.DONE) { // Ignore incomplete requests.
                if (timedout) {
                    args.responseError("timedout");
                    return; // Ignore aborted requests.
                }
                if (xmlhttp.status == 200) { // If request was successful
                    clearTimeout(timer); // Cancel pending timeout.
                    args.responseSuccess(JSON.parse(xmlhttp.responseText)); // pass response to callback.
                }
                else {
                    args.responseError(xmlhttp.status);
                }
                args.responseComplete(xmlhttp.status, xmlhttp.responseText);
            }
        };
        xmlhttp.open(args.method, args.url, true); // Specify URL to fetch
        xmlhttp.send(null); // Send the request now
    };
    return ajax;
});