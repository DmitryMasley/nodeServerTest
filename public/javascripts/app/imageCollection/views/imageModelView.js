define(["jquery","backbone", "underscore", "tpl!../templates/imageView"], function($,Backbone,_,template){
    "use strict";
    var ImageModelView = Backbone.View.extend({
    initialize: function(){
        this.listenTo(this.model, 'change', this.render, this);
    },
    render: function(){
        $(this.el).append(template({
            src: this.model.get('src'),
            description: this.model.get('description'),
            id: this.model.get("_id"),
            left: this.model.get("left"),
            top: this.model.get("top")
        }));
        return this; // for chainable calls, like .render().el
    }
    });
    return ImageModelView;
});