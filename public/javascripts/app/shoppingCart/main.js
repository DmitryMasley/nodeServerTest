define(["marionette", "underscore", "./views/mainLayout"], function(Marionette, _, LayoutView){
    "use strict";
    var ShoppingCartMain = Marionette.Controller.extend({
        initialize: function(config){
            this.collection = new Backbone.Collection([
                {id:1, title:"Crocs Classic 1", price:10, img:"/images/crocs.jpg"},
                {id:2, title:"Crocs Classic 2", price:21, img:"/images/crocs.jpg"},
                {id:3, title:"Crocs Classic 3", price:12, img:"/images/crocs.jpg"},
                {id:4, title:"Crocs Classic 4", price:33.3, img:"/images/crocs.jpg"}
            ]);
            this.view = new LayoutView({el: config.el ? config.el : "body" , collection:this.collection});
            this.view.render();
        }
    });
return ShoppingCartMain;
});