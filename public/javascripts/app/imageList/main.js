define(["jquery", "./views/imageListView"], function($, ImageListView){
    var ImageListMain = function(config){
        var imageListView = new ImageListView(config);
        imageListView.collection.fetch();
    };
    return ImageListMain;
});