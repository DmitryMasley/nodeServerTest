define(["jquery", "underscore", "backbone" ,"marionette", "./exercise"], function($, _, Backbone ,Marionette, exerciseView){
    "use strict";
    var NewsView = Marionette.CollectionView.extend({
        initialize: function(){
            this.collection = new Backbone.Collection([
                {img: "/images/continent/minisad.jpg" ,title: "В клубе Continent запускается Мини-сад", src: "miniSad"}
            ]);
        },
        tagName: "div",
        className:"row",
        childView: exerciseView
    });
    return NewsView;
});