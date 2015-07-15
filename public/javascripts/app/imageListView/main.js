define(["jquery","backbone","underscore"], function($,Backbone,_){

    var Image = Backbone.Model.extend({
        defaults: {
            src:"/images/iron man.jpg",
            description:"IRON MAN",
            id:"image"
        }
    });

    var ImageList = Backbone.Collection.extend({
        model: Image,
        url: '/images.ajax',
        parse: function(data){return data.data;}
    });

    var ImageView = Backbone.View.extend({
        tagName: 'div', // name of tag to be created
        initialize: function(){
            _.bindAll(this, 'render'); // every function that uses 'this' as the current object should be in here
            this.model.bind('change', this.render);
        },
        render: function(){
            var img = $("<img/>", // Create a new <img> element
                {src:this.model.get('src'),
                description:this.model.get('description')
                });
            $(this.el).append(img);
            $(this.el).attr({draggable:"true",
                            id:this.model.get("id")
                            });
            $(this.el).addClass("dd-item");
            $(this.el).css({'zIndex':'100'});
            return this; // for chainable calls, like .render().el
        }
    });

    var ImageListView = Backbone.View.extend({
        el: $('body'), // el attaches to existing element
        events: {
            'click button#add': 'addImage'
        },
        initialize: function(){
            _.bindAll(this, 'render', 'addImage', 'appendImage'); // every function that uses 'this' as the current object should be in here

            this.collection = new ImageList();
            this.collection.bind('add', this.appendImage); // collection event binder
            this.counter = 0;
            this.render();
        },
        render: function(){
            var self = this;
            $(this.el).append("<button id='add'>Add image</button>");
            _(this.collection.models).each(function(image){ // in case collection is not empty
                self.appendImage(image);
            }, this);
        },
        addImage: function(){
            this.counter++;
            var image = new Image();
            image.set({
                id: image.get('id') + this.counter // modify item defaults
            });
            this.collection.add(image);
        },
        appendImage: function(image){
            var imageView = new ImageView({
                model: image
            });
            $(this.el).append(imageView.render().el);
        }
    });

return ImageListView;

});