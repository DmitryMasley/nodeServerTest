define(["jquery","backbone"], function($,Backbone){
    var ImageModel = Backbone.Model.extend({
        idAttribute: "_id",
        defaults: {
            left: '0px',
            top: '0px',
            width: '192px',
            height: '108px',
            resizeHandlerSize: "8px"
        }
    });
    return ImageModel;
});
