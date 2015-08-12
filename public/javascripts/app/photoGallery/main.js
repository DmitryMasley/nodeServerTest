define(["marionette", "underscore", "./views/composite"], function(Marionette, _, CompositeView){
    "use strict";
    var PhotoGalleryMain = Marionette.Controller.extend({
        initialize: function(config){
            this.collection = new Backbone.Collection(  [
                {"src":"/images/captain america.jpg", "description":"CAPTAIN AMERICA", "left":550, "top":25},
                {"src":"/images/hulk.jpeg", "description":"HULK", "left":25, "top":163},
                {"src":"/images/thor.jpg", "description":"THOR", "left":287, "top":163},
                {"src":"/images/black widow.jpg", "description":"BLACK WIDOW", "left":550, "top":163},
                {"src":"/images/hawkeye.jpg", "description":"HAWKEYE", "left":25, "top":300},
                {"src":"/images/loki.jpg", "description":"LOKI", "left":287, "top":300},
                {"src":"/images/captain america.jpg", "description":"CAPTAIN AMERICA", "left":550, "top":25},
                {"src":"/images/hulk.jpeg", "description":"HULK", "left":25, "top":163},
                {"src":"/images/thor.jpg", "description":"THOR", "left":287, "top":163},
                {"src":"/images/black widow.jpg", "description":"BLACK WIDOW", "left":550, "top":163},
                {"src":"/images/hawkeye.jpg", "description":"HAWKEYE", "left":25, "top":300},
                {"src":"/images/loki.jpg", "description":"LOKI", "left":287, "top":300},
                {"src":"/images/iron man.jpg", "description":"IRON MAN", "left":550, "top":300}
            ]);
            console.log(this.collection);
            this.view = new CompositeView({el: config.el ? config.el : "body" , collection:this.collection});
            this.view.render();
            var modal=$("#myModal");
            this.view.on("childview:show:me",
                function(childView, model){
                console.log(childView, model);
                    var img = '<img src="' + childView.model.get("src") + '" class="img-responsive"/>';
                    modal.modal();
                    modal.find('.modal-body').html(img);
                    modal.on('hidden.bs.modal', function(){
                        $(this).find('.modal-body').html('');
                    });
                });
        }
    });
    return PhotoGalleryMain;
});