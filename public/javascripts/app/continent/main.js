define(["marionette", "underscore", "./views/mainLayout", "./views/main", "./views/pages/about", "./views/pages/discount",
        "./views/pages/gallery", "./views/pages/work", "./views/pages/contacts", "./views/pages/blahNativeSpeaker",
        "./views/pages/creativeWindow", "./views/pages/development", "./views/pages/engAdult", "./views/pages/engChild",
        "./views/pages/engCorp", "./views/pages/engNativeSpeaker", "./views/pages/engSchool", "./views/pages/fastReading",
        "./views/pages/miniSad", "./views/pages/prepSchool", "./views/pages/psychologist","./router", "bootstrap"],
    function(Marionette, _, LayoutView, MainView, About, Discount, Gallery, Work, Contacts, BlahNativeSpeaker, CreativeWindow,
             Development, EngAdult, EngChild, EngCorp, EngNativeSpeaker, EngSchool, FastReading, MiniSad, PrepSchool, Psychologist, Router){
    "use strict";
    var ContinentMain = Marionette.Controller.extend({
        initialize: function(){
            this.layout = new LayoutView({el: "body"});
            this.layout.render();
            _.bindAll(this,"showMain", "showAbout", "showDiscount", "showGallery", "showWork", "showContacts", "showBlahNativeSpeaker",
            "showCreativeWindow", "showDevelopment", "showEngAdult", "showEngChild", "showEngCorp", "showEngNativeSpeaker",
            "showEngSchool", "showFastReading", "showMiniSad", "showPrepSchool", "showPsychologist", "resetActive");
            this.listenTo(this.layout, 'showAbout', this.showAbout);
            this.listenTo(this.layout, 'showDiscount', this.showDiscount);
            this.listenTo(this.layout, 'showGallery', this.showGallery);
            this.listenTo(this.layout, 'showWork', this.showWork);
            this.listenTo(this.layout, 'showContacts', this.showContacts);
            this.listenTo(this.layout, 'showMain', this.showMain);

            var router = new Router({
                controller: this
            });
            if(Backbone.history){
                Backbone.history.start();
            }
        },
        resetActive: function(){
            this.layout.$el.find(".active").removeClass("active");
        },
        showMain: function(){
            this.resetActive();
            this.layout.mainView=new MainView();
            this.layout.main.show(this.layout.mainView);
            Backbone.history.navigate('');
            this.listenTo(this.layout.mainView.view, "childview:show:blahNativeSpeaker", this.showBlahNativeSpeaker);
            this.listenTo(this.layout.mainView.view, "childview:show:creativeWindow", this.showCreativeWindow);
            this.listenTo(this.layout.mainView.view, "childview:show:development", this.showDevelopment);
            this.listenTo(this.layout.mainView.view, "childview:show:engAdult", this.showEngAdult);
            this.listenTo(this.layout.mainView.view, "childview:show:engChild", this.showEngChild);
            this.listenTo(this.layout.mainView.view, "childview:show:engCorp", this.showEngCorp);
            this.listenTo(this.layout.mainView.view, "childview:show:engNativeSpeaker", this.showEngNativeSpeaker);
            this.listenTo(this.layout.mainView.view, "childview:show:engSchool", this.showEngSchool);
            this.listenTo(this.layout.mainView.view, "childview:show:fastReading", this.showFastReading);
            this.listenTo(this.layout.mainView.view, "childview:show:miniSad", this.showMiniSad);
            this.listenTo(this.layout.mainView.newsView, "childview:show:miniSad", this.showMiniSad);
            this.listenTo(this.layout.mainView.view, "childview:show:prepSchool", this.showPrepSchool);
            this.listenTo(this.layout.mainView.view, "childview:show:psychologist", this.showPsychologist);
        },
        showAbout: function(){
            this.resetActive();
            this.layout.main.show(new About());
            this.layout.ui.lnkAbout.parent().addClass("active");
            Backbone.history.navigate('about');
        },
        showDiscount: function(){
            this.resetActive();
            this.layout.main.show(new Discount());
            this.layout.ui.lnkDiscount.parent().addClass("active");
            Backbone.history.navigate('discount');
        },
        showGallery: function(){
            this.resetActive();
            this.layout.main.show(new Gallery());
            this.layout.ui.lnkGallery.parent().addClass("active");
            Backbone.history.navigate('gallery');
        },
        showWork: function(){
            this.resetActive();
            this.layout.main.show(new Work());
            this.layout.ui.lnkWork.parent().addClass("active");
            Backbone.history.navigate('work');
        },
        showContacts: function(){
            this.resetActive();
            this.layout.main.show(new Contacts());
            this.layout.ui.lnkContacts.parent().addClass("active");
            Backbone.history.navigate('contacts');
        },
        showBlahNativeSpeaker: function(){
            this.resetActive();
            this.layout.main.show(new BlahNativeSpeaker());
            Backbone.history.navigate('blahNativeSpeaker');
        },
        showCreativeWindow: function(){
            this.resetActive();
            this.layout.main.show(new CreativeWindow());
            Backbone.history.navigate('creativeWindow');
        },
        showDevelopment: function(){
            this.resetActive();
            this.layout.main.show(new Development());
            Backbone.history.navigate('development');
        },
        showEngAdult: function(){
            this.resetActive();
            this.layout.main.show(new EngAdult());
            Backbone.history.navigate('engAdult');
        },
        showEngChild: function(){
            this.resetActive();
            this.layout.main.show(new EngChild());
            Backbone.history.navigate('engChild');
        },
        showEngCorp: function(){
            this.resetActive();
            this.layout.main.show(new EngCorp());
            Backbone.history.navigate('engCorp');
        },
        showEngNativeSpeaker: function(){
            this.resetActive();
            this.layout.main.show(new EngNativeSpeaker());
            Backbone.history.navigate('engNativeSpeaker');
        },
        showEngSchool: function(){
            this.resetActive();
            this.layout.main.show(new EngSchool());
            Backbone.history.navigate('engSchool');
        },
        showFastReading: function(){
            this.resetActive();
            this.layout.main.show(new FastReading());
            Backbone.history.navigate('fastReading');
        },
        showMiniSad: function(){
            this.resetActive();
            this.layout.main.show(new MiniSad());
            Backbone.history.navigate('miniSad');
        },
        showPrepSchool: function(){
            this.resetActive();
            this.layout.main.show(new PrepSchool());
            Backbone.history.navigate('prepSchool');
        },
        showPsychologist: function(){
            this.resetActive();
            this.layout.main.show(new Psychologist());
            Backbone.history.navigate('psychologist');
        }
    });
    return ContinentMain;
});