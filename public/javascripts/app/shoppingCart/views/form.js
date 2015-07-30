define(["jquery", "underscore", "marionette", "tpl!../templates/form", "validate"], function($, _, Marionette, template){
    "use strict";
    var FormView = Marionette.ItemView.extend({
        initialize: function(config){
            this.collection=config.collection;
            _.bindAll(this, 'onAdd');
        },
        template: template,
        className: "col-lg-6 col-md-8 col-sm-8",
        ui: {
            form: "form.form",
            formName: "form.form #name",
            formPhone: "form.form #mobile_phone",
            formEmail: "form.form #email",
            formComment: "form.form #comment"
        },
        events:{
            'submit @ui.form': 'onSubmit'
        },
        onSubmit: function(e) {
            e.preventDefault();
        },
        onAdd: function(){
            this.model = new Backbone.Model();
            this.model.url = "http://127.0.0.1:3000";
            this.model.save({
                order: _.pluck(this.collection.models,"id"),
                name: this.ui.formName.val(),
                mobile_phone: this.ui.formPhone.val(),
                email: this.ui.formEmail.val(),
                comment: this.ui.formComment.val()
            });
            alert(JSON.stringify(this.model));
        },
        onRender: function() {
            this.ui.form.validate({
                rules: {
                    name:{
                        required: true,
                        minlength: 2
                    },
                    mobile_phone:{
                        required: true,
                        number: true,
                        minlength: 10
                    },
                    email:{
                        required: true,
                        email: true
                    },
                    comment: {
                        required: false
                    }
                },
                messages: {
                    name: "Please specify your name",
                    mobile_phone: "Please specify your mobile phone number",
                    email: "Please specify your e-mail",
                    comment: "Please specify your comment"
                },
                submitHandler: this.onAdd
            })
        }
    });
    return FormView;
});