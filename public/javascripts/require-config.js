require.config({
    baseUrl:"javascripts",
    packages:[
        {
            name: "users",
            location: "app/users"
        },
        {
            name: "dragdrop",
            location:"app/dragdrop"
        }
    ],
    paths:{
        "jquery": "vendor/jquery/jquery",
        "marionette": "vendor/backbone.marionette/backbone.marionette",
        "backbone": "vendor/backbone.marionette/backbone",
        "underscore": "vendor/backbone.marionette/underscore",
        "json2": "vendor/backbone.marionette/json2",
        "tpl": "vendor/requirejs/tpl",
        "text": "vendor/requirejs/text",
        "domReady": "vendor/requirejs/domReady",
        "helpers": "lib/helpers",
        "app" : "app/app"
    },
    shim: {
        "backbone": {
            deps:["underscore", "jquery", "json2"],
            exports:"Backbone"
        },
        'underscore': {
            exports: '_'
        }
    },
    tpl: {
        extension: '.tpl'
    }
});