define(["jquery","backbone", "underscore", "tpl!../templates/imageModelView"], function($,Backbone,_,template){
    "use strict";
    var ImageModelView = Backbone.View.extend({
        tagName: 'div',
        template: template,
        events: {
            'mousedown span.resize-handle': 'startResize',
            'mousedown': 'downHandler'
        },
        initialize: function(){
            this.model.set({
                middleX: this.model.get("width").slice(0, -2)/2 - Math.abs(this.model.get("resizeHandlerSize").slice(0, -2)/2) + "px",
                middleY: this.model.get("height").slice(0, -2)/2 - Math.abs(this.model.get("resizeHandlerSize").slice(0, -2)/2) + "px"
            });
            this.$el.append(this.template(this.model.toJSON()));
            this.$el.attr({
                "class":"dd-item",
                id:this.model.get("_id"),
                draggable:"true"
            });
            this.min_width = 60;
            this.min_height = 60;
            this.max_width = 1000;
            this.max_height = 600;
            _.bindAll(this, 'render', 'resizing', 'endResize', 'dragging', 'upHandler', 'getParentPosition', 'getSelfPosition');
            this.listenTo(this.model, 'change', this.render, this);
        },
        render: function(){
            this.$el.attr({
                style:"left: "+ this.model.get("left") +"; top: "+ this.model.get("top") +"; width: "+ this.model.get("width") +"; height: "+ this.model.get("height") +""
            });
            return this; // for chainable calls, like .render().el
        },
        startResize: function(e){
            this.source = e.toElement;
            this.source.width=Math.abs(this.model.get("resizeHandlerSize").slice(0, -2)/2);
            this.orig_src = {};
            this.orig_src.item = this.$el.find("img")[0];
            this.orig_src.width = this.orig_src.item.naturalWidth;
            this.orig_src.height = this.orig_src.item.naturalHeight;
            this.getParentPosition();
            this.getSelfPosition();
            this.$el.addClass("active");
            e.preventDefault();
            e.stopPropagation();
            $(document).on('mousemove', this.resizing);
            $(document).on('mouseup', this.endResize);
        },
        resizing: function(e){
            if ($(this.source).hasClass('south') && !(e.shiftKey)){
                this.$el.css("height", Math.min((Math.max((e.pageY - this.self.top - this.parent.top), this.min_height)), this.max_height, this.parent.height - this.self.top) + "px");
            }
            if ($(this.source).hasClass('north') && !(e.shiftKey)){
                this.$el.css("height", Math.min((Math.max((this.self.height - (Math.max(e.pageY, this.parent.top) - this.self.top - this.parent.top)), this.min_height)), this.max_height) + "px");
                this.$el.css("top", this.self.top - (this.$el.css("height").slice(0, -2) - this.self.height) + "px");
            }
            if ($(this.source).hasClass('west')) {
                if (e.shiftKey) {
                    if ($(this.source).hasClass('north')) {
                        this.$el.css("width", Math.min((Math.max((this.self.width - (Math.max(e.pageX, this.parent.left) - this.self.left - this.parent.left)), this.min_width, this.min_height*this.orig_src.width/this.orig_src.height)), (this.self.height + this.self.top) / this.orig_src.height * this.orig_src.width, this.max_width) + "px");
                        this.$el.css("top", this.self.top - (this.$el.css("width").slice(0, -2) / this.orig_src.width * this.orig_src.height - this.self.height) + "px");
                    }else{
                        this.$el.css("width", Math.min((Math.max((this.self.width - (Math.max(e.pageX, this.parent.left) - this.self.left - this.parent.left)), this.min_width, this.min_height*this.orig_src.width/this.orig_src.height)), (this.parent.height - this.self.top) / this.orig_src.height * this.orig_src.width, this.max_width) + "px");
                    }
                    this.$el.css("height", this.$el.css("width").slice(0, -2) / this.orig_src.width * this.orig_src.height + "px");
                } else {
                    this.$el.css("width", Math.min((Math.max((this.self.width - (Math.max(e.pageX, this.parent.left) - this.self.left - this.parent.left)), this.min_width)), this.max_width) + "px");
                }
                this.$el.css("left", this.self.left - (this.$el.css("width").slice(0, -2) - this.self.width) + "px");
            }
            if ($(this.source).hasClass('east')) {
                if (e.shiftKey) {
                    if ($(this.source).hasClass('north')) {
                        this.$el.css("width", Math.min((Math.max((e.pageX - this.self.left - this.parent.left), this.min_width, this.min_height*this.orig_src.width/this.orig_src.height)), (this.self.height + this.self.top) / this.orig_src.height * this.orig_src.width, this.parent.width - this.self.left, this.max_width) + "px");
                        this.$el.css("top", this.self.top - (this.$el.css("width").slice(0, -2) / this.orig_src.width * this.orig_src.height - this.self.height) + "px");
                    }else{
                        this.$el.css("width", Math.min((Math.max((e.pageX - this.self.left - this.parent.left), this.min_width, this.min_height*this.orig_src.width/this.orig_src.height)), (this.parent.height - this.self.top) / this.orig_src.height * this.orig_src.width, this.parent.width - this.self.left, this.max_width) + "px");
                    }
                    this.$el.css("height", this.$el.css("width").slice(0, -2) / this.orig_src.width * this.orig_src.height + "px");
                } else {
                    this.$el.css("width", Math.min((Math.max((e.pageX - this.self.left - this.parent.left), this.min_width)), this.max_width, this.parent.width - this.self.left) + "px");
                }
            }
            this.$el.find(".resize-handle.north , .resize-handle.south").not(".west").not(".east").css("left", this.$el.css("width").slice(0, -2)/2 - this.source.width/2 +"px");
            this.$el.find(".resize-handle.east , .resize-handle.west").not(".north").not(".south").css("top", this.$el.css("height").slice(0, -2)/2 - this.source.width/2 +"px");
        },
        endResize: function(e){
            this.model.set({
                left: this.$el.css("left"),
                top: this.$el.css("top"),
                height: this.$el.css("height"),
                width: this.$el.css("width")
            });
            this.$el.removeClass("active");
            e.preventDefault();
            $(document).off('mousemove', this.resizing);
            $(document).off('mouseup', this.endResize);
        },
        downHandler: function(e){
            this.getParentPosition();
            this.getSelfPosition();
            this.mouseDownAt = {x: e.pageX,
                y: e.pageY,
                deltaX : e.pageX - this.self.left - this.parent.left,
                deltaY : e.pageY - this.self.top - this.parent.top,
                dragStarted : false
            };
            this.$el.addClass("active");
            document.ondragstart = function () {return false};
            document.body.onselectstart = function () {return false};
            $(document).on("mousemove", this.dragging);
            $(document).on("mouseup", this.upHandler);
            e.stopPropagation();
            e.preventDefault();
        },
        dragging: function(e){
            if (this.mouseDownAt.dragStarted === false &&
                (Math.abs(this.mouseDownAt.x - e.pageX) < 7 &&
                Math.abs(this.mouseDownAt.y - e.pageY) < 7)) {
                return;
            }else{}
            this.mouseDownAt.dragStarted=true;
            this.$el.css("left", (e.pageX - this.mouseDownAt.deltaX - this.parent.left) + "px");
            this.$el.css("top", (e.pageY - this.mouseDownAt.deltaY - this.parent.top) + "px");
            e.stopPropagation();
        },
        upHandler: function(e){
            document.ondragstart = null;
            document.body.onselectstart = null;
            $(document).off("mouseup", this.upHandler);
            $(document).off("mousemove", this.dragging);
            e.stopPropagation();
            if (this.mouseDownAt.dragStarted === true &&
                (this.$el.css("left").slice(0, -2) > 0) &&
                (this.$el.css("top").slice(0, -2) > 0) &&
                (this.$el.css("left").slice(0, -2) < this.parent.width - this.$el.css("width").slice(0, -2)) &&
                (this.$el.css("top").slice(0, -2) < this.parent.height - this.$el.css("height").slice(0, -2))){
                this.model.set({
                    left: "" + (e.pageX - this.mouseDownAt.deltaX - this.parent.left) + "px",
                    top: "" + (e.pageY - this.mouseDownAt.deltaY - this.parent.top) + "px"
                });
            } else {
                this.$el.css("left", this.self.left + "px");
                this.$el.css("top", this.self.top + "px");
                if (this.mouseDownAt.dragStarted === false){
                    this.$el.toggleClass("resizable");
                }
            }
            this.$el.removeClass("active");
        },
        getParentPosition: function(){
            this.parent = {
                left : $(this.el.parentNode).offset().left + parseInt($(this.el.parentNode).css("border-left-width")),
                top : $(this.el.parentNode).offset().top + parseInt($(this.el.parentNode).css("border-top-width")),
                width : parseInt($(this.el.parentNode).css("width")),
                height : parseInt($(this.el.parentNode).css("height"))
            };
        },
        getSelfPosition:function(){
            this.self = {
                left : this.$el.offset().left - this.parent.left,
                top : this.$el.offset().top - this.parent.top,
                width : parseInt(this.$el.css("width")),
                height : parseInt(this.$el.css("height"))
            };
        }
    });
    return ImageModelView;
});