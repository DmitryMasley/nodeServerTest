define(["jquery", "underscore", "marionette", "tpl!../../templates/pages/engChild"], function($, _, Marionette, template){
    "use strict";
    var EngChild = Marionette.ItemView.extend({
        template: template
    });
    return EngChild;
});