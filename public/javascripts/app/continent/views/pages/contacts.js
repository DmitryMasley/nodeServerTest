define(["jquery", "underscore", "marionette", "tpl!../../templates/pages/contacts"], function($, _, Marionette, template){
    "use strict";
    var Contacts = Marionette.ItemView.extend({
        template: template
    });
    return Contacts;
});