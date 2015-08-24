define(["jquery", "underscore", "marionette", "tpl!../../templates/pages/about"], function($, _, Marionette, template){
    "use strict";
    var About = Marionette.ItemView.extend({
        template: template
    });
    return About;
});