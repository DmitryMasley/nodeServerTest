define(["jquery","backbone"], function($,Backbone){
    var ImageModel = Backbone.Model.extend({
        idAttribute: "_id"
    });
    return ImageModel;
});
