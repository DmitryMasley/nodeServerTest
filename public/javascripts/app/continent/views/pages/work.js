define(["jquery", "underscore", "marionette", "tpl!../../templates/pages/work"], function($, _, Marionette, template){
    "use strict";
    var Work = Marionette.ItemView.extend({
        template: template
    });
    return Work;
});