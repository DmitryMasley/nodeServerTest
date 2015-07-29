define(["jquery", "underscore", "marionette", "tpl!../templates/form"], function($, _, Marionette, template){
    "use strict";
    var FormView = Marionette.ItemView.extend({
        template: template,
        className: "col-lg-6 col-md-8 col-sm-8"
    });
    return FormView;
});