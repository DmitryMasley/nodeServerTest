define(["jquery", "underscore", "marionette", "./item"], function($, _, Marionette, itemView){
    "use strict";
    var CollectionView = Marionette.CollectionView.extend({
        initialize: function(config){
            this.collection=config.collection;
        },
        tagName: "div",
        childView: itemView
    });
    return CollectionView;
});