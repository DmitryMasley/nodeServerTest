define(["jquery", "underscore", "marionette", "tpl!../templates/modal", "bootstrap"], function($, _, Marionette, template){
    "use strict";
    var ModalView = Marionette.ItemView.extend({
        initialize: function(config){
            this.collection=config.collection;
            this.model=config.model;
            this.listenTo(this.model,'change', this.refr);
            _.bindAll(this, 'onNext', 'onPrev', 'refr', "removeStyle");
        },
        tagName: "div",
        template: template,
        ui: {
            myModal: "#myModal",
            description: "#myModal b.imgDescription",
            image: "#myModal img",
            next: "#myModal a.controls.next",
            prev: "#myModal a.controls.previous"
        },
        events:{
            'keydown':'chkKey',
            'click @ui.next': 'onNext',
            'click @ui.prev': 'onPrev',
            'shown.bs.modal': "removeStyle",
            "hidden.bs.modal" : "destroy"
        },
        chkKey: function(e){
            if (e.keyCode == 8) { // 8 is backspace
                e.preventDefault();
                this.ui.myModal.modal("hide");
            }
        },
        onNext: function(e) {
            e.preventDefault();
            e.stopPropagation();
            this.trigger("next", this.model);
        },
        onPrev: function(e) {
            e.preventDefault();
            e.stopPropagation();
            this.trigger("prev", this.model);
        },
        removeStyle: function(){
            $(this.ui.myModal).removeAttr("style");
        },
        refr: function() {
            if (this.collection.indexOf(this.collection.get(this.model.id))===0){
                $(this.ui.prev).css("visibility","hidden");
            }else{
                $(this.ui.prev).css("visibility","visible");
            }
            if (this.collection.indexOf(this.collection.get(this.model.id))===this.collection.length-1){
                $(this.ui.next).css("visibility","hidden");
            }else{
                $(this.ui.next).css("visibility","visible");
            }
            $(this.ui.image).attr("src", this.model.escape("src"));
            $(this.ui.myModal).removeClass("portrait").removeClass("landscape");
            $(this.ui.myModal).addClass(this.model.get("title"));
            $(this.ui.description).text(this.model.escape("description"));
        },
        onRender: function() {
            this.refr();
            this.removeStyle();
        }
    });
    return ModalView;
});