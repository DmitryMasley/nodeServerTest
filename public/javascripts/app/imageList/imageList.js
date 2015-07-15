define(["jquery","backbone", "./image"], function($,Backbone, Image){
    var ImageList = Backbone.Collection.extend({
        model: Image,
        url: '/images.ajax',
        parse: function(data){return data.data;}
    });
    return ImageList;
});

