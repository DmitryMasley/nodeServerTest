define(["jquery", "underscore", "marionette", "tpl!../templates/modal", "bootstrap"], function($, _, Marionette, template){
    "use strict";
    var ModalView = Marionette.ItemView.extend({
        initialize: function(config){
            this.collection=config.collection;
        },
        template: template,
        ui: {
            myModal: "#myModal",
            formModal: "div.modal form.form",
            formId: "div.modal form.form #id",
            formTitle: "div.modal form.form #title",
            formPrice: "div.modal form.form #price",
            formImg: "div.modal form.form #img"
        },
        events:{
            'submit @ui.formModal': 'onSubmit'
        },
        onSubmit: function(e) {
            e.preventDefault();
            this.collection.add({
                id: this.ui.formId.val(),
                title: this.ui.formTitle.val(),
                price: parseFloat(parseFloat(this.ui.formPrice.val()).toFixed(2)),
                img: this.ui.formImg.val()
            });
            this.ui.myModal.modal("hide");
        }
    });
    return ModalView;
});