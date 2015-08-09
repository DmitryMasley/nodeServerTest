define(["jquery", "underscore", "marionette", "tpl!../templates/item"], function($, _, Marionette, template){
    "use strict";
    var ItemView = Marionette.ItemView.extend({
        template: template,
        className: "col-lg-3 col-md-4 col-sm-4 col-xs-6",
        ui: {
            removeBtn: "span.btn.sharp"
        },
        events: {
            'click @ui.removeBtn': 'clickedRemove'
        },
        clickedRemove: function () {
            this.model.collection.remove(this.model);
        },
        remove: function () {
            var self = this;
            this.$el.fadeOut(function(){
                Marionette.ItemView.prototype.remove.call(self);
            });
        }
    });
    return ItemView;
});