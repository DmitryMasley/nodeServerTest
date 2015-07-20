define(["jquery","backbone"], function($,Backbone){
    var ImageModel = Backbone.Model.extend({
        idAttribute: "_id",
        defaults: {
            left: 0,
            top: 0,
            width: 192,
            height: 108,
            resizable: false
        }
    });
    return ImageModel;
});
