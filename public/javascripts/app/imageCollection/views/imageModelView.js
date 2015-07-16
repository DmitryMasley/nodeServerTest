define(["jquery","backbone", "underscore", "tpl!../templates/imageModelView"], function($,Backbone,_,template){
    "use strict";
    var ImageModelView = Backbone.View.extend({
        template:template,
        initialize: function(){
            this.listenTo(this.model, 'change', this.render, this);
        },
        render: function(){
            this.setElement(this.template(this.model.toJSON()));
            return this; // for chainable calls, like .render().el
        }
        });
    return ImageModelView;
});