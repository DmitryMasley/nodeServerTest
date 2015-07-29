define(["jquery", "underscore", "marionette", "tpl!../templates/form"], function($, _, Marionette, template){
    "use strict";
    var FormView = Marionette.ItemView.extend({
        template: template
    });
    return FormView;
});