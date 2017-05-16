module.exports = function (grunt) {

  require("load-grunt-tasks")(grunt);
  require("time-grunt")(grunt);

  grunt.initConfig({
    "pkg": grunt.file.readJSON("package.json"),

    "shell": {
      "lab": {
        "command": "./node_modules/.bin/lab --verbose --colors -S -r console -o stdout -r html -o coverage.html --threshold 90"
      },
      "dredd": {
        "command": "./runDredd.sh"
      }
    },

    "eslint": {
      "options": {
        "cache": true
      },
      "target": [
        "src/**/*.js",
        "test/**/*.js",
        "*.js"
      ]
    }
  });

  grunt.registerTask("default", [
    "build",
    "testAll"
  ]);

  grunt.registerTask("build", [
    "eslint"
  ]);

  grunt.registerTask("test", [
    "shell:lab"
  ]);

  grunt.registerTask("testAll", [
    "test",
    "shell:dredd"
  ]);
};
