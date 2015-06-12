define(["jquery", "underscore", "marionette", "tpl!../templates/simpleView"], function($, _, Marionette, template){
    "use strict";
    var SimpleView = Marionette.ItemView.extend({
        template:template,
        ui: {
            items: ".dd-item",
            container: ".dd-container"
        },
        events: {
            "dragstart @ui.items": "itemDragStart",
            "dragover @ui.container": "dragOver",
            "dragleave @ui.container": "dragLeave",
            "dragenter @ui.container" : "dragEnter",
            "drop @ui.container": "drop",
            "drop @ui.items": "dropItem"
        },
        itemDragStart: function(e){
            e = e.originalEvent;
            e.effectAllowed = "move";
            e.dataTransfer.setData("text/plain", e.target.id);
            e.dataTransfer.setData("x", e.offsetX);
            e.dataTransfer.setData("y", e.offsetY);
            this.ui.container.addClass("active");
        },
        dragEnter: function(e){
            var evt = e.originalEvent;
            evt.stopPropagation();
            evt.preventDefault();
            return false;
        },
        dragOver: function(e){
            var evt = e.originalEvent;
            evt.dataTransfer.dropEffect = "move";
            evt.stopPropagation();
            evt.preventDefault();
            this.ui.container.addClass("active");
        },
        dragLeave: function(){
            this.ui.container.removeClass("active");
            return false;
        },
        drop: function(e){
            var evt = e.originalEvent;
            var item = $("#"+evt.dataTransfer.getData("text/plain"));
            var x = parseInt(evt.dataTransfer.getData("x"));
            var y = parseInt(evt.dataTransfer.getData("y"));
            this.ui.container.append(item);
            y = evt.offsetY-y>=0 ? evt.offsetY-y : 0;
            x = evt.offsetX-x>=0 ? evt.offsetX-x : 0;
            x = this.ui.container.width()-item.width() > x ? x : this.ui.container.width()-item.width();
            y = this.ui.container.height()-item.height() > y ? y : this.ui.container.height()-item.height();

            item.css({top:y, left:x});
            this.ui.container.removeClass("active");
        },
        dropItem: function(e){
            e.preventDefault();
            e.stopPropagation();
        }
    });
    return SimpleView;
});