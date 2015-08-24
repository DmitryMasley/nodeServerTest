define(["jquery", "underscore", "marionette", "tpl!../../templates/pages/blahNativeSpeaker"], function($, _, Marionette, template){
    "use strict";
    var BlahNativeSpeaker = Marionette.ItemView.extend({
        template: template
    });
    return BlahNativeSpeaker;
});