define(["jquery", "underscore", "marionette", "./item", "tpl!../templates/composite"], function($, _, Marionette, itemView, template){
    "use strict";
    var CompositeView = Marionette.CompositeView.extend({
        initialize: function(config){
            this.collection=config.collection;
            this.el=config.el;
        },
        template: template,
        childView: itemView,
        childViewContainer: "ul"
    });
    return CompositeView;
});