define(["jquery", "underscore", "marionette", "tpl!../templates/modal", "bootstrap"], function($, _, Marionette, template){
    "use strict";
    var ModalView = Marionette.ItemView.extend({
        initialize: function(config){
            this.model=config.model;
            _.bindAll(this, 'onNext', 'onPrev');
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
            'click @ui.prev': 'onPrev'
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
        onRender: function() {
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
            if(this.model){
                $(this.ui.image).attr("src", this.model.escape("src"));
                $(this.ui.description).text(this.model.escape("description"));
                $(this.ui.myModal).modal("show");
            }else{
                $(this.ui.myModal).modal("hide");
            }
        }
    });
    return ModalView;
});