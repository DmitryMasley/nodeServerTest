define(["jquery", "backbone", "underscore", "../models/imageModel", "../collections/imageCollection", "./imageView","tpl!../templates/imageCollectionView"], function($, Backbone, _, ImageModel, ImageCollection, ImageView, template){
    "use strict";
    var ImageCollectionView = Backbone.View.extend({
        tagName: 'div',
        width: 768,
        height: 432,
        template: template,
        events: {
            'click span#add': 'addImage',
            'click': 'resetResizable',
            "dragover": "dragOver",
            "dragleave": "dragLeave",
            "dragenter": "dragEnter",
            "drop": "drop"
        },
        initialize: function(){
            _.bindAll(this, 'render', 'appendImage' , 'renderImages'); // every function that uses 'this' as the current object should be in here
            this.$el.attr({"class":"dd-container"});
            this.counter = 0;
            this.collection = new ImageCollection();
            this.listenTo(this.collection, "add", this.appendImage, this); // collection event binder
            this.listenTo(this.collection, "reset", this.renderImages, this); // collection event binder
        },
        render: function(){
            this.$el.html(this.template());
            this.$el.css({
                width: this.width,
                height: this.height
            });
            this.el.oncontextmenu = function () {return false};
            return this;
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
            var image = new ImageModel();
            image.set({
                _id: 'image' + this.counter + '',
                src: prompt("Please enter src", "http://www.w3schools.com/images/colorpicker.gif"),
                description: prompt("Please enter description", "http://www.w3schools.com/images/colorpicker.gif")
            });
            //need here image src validation to add images to collection from the other side
            (image.get("src") != false) ? this.collection.add(image) : false;
        },
        appendImage: function(image){
            var imageView = new ImageView({
                model: image
            });
            this.listenTo(imageView, "resetResizable", this.resetResizable);
            this.listenTo(imageView, "close", function(){
                this.stopListening(imageView, "setResizable", this.resetResizable);
            });
            this.$el.append(imageView.render().$el);
        },
        resetResizable: function(model){
            $(this.collection.models).not($(model)).each(function(idx,item){item.set("resizable", true)});
            $(this.collection.models).not($(model)).each(function(idx,item){item.set("resizable", false)});
        },
        dragEnter: function(e){
            var evt = e.originalEvent;
            evt.stopPropagation();
            evt.preventDefault();
            return false;
        },
        dragOver: function(e){
            var evt = e.originalEvent;
            //need here draggable image src validation to add images to collection from the other side
            if (!window._backboneDragDropObject){
                evt.dataTransfer.dropEffect = "none";
            }else{
                evt.dataTransfer.dropEffect = "move";
            }
            evt.preventDefault();
            evt.stopPropagation();
            this.$el.addClass("active");
        },
        dragLeave: function(){
            this.$el.removeClass("active");
            return false;
        },
        drop: function(e){
            var evt = e.originalEvent;
            evt.preventDefault();
            evt.stopPropagation();
            this.$el.removeClass("active");
            if (window._backboneDragDropObject && (evt.dataTransfer.getData("text/plain")==window._backboneDragDropObject.model.get("_id"))) {
                var image = new ImageModel();
                image.set(_.pick(window._backboneDragDropObject.model.toJSON(), "src", "description", "width", "height", "resizable"));
                var x = window._backboneDragDropObject.x;
                var y = window._backboneDragDropObject.y;
                y = evt.offsetY-y>=0 ? evt.offsetY-y : 0;
                x = evt.offsetX-x>=0 ? evt.offsetX-x : 0;
                x = this.width-parseInt(image.get('width')) > x ? x : this.width-parseInt(image.get('width'));
                y = this.height-parseInt(image.get('height')) > y ? y : this.height-parseInt(image.get('height'));
                image.set({top:y, left:x, _id:++this.counter});
                this.collection.add(image);
            }
            window._backboneDragDropObject=null;
        }
    });
    return ImageCollectionView;
});