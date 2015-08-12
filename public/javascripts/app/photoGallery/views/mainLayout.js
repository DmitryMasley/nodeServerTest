define(["jquery", "underscore", "marionette", "tpl!../templates/mainLayout", "./collection", "./modal"], function($, _, Marionette, template, CollectionView, ModalView){
    "use strict";
    var LayoutView = Marionette.LayoutView.extend({
        initialize: function(config){
            this.collection=config.collection;
            this.el=config.el;
            this.model=config.model;
        },
        template: template,
        regions: {
            mainRegion: "#main",
            modalRegion: "#modal"
        },
        onRender: function(){
            this.showCollection();
            this.showModal();
        },
        showCollection: function(){
            this.collectionView = new CollectionView({collection:this.collection});
            this.mainRegion.show(this.collectionView);
        },
        showModal: function(config){
            this.modalView = new ModalView({model: (config)?config.model:this.model});
            this.modalRegion.show(this.modalView);
        }
    });
    return LayoutView;
});