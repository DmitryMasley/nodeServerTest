define(["jquery", "./views/imageCollectionView"], function($, ImageCollectionView){
    var ImageCollectionMain = function(config){
        var imageCollectionView = new ImageCollectionView(config);
        imageCollectionView.collection.fetch();
    };
    return ImageCollectionMain;
});