define(["jquery", "underscore", "marionette", "tpl!../../templates/pages/creativeWindow"], function($, _, Marionette, template){
    "use strict";
    var CreativeWindow = Marionette.ItemView.extend({
        template: template
    });
    return CreativeWindow;
});