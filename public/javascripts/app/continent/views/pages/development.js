define(["jquery", "underscore", "marionette", "tpl!../../templates/pages/development"], function($, _, Marionette, template){
    "use strict";
    var Development = Marionette.ItemView.extend({
        template: template
    });
    return Development;
});