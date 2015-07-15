define(["jquery","backbone"], function($,Backbone){
    var Image = Backbone.Model.extend({
        idAttribute: "_id"
    });
    return Image;
});
