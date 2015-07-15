define(["jquery","backbone", "./../models/imageModel"], function($,Backbone, ImageModel){
    var ImageCollection = Backbone.Collection.extend({
        model: ImageModel,
        url: '/images.ajax',
        parse: function(data){return data.data;}
    });
    return ImageCollection;
});

