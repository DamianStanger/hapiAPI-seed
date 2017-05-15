module.exports = function (grunt) {

  // Load grunt tasks automatically
  require("load-grunt-tasks")(grunt);

  require("time-grunt")(grunt);

  // Project configuration.
  grunt.initConfig({
    "pkg": grunt.file.readJSON("package.json"),

    "shell": {
      "lab": {
        "command": "./node_modules/.bin/lab --verbose --colors -S -r console -o stdout -r html -o coverage.html 'test'"
        // "command": "./node_modules/.bin/lab --verbose --colors -I regeneratorRuntime,Observable,__core-js_shared__,core,System,_babelPolyfill,asap -S -r console -o stdout -r html -o coverage.html 'test'"
      }
    },

    "eslint": {
      "options": {
        "cache": true
      },
      "target": [
        "src/**/*.js",
        "test/**/*.js"
      ]
    },

    "watch": {
      "es6": {
        "files": ["src/**/*.js", "test/**/*.js"],
        "tasks": ["eslintNewer", "shell:lab"],
        "options": {
          "interrupt": true
        }
      },
      "test": {
        "files": [
          "src/**/*.js",
          "test/**/*.js"
        ],
        "tasks": ["test"]
      }
    }
  });

  // Watch task for speed!
  grunt.registerTask("eslintNewer", [
    "newer:eslint"
  ]);

  // Default task(s).
  grunt.registerTask("default", [
    "build",
    "test"
  ]);

  // Common build task
  grunt.registerTask("build", [
    "eslint"
  ]);

  grunt.registerTask("test", [
    "shell:lab"
  ]);

};
