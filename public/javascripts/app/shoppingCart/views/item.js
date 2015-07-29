define(["jquery", "underscore", "marionette", "tpl!../templates/item"], function($, _, Marionette, template){
    "use strict";
    var ItemView = Marionette.ItemView.extend({
        template: template,
        className: "col-lg-4 col-sm-6"
    });
    return ItemView;
});