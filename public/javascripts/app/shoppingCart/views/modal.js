define(["jquery", "underscore", "marionette", "tpl!../templates/modal", "bootstrap", "validate"], function($, _, Marionette, template){
    "use strict";
    var ModalView = Marionette.ItemView.extend({
        initialize: function(config){
            this.collection=config.collection;
            _.bindAll(this, 'onAdd');
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
        },
        onAdd: function() {
            this.collection.add({
                id: this.ui.formId.val(),
                title: this.ui.formTitle.val(),
                price: parseFloat(parseFloat(this.ui.formPrice.val()).toFixed(2)),
                img: this.ui.formImg.val()
            });
            this.ui.myModal.modal("hide");
        },
        onRender: function() {
            this.ui.formModal.validate({
                rules: {
                    id:{
                        required: true
                    },
                    title:{
                        required: true,
                        minlength: 3
                    },
                    price:{
                        required: true,
                        number: true
                    },
                    img: {
                        required: true,
                        url: true
                    }
                },
                messages: {
                    id: "Please specify product id",
                    title: "Please specify product title",
                    price: "Please specify product price",
                    img: "Please specify url of img file"
                },
                submitHandler: this.onAdd
            })
        }
    });
    return ModalView;
});