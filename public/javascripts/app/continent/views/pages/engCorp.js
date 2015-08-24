define(["jquery", "underscore", "marionette", "tpl!../../templates/pages/engCorp"], function($, _, Marionette, template){
    "use strict";
    var EngCorp = Marionette.ItemView.extend({
        template: template
    });
    return EngCorp;
});