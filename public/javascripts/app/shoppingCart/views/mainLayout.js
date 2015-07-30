define(["jquery", "underscore", "marionette", "tpl!../templates/mainLayout", "./collection", "./totalPrice", "./form", "./modal"], function($, _, Marionette, template, CollectionView, TotalPriceView, FormView, ModalView){
    "use strict";
    var LayoutView = Marionette.LayoutView.extend({
        initialize: function(config){
            this.collection=config.collection;
            this.el=config.el;
        },
        template: template,
        regions: {
            items: "#items",
            totalPrice: "#total",
            form: "#form",
            modalView: "#modal"
        },
        onRender: function(){
                this.items.show(new CollectionView({collection:this.collection}));
                this.totalPrice.show(new TotalPriceView({collection:this.collection}));
                this.form.show(new FormView({collection:this.collection}));
                this.modalView.show(new ModalView({collection:this.collection}));
               }
        });
        return LayoutView;
});