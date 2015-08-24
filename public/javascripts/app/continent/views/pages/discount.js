define(["jquery", "underscore", "marionette", "tpl!../../templates/pages/discount"], function($, _, Marionette, template){
    "use strict";
    var Discount = Marionette.ItemView.extend({
        template: template
    });
    return Discount;
});