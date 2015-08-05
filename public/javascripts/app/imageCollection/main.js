define(["jquery", "./views/imageCollectionView"], function($, ImageCollectionView) {
    var ImageCollectionMain = Backbone.View.extend({
        initialize: function(config){
            this.view = new ImageCollectionView(config);
            this.view.collection.fetch();
        }
    });
    return ImageCollectionMain;
});