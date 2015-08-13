define(["marionette", "underscore", "./views/mainLayout", "./entities/imageCollection"], function(Marionette, _, LayoutView, ImageCollection){
    "use strict";
    var PhotoGalleryMain = Marionette.Controller.extend({
        initialize: function(config){
            this.collection=new ImageCollection();
            this.collection.fetch({url: '/images.ajax'});
            this.view = new LayoutView({el: config.el ? config.el : "body" , collection:this.collection});
            this.view.render();
            this.listenTo(this.view.collectionView, "childview:model:show",
                function(childView, model){
                    this.view.showModal(model);
                    this.listenTo(this.view.modalView, "show:next",
                        function(model){
                            this.view.showModal(this.collection.at(this.collection.indexOf(this.collection.get(model.id))+1));
                        }.bind(this)
                    );
                    this.listenTo(this.view.modalView, "show:prev",
                        function(model){
                            this.view.showModal(this.collection.at(this.collection.indexOf(this.collection.get(model.id))-1));
                        }.bind(this)
                    );
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