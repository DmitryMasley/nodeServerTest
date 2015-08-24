define(["jquery", "underscore", "marionette", "tpl!../../templates/pages/gallery", "photoGallery"], function($, _, Marionette, template, PhotoGallery){
    "use strict";
    var Gallery = Marionette.ItemView.extend({
        template: template,
        ui: {
            office: "#collapseOne div.panel-body",
            halloween: "#collapseTwo div.panel-body",
            newYear: "#collapseThree div.panel-body",
            umbrellas: "#collapseFour div.panel-body",
            seaParty: "#collapseFive div.panel-body",
            quest: "#collapseSix div.panel-body",
            lessons: "#collapseSeven div.panel-body"
        },
        onRender: function(){
            this.photoGallery1 = new PhotoGallery({el:this.ui.office, collection:[
                {_id: "01", src: "/images/continent/gallery/office/IMG_2633.JPG", title: "portrait", description:"***"},
                {_id: "02", src: "/images/continent/gallery/office/IMG_2635.JPG", title: "landscape", description:"***"},
                {_id: "03", src: "/images/continent/gallery/office/IMG_2636.JPG", title: "landscape", description:"***"},
                {_id: "04", src: "/images/continent/gallery/office/IMG_2638.JPG", title: "landscape", description:"***"},
                {_id: "05", src: "/images/continent/gallery/office/IMG_2643.JPG", title: "landscape", description:"***"},
                {_id: "06", src: "/images/continent/gallery/office/IMG_2647.JPG", title: "landscape", description:"***"},
                {_id: "07", src: "/images/continent/gallery/office/IMG_2649.JPG", title: "landscape", description:"***"},
                {_id: "08", src: "/images/continent/gallery/office/IMG_2655.JPG", title: "landscape", description:"***"}
            ]});
            this.photoGallery2 = new PhotoGallery({el:this.ui.halloween, collection:[
                {_id: "01", src: "/images/continent/gallery/halloween/IMG_1958.JPG", title: "landscape", description:"***"},
                {_id: "02", src: "/images/continent/gallery/halloween/IMG_2030.JPG", title: "portrait", description:"***"},
                {_id: "03", src: "/images/continent/gallery/halloween/IMG_2037.JPG", title: "portrait", description:"***"},
                {_id: "04", src: "/images/continent/gallery/halloween/IMG_2055.JPG", title: "portrait", description:"***"},
                {_id: "05", src: "/images/continent/gallery/halloween/IMG_2061.JPG", title: "landscape", description:"***"}
            ]});
            this.photoGallery3 = new PhotoGallery({el:this.ui.newYear, collection:[
                {_id: "01", src: "/images/continent/gallery/newYear/IMG_2343.JPG", title: "landscape", description:"***"},
                {_id: "02", src: "/images/continent/gallery/newYear/IMG_2361.JPG", title: "landscape", description:"***"},
                {_id: "03", src: "/images/continent/gallery/newYear/IMG_2376.JPG", title: "landscape", description:"***"},
                {_id: "04", src: "/images/continent/gallery/newYear/IMG_2390.JPG", title: "portrait", description:"***"},
                {_id: "05", src: "/images/continent/gallery/newYear/IMG_2402.JPG", title: "portrait", description:"***"},
                {_id: "06", src: "/images/continent/gallery/newYear/IMG_2415.JPG", title: "portrait", description:"***"},
                {_id: "07", src: "/images/continent/gallery/newYear/IMG_2434.JPG", title: "landscape", description:"***"},
                {_id: "08", src: "/images/continent/gallery/newYear/IMG_2441.JPG", title: "landscape", description:"***"}
            ]});
            this.photoGallery4 = new PhotoGallery({el:this.ui.umbrellas, collection:[
                {_id: "01", src: "/images/continent/gallery/umbrellas/IMG_1833.JPG", title: "portrait", description:"***"},
                {_id: "02", src: "/images/continent/gallery/umbrellas/IMG_1873.JPG", title: "landscape", description:"***"},
                {_id: "03", src: "/images/continent/gallery/umbrellas/IMG_1890.JPG", title: "landscape", description:"***"},
                {_id: "04", src: "/images/continent/gallery/umbrellas/IMG_1914.JPG", title: "landscape", description:"***"},
                {_id: "05", src: "/images/continent/gallery/umbrellas/IMG_1923.JPG", title: "landscape", description:"***"},
                {_id: "06", src: "/images/continent/gallery/umbrellas/IMG_1924.JPG", title: "landscape", description:"***"},
                {_id: "07", src: "/images/continent/gallery/umbrellas/IMG_1930.JPG", title: "landscape", description:"***"},
                {_id: "08", src: "/images/continent/gallery/umbrellas/IMG_1937.JPG", title: "landscape", description:"***"}
            ]});

            this.photoGallery5 = new PhotoGallery({el:this.ui.seaParty, collection:[
                {_id: "01", src: "/images/continent/gallery/seaParty/IMG_2963.JPG", title: "landscape", description:"***"},
                {_id: "02", src: "/images/continent/gallery/seaParty/IMG_2967.JPG", title: "landscape", description:"***"},
                {_id: "03", src: "/images/continent/gallery/seaParty/IMG_2971.JPG", title: "portrait", description:"***"},
                {_id: "04", src: "/images/continent/gallery/seaParty/IMG_2991.JPG", title: "portrait", description:"***"},
                {_id: "05", src: "/images/continent/gallery/seaParty/IMG_3005.JPG", title: "portrait", description:"***"},
                {_id: "06", src: "/images/continent/gallery/seaParty/IMG_3013.JPG", title: "landscape", description:"***"},
                {_id: "07", src: "/images/continent/gallery/seaParty/IMG_3019.JPG", title: "landscape", description:"***"},
                {_id: "08", src: "/images/continent/gallery/seaParty/IMG_3023.JPG", title: "landscape", description:"***"},
                {_id: "09", src: "/images/continent/gallery/seaParty/IMG_3041.JPG", title: "portrait", description:"***"},
                {_id: "10", src: "/images/continent/gallery/seaParty/IMG_3058.JPG", title: "portrait", description:"***"},
                {_id: "11", src: "/images/continent/gallery/seaParty/IMG_3063.JPG", title: "portrait", description:"***"},
                {_id: "12", src: "/images/continent/gallery/seaParty/IMG_3090.JPG", title: "portrait", description:"***"},
                {_id: "13", src: "/images/continent/gallery/seaParty/IMG_3093.JPG", title: "portrait", description:"***"},
                {_id: "14", src: "/images/continent/gallery/seaParty/IMG_3148.JPG", title: "landscape", description:"***"}
            ]});
            this.photoGallery6 = new PhotoGallery({el:this.ui.quest, collection:[]});
            this.photoGallery7 = new PhotoGallery({el:this.ui.lessons, collection:[
                {_id: "01", src: "/images/continent/gallery/lessons/IMG_2431.JPG", title: "landscape", description:"***"}
            ]});
        }
    });
    return Gallery;
});