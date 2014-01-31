var path = require('path');

var rendrDir = 'node_modules/rendr';
var rendrModulesDir = rendrDir + '/node_modules';

module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jade: {
      compile: {
        options: {
          processName: function(filename) {
            return filename.replace('app/templates/', '').replace(/(.jade)/, '');
          },
          client: true,
          node: true
        },
        src: ["app/templates/**/*.jade"],
        dest: "app/templates/compiledTemplates.js",
      }
    },

    browserify: {
      options: {
        debug: true,
        alias: [
          'assets/vendor/jade_runtime.js:jade',
          'node_modules/rendr-jade/index.js:rendr-jade'
        ],
        aliasMappings: [
          {
            cwd: 'app/',
            src: ['**/*.js'],
            dest: 'app/'
          }
        ],
        shim: {
          jquery: {
            path: 'assets/vendor/jquery-1.11.0.min.js',
            exports: '$'
          }
        }
      },
      app: {
        src: [ 
          'app/**/*.js'
        ],
        dest: 'public/mergedAssets.js'
      },
      tests: {
        src: [
          'test/app/**/*.js'
        ],
        dest: 'public/testBundle.js'
      }
    },

    uglify: {
      app: {
        files: {
          'public/mergedAssets.min.js': [ 'public/mergedAssets.js' ]
        }
      }
    }
  });

  grunt.registerTask('runNode', function () {
    grunt.util.spawn({
      cmd: 'node',
      args: ['./node_modules/nodemon/nodemon.js', 'index.js'],
      opts: {
        stdio: 'inherit'
      }
    }, function () {
      grunt.fail.fatal(new Error("nodemon quit"));
    });
  });

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('compile', ['jade', 'browserify:app','uglify']);

  // Run the server and watch for file changes
  grunt.registerTask('server', ['runNode', 'compile']);

  // Default task(s).
  grunt.registerTask('default', ['server']);
};
