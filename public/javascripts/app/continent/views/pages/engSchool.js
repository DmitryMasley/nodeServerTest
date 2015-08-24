define(["jquery", "underscore", "marionette", "tpl!../../templates/pages/engSchool"], function($, _, Marionette, template){
    "use strict";
    var EngSchool = Marionette.ItemView.extend({
        template: template
    });
    return EngSchool;
});