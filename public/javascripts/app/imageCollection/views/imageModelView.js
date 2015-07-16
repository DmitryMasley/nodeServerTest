define(["jquery","backbone", "underscore", "tpl!../templates/imageModelView"], function($,Backbone,_,template){
    "use strict";
    var ImageModelView = Backbone.View.extend({
        template:template,
        events: {
            'mousedown .resize-handle': 'startResize'
        },
        initialize: function(){
            this.min_width = 60;
            this.min_height = 60;
            this.max_width = 1000;
            this.max_height = 600;
            _.bindAll(this, 'resizing', 'endResize');
            this.listenTo(this.model, 'change', this.render, this);
        },
        render: function(){
            this.setElement(this.template(this.model.toJSON()));
            this.$el.addClass("resizable");
            return this; // for chainable calls, like .render().el
        },
        startResize: function(e){
            this.source = e.toElement;
            this.source.width=$(this.source).css("width").slice(0, -2);
            this.orig_src = {};
            this.orig_src.item = this.$el.find("img")[0];
            this.orig_src.width = this.orig_src.item.naturalWidth;
            this.orig_src.height = this.orig_src.item.naturalHeight;
            this.parent = {
                left : $(this.el.parentNode).offset().left + parseInt($(this.el.parentNode).css("border-left-width")),
                top : $(this.el.parentNode).offset().top + parseInt($(this.el.parentNode).css("border-top-width")),
                width : parseInt($(this.el.parentNode).css("width")),
                height : parseInt($(this.el.parentNode).css("height"))
            };
            this.self = {
                left : $(this.el).offset().left - this.parent.left,
                top : $(this.el).offset().top - this.parent.top,
                width : parseInt($(this.el).css("width")),
                height : parseInt($(this.el).css("height"))
            };
            e.preventDefault();
            e.stopPropagation();
            $(document).on('mousemove', this.resizing);
            $(document).on('mouseup', this.endResize);
        },
        endResize:function(e) {
            this.model.attributes.left = $(this.el).css("left");
            this.model.attributes.top = $(this.el).css("top");
            //this.el.parentNode.appendChild(this.el);
            e.preventDefault();
            $(document).off('mouseup', this.endResize);
            $(document).off('mousemove', this.resizing);

        },
        resizing: function(e) {
            if ($(this.source).hasClass('south') && !(e.shiftKey)){
                $(this.el).css("height", Math.min((Math.max((e.clientY - this.self.top - this.parent.top), this.min_height)), this.max_height, this.parent.height - this.self.top) + "px");
            }
            if ($(this.source).hasClass('north') && !(e.shiftKey)){
                $(this.el).css("height", Math.min((Math.max((this.self.height - (Math.max(e.clientY, this.parent.top) - this.self.top - this.parent.top)), this.min_height)), this.max_height) + "px");
                $(this.el).css("top", this.self.top - ($(this.el).css("height").slice(0, -2) - this.self.height) + "px");
            }
            if ($(this.source).hasClass('west')) {
                if (e.shiftKey) {
                    if ($(this.source).hasClass('north')) {
                        $(this.el).css("width", Math.min((Math.max((this.self.width - (Math.max(e.clientX, this.parent.left) - this.self.left - this.parent.left)), this.min_width, this.min_height*this.orig_src.width/this.orig_src.height)), (this.self.height + this.self.top) / this.orig_src.height * this.orig_src.width, this.max_width) + "px");
                        $(this.el).css("top", this.self.top - ($(this.el).css("width").slice(0, -2) / this.orig_src.width * this.orig_src.height - this.self.height) + "px");
                    }else{
                        $(this.el).css("width", Math.min((Math.max((this.self.width - (Math.max(e.clientX, this.parent.left) - this.self.left - this.parent.left)), this.min_width, this.min_height*this.orig_src.width/this.orig_src.height)), (this.parent.height - this.self.top) / this.orig_src.height * this.orig_src.width, this.max_width) + "px");
                    }
                    $(this.el).css("height", $(this.el).css("width").slice(0, -2) / this.orig_src.width * this.orig_src.height + "px");
                } else {
                    $(this.el).css("width", Math.min((Math.max((this.self.width - (Math.max(e.clientX, this.parent.left) - this.self.left - this.parent.left)), this.min_width)), this.max_width) + "px");
                }
                $(this.el).css("left", this.self.left - ($(this.el).css("width").slice(0, -2) - this.self.width) + "px");
            }
            if ($(this.source).hasClass('east')) {
                if (e.shiftKey) {
                    if ($(this.source).hasClass('north')) {
                        $(this.el).css("width", Math.min((Math.max((e.clientX - this.self.left - this.parent.left), this.min_width, this.min_height*this.orig_src.width/this.orig_src.height)), (this.self.height + this.self.top) / this.orig_src.height * this.orig_src.width, this.parent.width - this.self.left, this.max_width) + "px");
                        $(this.el).css("top", this.self.top - ($(this.el).css("width").slice(0, -2) / this.orig_src.width * this.orig_src.height - this.self.height) + "px");
                    }else{
                        $(this.el).css("width", Math.min((Math.max((e.clientX - this.self.left - this.parent.left), this.min_width, this.min_height*this.orig_src.width/this.orig_src.height)), (this.parent.height - this.self.top) / this.orig_src.height * this.orig_src.width, this.parent.width - this.self.left, this.max_width) + "px");
                    }
                    $(this.el).css("height", $(this.el).css("width").slice(0, -2) / this.orig_src.width * this.orig_src.height + "px");
                } else {
                    $(this.el).css("width", Math.min((Math.max((e.clientX - this.self.left - this.parent.left), this.min_width)), this.max_width, this.parent.width - this.self.left) + "px");
                }
            }
            $(this.el).find(".resize-handle.north , .resize-handle.south").not(".west").not(".east").css("left", $(this.el).css("width").slice(0, -2)/2 - this.source.width/2 +"px");
            $(this.el).find(".resize-handle.east , .resize-handle.west").not(".north").not(".south").css("top", $(this.el).css("height").slice(0, -2)/2 - this.source.width/2 +"px");
        }
        });
    return ImageModelView;
});