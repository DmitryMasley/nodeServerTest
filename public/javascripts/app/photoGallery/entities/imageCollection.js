define(["jquery","backbone", "./imageModel"], function($,Backbone, ImageModel){
    var ImageCollection = Backbone.Collection.extend({
        model: ImageModel,
        parse: function(data){return data.data;}
    });
    return ImageCollection;
});