define(["jquery", "underscore", "marionette", "tpl!../templates/item"], function($, _, Marionette, template){
    "use strict";
    var ItemView = Marionette.ItemView.extend({
        template: template,
        className: "col-lg-3 col-md-4 col-sm-4 col-xs-6"
    });
    return ItemView;
});