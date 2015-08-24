define(["jquery", "underscore", "marionette", "tpl!../../templates/pages/engNativeSpeaker"], function($, _, Marionette, template){
    "use strict";
    var EngNativeSpeaker = Marionette.ItemView.extend({
        template: template
    });
    return EngNativeSpeaker;
});