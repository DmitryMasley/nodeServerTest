define(["jquery","backbone", "underscore", "tpl!../templates/imageView"], function($,Backbone,_,template){
    "use strict";
    var ImageView = Backbone.View.extend({
        tagName: 'div',
        template: template,
        events: {
            'mousedown span.resize-handle': 'startResize',
            'button.button': 'remove',
            'mousedown': 'downHandler'

        },
        initialize: function(){
            this.$el.attr({
                "class":"dd-item",
                draggable:"true"
            });
            this.min_width = 96;
            this.min_height = 54;
            this.max_width = 960;
            this.max_height = 540;
            _.bindAll(this, 'render', 'remove', 'resizing', 'endResize', 'dragging', 'upHandler', 'getParentPosition', 'getSelfPosition');
            this.listenTo(this.model, 'change', this.render, this);
            this.listenTo(this.model, 'destroy', this.remove, this);
        },
        render: function(){
            this.$el.html(this.template(this.model.toJSON()));
            this.$el.find('button.button').css({
                display: "none",
                position: "absolute"
            });
            this.$el.attr({id:this.model.get("_id")});
            this.$el.css({
                left: this.model.get("left"),
                top: this.model.get("top"),
                width: this.model.get("width"),
                height: this.model.get("height")
            });
            if (this.model.get('resizable') === true){
                this.$el.addClass("resizable");
            } else if (this.model.get('resizable') === false){
                this.$el.removeClass("resizable");
            }
                return this; // for chainable calls, like .render().el
        },
        remove: function(){
            this.trigger("close");
            Backbone.View.prototype.remove.call(this);
        },
        startResize: function(e){
            this.source = e.toElement;
            this.orig_src = {};
            this.orig_src.item = this.$el.find("img")[0];
            this.orig_src.width = this.orig_src.item.naturalWidth;
            this.orig_src.height = this.orig_src.item.naturalHeight;
            this.getParentPosition();
            this.getSelfPosition();
            e.preventDefault();
            e.stopPropagation();
            $(document).on('mousemove', this.resizing);
            $(document).on('mouseup', this.endResize);
        },
        resizing: function(e){
            if ($(this.source).hasClass('south') && !(e.shiftKey)){
                this.$el.css("height", Math.min((Math.max((e.pageY - this.self.top - this.parent.top), this.min_height)), this.max_height, this.parent.height - this.self.top));
            }
            if ($(this.source).hasClass('north') && !(e.shiftKey)){
                this.$el.css("height", Math.min((Math.max((this.self.height - (Math.max(e.pageY, this.parent.top) - this.self.top - this.parent.top)), this.min_height)), this.max_height));
                this.$el.css("top", this.self.top - parseInt(this.$el.css("height")) + this.self.height);
            }
            if ($(this.source).hasClass('west')) {
                if (e.shiftKey) {
                    if ($(this.source).hasClass('north')) {
                        this.$el.css("width", Math.min((Math.max((this.self.width - (Math.max(e.pageX, this.parent.left) - this.self.left - this.parent.left)), this.min_width, this.min_height*this.orig_src.width/this.orig_src.height)), (this.self.height + this.self.top) / this.orig_src.height * this.orig_src.width, this.max_width));
                        this.$el.css("top", this.self.top - parseInt(this.$el.css("width"))/ this.orig_src.width * this.orig_src.height + this.self.height);
                    }else{
                        this.$el.css("width", Math.min((Math.max((this.self.width - (Math.max(e.pageX, this.parent.left) - this.self.left - this.parent.left)), this.min_width, this.min_height*this.orig_src.width/this.orig_src.height)), (this.parent.height - this.self.top) / this.orig_src.height * this.orig_src.width, this.max_width));
                    }
                    this.$el.css("height", parseInt(this.$el.css("width")) / this.orig_src.width * this.orig_src.height);
                } else {
                    this.$el.css("width", Math.min((Math.max((this.self.width - (Math.max(e.pageX, this.parent.left) - this.self.left - this.parent.left)), this.min_width)), this.max_width));
                }
                this.$el.css("left", this.self.left - parseInt(this.$el.css("width")) + this.self.width);
            }
            if ($(this.source).hasClass('east')) {
                if (e.shiftKey) {
                    if ($(this.source).hasClass('north')) {
                        this.$el.css("width", Math.min((Math.max((e.pageX - this.self.left - this.parent.left), this.min_width, this.min_height*this.orig_src.width/this.orig_src.height)), (this.self.height + this.self.top) / this.orig_src.height * this.orig_src.width, this.parent.width - this.self.left, this.max_width));
                        this.$el.css("top", this.self.top - parseInt(this.$el.css("width")) / this.orig_src.width * this.orig_src.height + this.self.height);
                    }else{
                        this.$el.css("width", Math.min((Math.max((e.pageX - this.self.left - this.parent.left), this.min_width, this.min_height*this.orig_src.width/this.orig_src.height)), (this.parent.height - this.self.top) / this.orig_src.height * this.orig_src.width, this.parent.width - this.self.left, this.max_width));
                    }
                    this.$el.css("height", parseInt(this.$el.css("width")) / this.orig_src.width * this.orig_src.height);
                } else {
                    this.$el.css("width", Math.min((Math.max((e.pageX - this.self.left - this.parent.left), this.min_width)), this.max_width, this.parent.width - this.self.left));
                }
            }
        },
        endResize: function(e){
            this.model.set({
                left: this.$el.css("left"),
                top: this.$el.css("top"),
                height: this.$el.css("height"),
                width: this.$el.css("width")
            });
            e.preventDefault();
            $(document).off('mousemove', this.resizing);
            $(document).off('mouseup', this.endResize);
        },
        downHandler: function(e){
            this.getParentPosition();
            this.getSelfPosition();
            this.mouseDownAt = {
                x: e.pageX,
                y: e.pageY,
                deltaX: e.pageX - this.self.left - this.parent.left,
                deltaY: e.pageY - this.self.top - this.parent.top,
                dragStarted: false
            };
            e.stopPropagation();
            e.preventDefault();
            document.ondragstart = function () {return false};
            this.el.oncontextmenu = function () {return false};
            document.body.onselectstart = function () {return false};
            if (e.button==0 || e.button==1) {
                $(document).on("mousemove", this.dragging);
            }else if (e.button===2){
                this.$el.find('button.button').css({
                    display: "block",
                    left: this.mouseDownAt.deltaX,
                    top: this.mouseDownAt.deltaY
                });
            }
            $(document).on("mouseup", this.upHandler);
        },
        dragging: function(e){
            if (this.mouseDownAt.dragStarted === false &&
                (Math.abs(this.mouseDownAt.x - e.pageX) < 7 &&
                Math.abs(this.mouseDownAt.y - e.pageY) < 7)) {
                return;
            }else{}
            this.trigger('resetResizable', this.model, this);
            this.mouseDownAt.dragStarted=true;
            this.$el.css("left", (e.pageX - this.mouseDownAt.deltaX - this.parent.left));
            this.$el.css("top", (e.pageY - this.mouseDownAt.deltaY - this.parent.top));
            e.stopPropagation();
        },
        upHandler: function(e){
            document.ondragstart = null;
            document.body.onselectstart = null;
            $(document).off("mouseup", this.upHandler);
            $(document).off("mousemove", this.dragging);
            e.stopPropagation();
            if (this.mouseDownAt.dragStarted === true &&
                (e.button==0 || e.button==1) &&
                (parseInt(this.$el.css("left")) > 0) &&
                (parseInt(this.$el.css("top")) > 0) &&
                (parseInt(this.$el.css("left")) < this.parent.width - parseInt(this.$el.css("width"))) &&
                (parseInt(this.$el.css("top")) < this.parent.height - parseInt(this.$el.css("height")))){
                this.model.set({
                    left: "" + (e.pageX - this.mouseDownAt.deltaX - this.parent.left),
                    top: "" + (e.pageY - this.mouseDownAt.deltaY - this.parent.top)
                });
            } else {
                this.$el.css("left", this.self.left);
                this.$el.css("top", this.self.top);
                if (this.mouseDownAt.dragStarted === false &&
                    (e.button==0 || e.button==1)){
                    if (this.model.get("resizable") === false){
                        this.trigger('resetResizable', this.model, this);
                        this.model.set("resizable", true);
                    }else {
                        this.model.set("resizable", false);
                    }
                }
            }
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
    return ImageView;
});