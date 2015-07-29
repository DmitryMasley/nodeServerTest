define(["jquery", "underscore", "marionette", "tpl!../templates/totalPrice"], function($, _, Marionette, template){
    "use strict";
    var TotalPriceView = Marionette.ItemView.extend({
        initialize: function(config){
            this.collection=config.collection;
        },
        collectionEvents: {
            "add" : function(){this.render()},
            "remove": function(){this.render()},
            "change": function(){this.render()},
            "reset": function(){this.render()}
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