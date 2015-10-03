define(["jquery", "underscore", "marionette", "tpl!../../templates/pages/masterClass"], function($, _, Marionette, template){
    "use strict";
    var MasterClass = Marionette.ItemView.extend({
        template: template
    });
    return MasterClass;
});