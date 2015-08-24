define(["jquery", "underscore", "marionette", "tpl!../../templates/pages/miniSad"], function($, _, Marionette, template){
    "use strict";
    var MiniSad = Marionette.ItemView.extend({
        template: template
    });
    return MiniSad;
});