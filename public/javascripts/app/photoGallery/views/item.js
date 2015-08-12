define(["jquery", "underscore", "marionette", "tpl!../templates/item"], function($, _, Marionette, template){
    "use strict";
    var ItemView = Marionette.ItemView.extend({
        tagName: "li",
        template: template,
        className: "col-lg-3 col-md-3 col-sm-4 col-xs-4",
        triggers: {
            'click img': 'show:me'
        },
        onBeforeRender: function(){
            this.$el.css({"margin-bottom": "30px"});
        }
    });
    return ItemView;
});