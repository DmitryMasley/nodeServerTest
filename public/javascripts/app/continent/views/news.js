define(["jquery", "underscore", "backbone" ,"marionette", "./exercise"], function($, _, Backbone ,Marionette, exerciseView){
    "use strict";
    var NewsView = Marionette.CollectionView.extend({
        initialize: function(){
            this.collection = new Backbone.Collection([
                {img: "/images/continent/minisad.jpg" ,title: "В клубе Continent запускается Мини-сад", src: "miniSad"},
                {img: "/images/continent/master-class.jpg" ,title: "10 октября состоится Мастер-класс", src: "masterClass"}
            ]);
        },
        tagName: "div",
        className:"row",
        childView: exerciseView
    });
    return NewsView;
});