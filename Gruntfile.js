'use strict';

/*jshint camelcase:false*/

module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({


    pkg: grunt.file.readJSON('package.json'),

    autoprefixer: {
      options: {
        browsers: ['> 1%'],
        cacade: true
      },
      main: {
        src: 'lib/style.css'
      }
    },

    babel: {
      options: {
        stage: 0
      },
      all: {
        files: [{
          expand: true,
          cwd: 'src',
          src: ['**/*.js'],
          dest: 'lib'
        }]
      }
    },

    jade: {
      main: {
        options: {
          pretty: true,
          timestamp: '<%= grunt.template.today("yyyy-mm-dd") %> <%= new Date().getTime() %>'
        },
        files: {
          'lib/index.html': ['src/index.jade']
        }
      }
    },

    sass: {
      main: {
        // options: {
        //   style: 'expanded',
        //   noCache: true,
        //   sourcemap: 'none'
        // },
        files: {
          'lib/style.css' : 'src/style.scss'
        }
      }
    },

    uglify: {
      main: {
        files: {
          'lib/happy-birthday.min.js': [
            'deps/lo66er/dist/Logger.js',
            'deps/angular/angular.js',
            'deps/jquery/dist/jquery.js',
            'deps/move.js/move.js',
            'lib/happy-birthday.js'
          ]
        }
      }
    },

    watch: {
      css: {
        files:'**/*.scss',
        tasks: ['sass', 'autoprefixer']
      },
      jade: {
        files: '**/*.jade',
        tasks: ['jade']
      },
      js: {
        files: 'src/**/*.js',
        tasks: ['babel'/*, 'uglify'*/]
      }
    },

  });

  grunt.registerTask('default', ['watch']);
  grunt.registerTask('build', ['sass', 'autoprefixer', 'jade', 'babel'/*, 'uglify'*/]);

};
