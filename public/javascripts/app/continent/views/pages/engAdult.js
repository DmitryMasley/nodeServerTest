define(["jquery", "underscore", "marionette", "tpl!../../templates/pages/engAdult"], function($, _, Marionette, template){
    "use strict";
    var EngAdult = Marionette.ItemView.extend({
        template: template
    });
    return EngAdult;
});