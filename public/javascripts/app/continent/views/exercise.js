define(["jquery", "underscore", "marionette", "tpl!../templates/exercise"], function($, _, Marionette, template){
    "use strict";
    var ItemView = Marionette.ItemView.extend({
        template: template,
        className: "col-lg-3 col-md-4 col-sm-4 col-xs-6",
        events: {
            'click div.item': 'clicked'
        },
        clicked: function (e) {
            e.preventDefault();
            e.stopPropagation();
            this.trigger("show:"+this.model.get("src")+"", this.model.get("src"));
        }
    });
    return ItemView;
});