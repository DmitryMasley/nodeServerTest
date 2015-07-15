define(["jquery","backbone"], function($,Backbone){
    var ImageModel = Backbone.Model.extend({
        idAttribute: "_id",
        defaults: {
            left: '0px',
            top: '0px'
        }
    });
    return ImageModel;
});
