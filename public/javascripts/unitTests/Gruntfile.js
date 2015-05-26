module.exports = function(grunt){
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        mocha: {
            test: {
                src: ["index.html"],
                run: true,
                options : {
                    log: 'true',
                    reporter: 'Spec'
                },
                dest :  "index-output.xml"
            }
        },
        watch: {
            all : {
                files: ['../lib/**/*.js', "../app/**/*.js", "./spec/**/*.js"],
                tasks : ["mocha:test"]
            }
        }
    });
    grunt.loadNpmTasks("grunt-mocha");
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask("default", ["mocha:test"]);
};