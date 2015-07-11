define(["helpers", "jquery"], function(Helpers, $){
    "use strict";
    var ajax = function (args) {
        if (!args || !args.method || !args.url || !args.responseSuccess || !args.responseError) return;
        var timeout = (args && args.timeout) ? args.timeout : 30000;
        $.ajax({type:args.method,
            url:args.url,
            success:args.responseSuccess,
            error:args.responseError,
            timeout:timeout});

        /*
        var timedout = false; // Whether we timed out or not.
        // Start a timer that will abort the request after timeout ms.
        var timer = setTimeout(function() { // Start a timer. If triggered,
            timedout = true; // set a flag and then
            xmlhttp.abort(); // abort the request.
        },timeout);
        var xmlhttp = new XMLHttpRequest(); // Create new request.
        xmlhttp.onreadystatechange = function () { // Define event listener.
            if (xmlhttp.readyState == XMLHttpRequest.DONE) { // Ignore incomplete requests.
                if (timedout) {
                    args.responseError("timedout");
                    return; // Ignore aborted requests.
                }
                if (xmlhttp.status == 200) { // If request was successful
                    clearTimeout(timer); // Cancel pending timeout.
                    args.responseSuccess(xmlhttp.responseText); // pass response to callback.
                }else {
                    args.responseError(xmlhttp.status);
                }
                (args.responseComplete) ? args.responseComplete(xmlhttp.status, xmlhttp.responseText) : 0;
            }
        };
        xmlhttp.open(args.method, args.url, true); // Specify URL to fetch
        xmlhttp.send(null); // Send the request now
        */
    };
    return ajax;
});