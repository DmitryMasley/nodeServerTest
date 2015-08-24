define(["jquery", "underscore", "marionette", "tpl!../templates/mainLayout", "bootstrap"], function($, _, Marionette, template){
    "use strict";
    var LayoutView = Marionette.LayoutView.extend({
        initialize: function(config){
            this.el=config.el;
        },
        template: template,
        regions: {
            main: "#mainRegion"
        },
        ui: {
            lnkAbout: "a.about",
            lnkDiscount: "a.discount",
            lnkGallery: "a.gallery",
            lnkJobs: "a.jobs",
            lnkContacts: "a.contacts",
            lnkMain: "a.navbar-brand"
        },
        triggers: {
            'click @ui.lnkAbout': {
                event: 'showAbout',
                preventDefault: true, // this param is optional and will default to true
                stopPropagation: false
            },
            'click @ui.lnkDiscount': {
                event: 'showDiscount',
                preventDefault: true, // this param is optional and will default to true
                stopPropagation: false
            },
            'click @ui.lnkGallery': {
                event: 'showGallery',
                preventDefault: true, // this param is optional and will default to true
                stopPropagation: false
            },
            'click @ui.lnkJobs': {
                event: 'showJobs',
                preventDefault: true, // this param is optional and will default to true
                stopPropagation: false
            },
            'click @ui.lnkContacts': {
                event: 'showContacts',
                preventDefault: true, // this param is optional and will default to true
                stopPropagation: false
            },
            'click @ui.lnkMain': {
                event: 'showMain',
                preventDefault: true, // this param is optional and will default to true
                stopPropagation: false
            }
        }
    });
    return LayoutView;
});