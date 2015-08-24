define(["jquery", "underscore", "marionette", "tpl!../../templates/pages/fastReading"], function($, _, Marionette, template){
    "use strict";
    var FastReading = Marionette.ItemView.extend({
        template: template
    });
    return FastReading;
});