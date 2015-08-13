define(["jquery", "underscore", "marionette", "tpl!../templates/mainLayout", "./collection", "./modal"], function($, _, Marionette, template, CollectionView, ModalView){
    "use strict";
    var LayoutView = Marionette.LayoutView.extend({
        initialize: function(config){
            this.collection=config.collection;
            this.el=config.el;
        },
        template: template,
        regions: {
            mainRegion: "#main",
            modalRegion: "#modal"
        },
        onRender: function(){
            this.collectionView = new CollectionView({collection:this.collection});
            this.mainRegion.show(this.collectionView);
        },
        showModal: function(model){
            console.log(!this.modalView);
            if(!this.modalView || this.modalView.isDestroyed){
                this.modalView = new ModalView({collection:this.collection, model:model.clone()});
                this.modalRegion.show(this.modalView);
                this.modalView.ui.myModal.modal("show");
            } else {
                this.modalView.model.set(model.toJSON());
            }
        }
    });
    return LayoutView;
});