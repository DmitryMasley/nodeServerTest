define(["jquery", "underscore", "marionette", "tpl!../templates/mainLayout", "./collection", "./totalPrice", "./form"], function($, _, Marionette, template, CollectionView, TotalPriceView, FormView){
    "use strict";
    var LayoutView = Marionette.LayoutView.extend({
        initialize: function(config){
            this.collection=config.collection;
        },
        template: template,
        regions: {
            items: "#items",
            totalPrice: "#total",
            form: "#form"
        },
        onRender: function(){
                this.items.show(new CollectionView({collection:this.collection}));
                this.totalPrice.show(new TotalPriceView({collection:this.collection}));
                this.form.show(new FormView());
               }
        });
        return LayoutView;
});