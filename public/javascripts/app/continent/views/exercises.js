define(["jquery", "underscore", "backbone" ,"marionette", "./exercise"], function($, _, Backbone ,Marionette, exerciseView){
    "use strict";
    var ExersisesView = Marionette.CollectionView.extend({
        initialize: function(){
            this.collection = new Backbone.Collection([
                {img: "/images/continent/exercises/engChild/1.jpg" ,title: "Английский язык для малышей", src: "engChild"},
                {img: "/images/continent/exercises/engSchool/1.jpg" ,title: "Английский для школьников", src: "engSchool"},
                {img: "/images/continent/exercises/engAdult/1.jpg" ,title: "Английский для взрослых", src: "engAdult"},
                {img: "/images/continent/exercises/engNativeSpeaker/1.jpg" ,title: "Английский с носителем языка", src: "engNativeSpeaker"},
                {img: "/images/continent/exercises/blahNativeSpeaker/1.jpg" ,title: "Blah-blah club с носителем языка", src: "blahNativeSpeaker"},
                {img: "/images/continent/exercises/engCorp/3.jpg" ,title: "Корпоративный английский", src: "engCorp"},
                {img: "/images/continent/exercises/development/4.jpg" ,title: "Развивающие занятия от 3 лет", src: "development"},
                {img: "/images/continent/exercises/prepSchool/4.jpg" ,title: "Подготовка к школе", src: "prepSchool"},
                {img: "/images/continent/exercises/fastReading/3.jpg" ,title: "Скорочтение", src: "fastReading"},
                {img: "/images/continent/exercises/miniSad/4.jpg" ,title: "Мини-сад", src: "miniSad"},
                {img: "/images/continent/exercises/psychologist/4.jpg" ,title: "Психолог", src: "psychologist"},
                {img: "/images/continent/exercises/creativeWindow/4.jpg" ,title: "Творческое окошко", src: "creativeWindow"}
            ]);
        },
        tagName: "div",
        className:"row",
        childView: exerciseView
    });
    return ExersisesView;
});