define(["jquery","backbone"], function($,Backbone){
    "use strict";
    var ImageView = Backbone.View.extend({
    tagName: 'div', // name of tag to be created
    initialize: function(){
        this.listenTo(this.model, 'change', this.render, this);
    },
    render: function(){
        var img = $("<img/>", // Create a new <img> element
            {src:this.model.get('src'),
                description:this.model.get('description')
            });
        $(this.el).append(img);
        $(this.el).attr({draggable:"true",
            id:this.model.get("_id")
        });
        $(this.el).addClass("dd-item");
        $(this.el).css({'zIndex':'100'});
        return this; // for chainable calls, like .render().el
    }
    });
    return ImageView;
});