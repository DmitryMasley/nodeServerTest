define(["jquery","backbone", "underscore", "tpl!../templates/imageView"], function($,Backbone,_,template){
    "use strict";
    var ImageView = Backbone.View.extend({
        tagName: 'div',
        template: template,
        events: {
            'mousedown span.resize-handle': 'startResize',
            "contextmenu": "showContextmenu",
            'mousedown span.remove-handle': 'removeHandler',
            'mousedown span.button': 'removeHandler',
            'mousedown': 'downHandler',
            'dragstart': 'itemDragStart',
            "dragover": "dragOver",
            'dragend': 'dragEnd',
            'drop': 'dropItem'
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
            _.bindAll(this, 'render', 'remove', 'resizing', 'endResize', 'upHandler', 'getParentPosition', 'getSelfPosition');
            this.listenTo(this.model, 'change', this.render, this);
            this.listenTo(this.model, 'destroy', this.remove, this);
        },
        render: function(){
            this.$el.html(this.template(this.model.toJSON()));
            this.removeButton = this.$el.find('span.button');
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
        removeHandler: function(e){
            if (e.originalEvent) e = e.originalEvent;
            console.log(e);
            e.preventDefault();
            e.stopPropagation();
            $(e.srcElement).on('mouseup', this.remove);
        },
        remove: function(e){
            if (e.originalEvent) e = e.originalEvent;
            this.trigger("close");
            Backbone.View.prototype.remove.call(this);
            e.preventDefault();
            e.stopPropagation();
        },
        startResize: function(e){
            this.removeButton.css("display","none");
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
                left: parseInt(this.$el.css("left")),
                top: parseInt(this.$el.css("top")),
                height: parseInt(this.$el.css("height")),
                width: parseInt(this.$el.css("width"))
            });
            e.preventDefault();
            $(document).off('mousemove', this.resizing);
            $(document).off('mouseup', this.endResize);
        },
        downHandler: function(e){
            this.trigger('resetResizable', this.model, this);
            $(document).on("mouseup", this.upHandler);
        },
        showContextmenu: function (e) {
            this.getParentPosition();
            this.getSelfPosition();
            this.mouseDownAt = {
                x: e.pageX,
                y: e.pageY,
                deltaX: e.pageX - this.self.left - this.parent.left,
                deltaY: e.pageY - this.self.top - this.parent.top,
                dragStarted: false
            };
            console.log(this);
            if (parseInt(this.removeButton.css("height"))<this.parent.height-this.self.top-this.mouseDownAt.deltaY){
                this.removeButton.css({top: this.mouseDownAt.deltaY-parseInt(this.removeButton.css("margin-top"))});
            }else{
                this.removeButton.css({top: this.mouseDownAt.deltaY-parseInt(this.removeButton.css("height"))-parseInt(this.removeButton.css("margin-top"))});
            }
            if (parseInt(this.removeButton.css("width"))<this.parent.width-this.self.left-this.mouseDownAt.deltaX){
                this.removeButton.css({left: this.mouseDownAt.deltaX-parseInt(this.removeButton.css("margin-left"))});
            }else{
                this.removeButton.css({left: this.mouseDownAt.deltaX-parseInt(this.removeButton.css("width"))-parseInt(this.removeButton.css("margin-left"))});
            }
            this.removeButton.css({display: "block"});
            return false;
        },
        upHandler: function(e){
            if (e.button==0 || e.button==1){
                if (this.model.get("resizable") === false){
                    this.trigger('resetResizable', this.model, this);
                    this.model.set("resizable", true);
                }else {
                    this.model.set("resizable", false);
                }
            }
            $(document).off("mouseup", this.upHandler);
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
        },
        itemDragStart: function(e){
            var evt = e.originalEvent;
            evt.effectAllowed = "move";
            evt.dataTransfer.setData("text/plain", this.model.get("_id"));
            window._backboneDragDropObject={
                model: this.model,
                x: evt.offsetX,
                y: evt.offsetY
            };
            evt.dataTransfer.setDragImage(this.el,evt.offsetX,evt.offsetY);
        },
        dragOver: function(e){
            var evt = e.originalEvent;
            evt.preventDefault();
            evt.stopPropagation();
            //need to check id
            if (!window._backboneDragDropObject || _.contains(this.model.collection.models,window._backboneDragDropObject.model)){
                evt.dataTransfer.dropEffect = "none";
            }
        },
        dragEnd: function(e){
            if(e.originalEvent.dataTransfer.dropEffect !== 'none'){
                this.remove(e);
                this.model.collection.remove(this.model);
            }
        },
        dropItem: function(e){
            var evt = e.originalEvent;
            evt.preventDefault();
            evt.stopPropagation();
            if (window._backboneDragDropObject && (evt.dataTransfer.getData("text/plain")==window._backboneDragDropObject.model.get("_id"))) {
                this.model.set(_.pick(window._backboneDragDropObject.model.toJSON(), "src", "description", "width", "height", "resizable"));
                this.getParentPosition();
                var x = this.parent.width - this.model.get('width') - this.model.get('left') >=0 ? this.model.get('left') : this.parent.width - this.model.get('width');
                var y = this.parent.height - this.model.get('height') - this.model.get('top') >=0 ? this.model.get('top') : this.parent.height - this.model.get('height');
                this.model.set({top:y, left:x});
            }
            window._backboneDragDropObject=null;
        }
    });
    return ImageView;
});