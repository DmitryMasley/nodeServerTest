define(["jquery", "underscore", "marionette", "tpl!../../templates/pages/prepSchool"], function($, _, Marionette, template){
    "use strict";
    var PrepSchool = Marionette.ItemView.extend({
        template: template
    });
    return PrepSchool;
});