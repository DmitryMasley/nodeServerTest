define(["jquery", "underscore", "marionette", "tpl!../templates/totalPrice"], function($, _, Marionette, template){
    "use strict";
    var TotalPriceView = Marionette.ItemView.extend({
        initialize: function(config){
            this.collection=config.collection;

        },
        tagName: "p",
        template: template,
        templateHelpers: {
            getValue: function(){
                var value=_.pluck(this.items,"price").reduce(function(sum, current) {
                    return sum + current;
                }, 0);
                return value;
            }
        }
    });
    return TotalPriceView;
});