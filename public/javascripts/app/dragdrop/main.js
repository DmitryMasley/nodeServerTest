define(["marionette", "./views/simpleView"], function(Marionette, SimpleView){
    "use strict";
    var DragDropMain = Marionette.Controller.extend({
        initialize: function(config){
            this.view = new SimpleView(config);
            this.view.render();
        }
    });
    return DragDropMain;
});