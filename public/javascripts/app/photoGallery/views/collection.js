define(["jquery", "underscore", "marionette", "./item"], function($, _, Marionette, itemView){
    "use strict";
    var CollectionView = Marionette.CollectionView.extend({
        initialize: function(config){
            this.collection=config.collection;
        },
        tagName: "ul",
        childView: itemView,
        onRender: function(){
            this.$el.class="row";
            this.$el.css({
                "list-style":"none",
                "padding":"0 0 0 0",
                "margin":"0 0 0 0"
            })
        }
    });
    return CollectionView;
});