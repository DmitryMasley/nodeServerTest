define(["jquery", "underscore", "marionette", "tpl!../templates/modal", "bootstrap"], function($, _, Marionette, template){
    "use strict";
    var ModalView = Marionette.ItemView.extend({
        initialize: function(config){
            this.collection=config.collection;
            this.model=config.model;
            this.listenTo(this.model,'change', this.refr);
            _.bindAll(this, 'onNext', 'onPrev', 'refr');
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
            'click @ui.next': 'onNext',
            'click @ui.prev': 'onPrev',
            "hidden.bs.modal" : "destroy"
        },
        onNext: function(e) {
            e.preventDefault();
            e.stopPropagation();
            this.trigger("show:next", this.model);
        },
        onPrev: function(e) {
            e.preventDefault();
            e.stopPropagation();
            this.trigger("show:prev", this.model);
        },
        refr: function() {
            //var total=this.collection.models.length;
            //var index = childView._index;
            //if(total === (parseInt(index) + 1)){
            //    $(this.ui.next).hide();
            //}else{
            //    $(this.ui.next).show().attr('href', parseInt(index) + 1);
            //}
            //if(parseInt(index) === 0){
            //    $(this.ui.prev).hide();
            //}else{
            //    $(this.ui.prev).show().attr('href', parseInt(index) - 1);
            //}
            $(this.ui.image).attr("src", this.model.escape("src"));
            $(this.ui.description).text(this.model.escape("description"));
        },
        onRender: function() {
            this.refr();
        }
    });
    return ModalView;
});