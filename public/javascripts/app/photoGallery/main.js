define(["marionette", "underscore", "./views/composite"], function(Marionette, _, CompositeView){
    "use strict";
    var PhotoGalleryMain = Marionette.Controller.extend({
        initialize: function(config){
            var Photos = Backbone.Collection.extend({
                url: '/images.ajax',
                parse: function(data){return data.data;}
            });
            var self=this;
            var total, fragm;
            self.config=config;
            this.collection = new Photos();
            this.collection.fetch({success: function(){
                self.view = new CompositeView({el: self.config.el ? self.config.el : "body" , collection:self.collection});
                self.view.render();
                var modal=$("#myModal");
                if (!!self.config && !!self.config.item &&(0<=self.config.item)&&(self.collection.length>self.config.item)){
                    showImg(_.values(self.view.children._views)[self.config.item]);
                }
                modal.on('click', 'a.controls', function(){
                    var index = $(this).attr('href');
                    modal.find('.modal-body img').attr('src', self.collection.models[index].escape("src"));
                    modal.find('.modal-body b.imgDescription').text(self.collection.models[index].escape("description"));
                    renderLinks(index,total);
                    return false;
                });
                modal.on("hide.bs.modal", function(){
                    Backbone.history.navigate(fragm);
                });
                function renderLinks(index, total){
                    if(total === (parseInt(index) + 1)){
                        modal.find('a.next').hide();
                    }else{
                        modal.find('a.next').show().attr('href', parseInt(index) + 1);
                    }
                    if(parseInt(index) === 0){
                        modal.find('a.previous').hide();
                    }else{
                        modal.find('a.previous').show().attr('href', parseInt(index) - 1);
                    }
                    Backbone.history.navigate(""+fragm+"/"+index);
                }
                function showImg(childView){
                    fragm=Backbone.history.getFragment();
                    total=childView.model.collection.models.length;
                    var index = childView._index;
                    modal.modal();
                    modal.find('.modal-body img').attr("src", childView.model.collection.models[index].escape("src"));
                    modal.find('.modal-body b.imgDescription').text(childView.model.collection.models[index].escape("description"));
                    renderLinks(index,total);
                }
                self.view.on("childview:show:me",showImg);
            }, error: function(){}});
        }
    });
    return PhotoGalleryMain;
});