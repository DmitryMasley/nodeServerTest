define(["marionette", "underscore", "./views/mainLayout", "./entities/imageCollection"], function(Marionette, _, LayoutView, ImageCollection){
    "use strict";
    var PhotoGalleryMain = Marionette.Controller.extend({
        initialize: function(config){
            if (!config.collection) {
                this.collection = new ImageCollection();
                this.collection.fetch({url: '/images.ajax'});
            }else{
                this.collection = new ImageCollection(config.collection);
            }
            this.layout = new LayoutView({el: config.el ? config.el : "body" , collection:this.collection});
            this.layout.render();
            this.listenTo(this.layout.collectionView, "childview:model:show", this.showModalForImage);
            this.listenTo(this.collection, "sync", function(){
                if (this.collection.get(this.item)){
                    this.showModalForImage(null,this.collection.get(this.item));
                }
            });
        },
        showModalForImage: function(childView, model){
            this.layout.showModal(model);
            var modal = this.layout.modalView;
            if (modal) {
                this.listenToModalEvents(modal);
            }
        },
        listenToModalEvents: function(view){
            this.modal = view;
            this.listenTo(view, "next", this.nextImage);
            this.listenTo(view, "prev", this.prevImage);
            this.listenTo(view, "destroy", this.stopListeningModal);
        },
        stopListeningModal: function(){
            this.stopListening(this.modal);
        },
        getNextModel: function(model){
            var index = this.collection.indexOf(this.collection.get(model.id));
            if(index!==-1 && this.collection.at(index+1)){
                return this.collection.at(index+1);
            } else {
                return null;
            }
        },
        getPrevModel: function(model){
            var index = this.collection.indexOf(this.collection.get(model.id));
            if(index!==-1 && this.collection.at(index-1)){
                return this.collection.at(index-1);
            } else {
                return null;
            }
        },
        nextImage: function(model){
            if(this.modal){
                var model = this.getNextModel(model);
                if (model) {
                    this.layout.showModal(model);
                }
            }
        },
        prevImage: function(model){
            if(this.modal){
                var model = this.getPrevModel(model);
                if(model) {
                    this.layout.showModal(model);
                }
            }
        }
    });
    return PhotoGalleryMain;
});