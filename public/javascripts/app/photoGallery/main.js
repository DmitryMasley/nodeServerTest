define(["marionette", "underscore", "./views/mainLayout", "./entities/imageCollection"], function(Marionette, _, LayoutView, ImageCollection){
    "use strict";
    var PhotoGalleryMain = Marionette.Controller.extend({
        initialize: function(config){
            this.collection=new ImageCollection();
            this.collection.fetch({url: '/images.ajax'});
            this.view = new LayoutView({el: config.el ? config.el : "body" , collection:this.collection});
            this.view.render();
            this.view.collectionView.on("childview:model:show",
                function(childView, model){
                    console.log("Received itemview:contact:show event on model ", model);
                    this.view.showModal({model:model});
                }.bind(this)
            );
            console.log(this.view.modalView);
            this.view.modalView.on("show",
                function(childView, model){
                    console.log("Received show:next event on modal ", model);
                    this.view.showModal({model:model});
                }.bind(this)
            );
            this.view.modalView.on("prev",
                function(childView, model){
                    console.log("Received show:prev event on modal ", model);
                    this.view.showModal({model:model});
                }.bind(this)
            );
        }
    });
    return PhotoGalleryMain;
});

//var model = this.collection.get(id);
//if(model){this.showModal(model)}
//modal.on("hide.bs.modal", function(){
//    Backbone.history.navigate(fragm);
//});
//Backbone.history.navigate(""+fragm+"/"+index);
//fragm=Backbone.history.getFragment();