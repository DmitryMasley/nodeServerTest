define(["jquery", "backbone", "underscore", "../image", "../imageList", "./imageView"], function($, Backbone, _, Image, ImageList, ImageView){
    "use strict";
    var ImageListView = Backbone.View.extend({
        el: $(".dd-main"), // el attaches to existing element
        initialize: function(){
            _.bindAll(this, 'renderButton', 'addImage'); // every function that uses 'this' as the current object should be in here
            this.counter = 0;
            this.collection = new ImageList();
            this.listenTo(this.collection, "add", this.appendImage, this); // collection event binder
            this.listenTo(this.collection, "reset", this.renderImages, this); // collection event binder
            this.renderButton();
            this.renderImages();
        },
        renderButton: function(){
            $(".dd-main").append("<button id='add'>Add image</button>");
            $(".dd-main button#add").on("click", this.addImage);
        },
        renderImages: function(){
            var self = this;
            _(this.collection.models).each(function(image){ // in case collection is not empty
                image.set({
                    id: image.get('_id')
                });
                self.appendImage(image);
            }, this);
        },
        addImage: function(){
            this.counter++;
            var image = new Image();
            image.set({
                _id: 'image' + this.counter + '',
                src: prompt("Please enter src", "http://www.w3schools.com/images/colorpicker.gif"),
                description: prompt("Please enter description", "http://www.w3schools.com/images/colorpicker.gif")
            });
            (image.get("src") != false) ? this.collection.add(image) : false;
        },
        appendImage: function(image){
            var imageView = new ImageView({
                model: image
            });
            $(this.el).append(imageView.render().el);
        }
    });
    return ImageListView;
});