define(["jquery", "underscore", "marionette", "tpl!../templates/main", "./exercises", "./news"], function($, _, Marionette, template, ExercisesView, NewsView){
    "use strict";
    var MainView = Marionette.LayoutView.extend({
        template: template,
        regions: {
            exercises: "#exercises",
            news: "#news"
        },
        onRender: function(){
            this.view = new ExercisesView();
            this.exercises.show(this.view);
            this.newsView= new NewsView();
            this.news.show(this.newsView);
        }
    });
    return MainView;
});