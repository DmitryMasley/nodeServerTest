define(["jquery", "underscore", "marionette", "tpl!../../templates/pages/psychologist"], function($, _, Marionette, template){
    "use strict";
    var Psychologist = Marionette.ItemView.extend({
        template: template
    });
    return Psychologist;
});