require.config({
    baseUrl:"javascripts",
    packages:[
        {
            name: "users",
            location: "app/users"
        },
        {
            name: "shoppingCart",
            location: "app/shoppingCart"
        },
        {
            name: "continent",
            location: "app/continent"
        },
        {
            name: "photoGallery",
            location: "app/photoGallery"
        },
        {
            name: "dragdrop",
            location:"app/dragdrop"
        },
        {
            name: "imageCollection",
            location:"app/imageCollection"
        },
        {
            name: "slideShow",
            location:"app/slideShow"
        },
        {
            name: "stuff",
            location:"app/stuff"
        }
    ],
    paths:{
        "jquery": "vendor/jquery/jquery",
        "marionette": "vendor/backbone.marionette/backbone.marionette",
        "backbone": "vendor/backbone.marionette/backbone",
        "underscore": "vendor/backbone.marionette/underscore",
        "bootstrap": "vendor/bootstrap/js/bootstrap",
        "validate": "vendor/validate/jquery.validate",
        "json2": "vendor/backbone.marionette/json2",
        "tpl": "vendor/requirejs/tpl",
        "text": "vendor/requirejs/text",
        "domReady": "vendor/requirejs/domReady",
        "helpers": "lib/helpers",
        "ajax": "lib/ajax",
        "app" : "app/app"
    },
    shim: {
        "backbone": {
            deps:["underscore", "jquery", "json2"],
            exports:"Backbone"
        },
        "bootstrap": {
            deps:["jquery"]
        },
        "validate": {
            deps:["jquery"]
        },
        'underscore': {
            exports: '_'
        }
    },
    tpl: {
        extension: '.tpl'
    }
});