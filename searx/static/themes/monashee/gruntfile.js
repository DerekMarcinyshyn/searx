module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['js/searx_src/*.js'],
        dest: 'js/searx.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! monashee/searx.min.js | <%= grunt.template.today("dd-mm-yyyy") %> | https://github.com/asciimoo/searx */\n'
      },
      dist: {
        files: {
          'js/searx.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },
    jshint: {
      files: ['gruntfile.js', 'js/searx_src/*.js'],
      options: {
        reporterOutput: "",	    
        // options here to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },
    less: {
        development: {
            options: {
                paths: ["less/pointhi", "less/logicodev"]
                //banner: '/*! less/monashee/monashee.css | <%= grunt.template.today("dd-mm-yyyy") %> | https://github.com/asciimoo/searx */\n'
            },
            files: {"css/pointhi.css": "less/pointhi/monashee.less",
                    "css/logicodev.css": "less/logicodev/monashee.less"}
        },
        production: {
            options: {
                paths: ["less/pointhi", "less/logicodev"],
                //banner: '/*! less/monashee/monashee.css | <%= grunt.template.today("dd-mm-yyyy") %> | https://github.com/asciimoo/searx */\n',
                cleancss: true
            },
            files: {"css/pointhi.min.css": "less/pointhi/monashee.less",
                    "css/logicodev.min.css": "less/logicodev/monashee.less"}
        },
        /*
	// built with ./manage.sh styles
        bootstrap: {
            options: {
                paths: ["less/bootstrap"],
                cleancss: true
            },
            files: {"css/bootstrap.min.css": "less/bootstrap/bootstrap.less"}
        },
        */
    },
    watch: {
        scripts: {
            files: ['<%= jshint.files %>'],
            tasks: ['jshint', 'concat', 'uglify']
        },
        monashee_styles: {
            files: ['less/pointhi/**/*.less'],
            tasks: ['less:development', 'less:production']
        },
        bootstrap_styles: {
            files: ['less/bootstrap/**/*.less'],
            tasks: ['less:bootstrap']
        }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-less');

  grunt.registerTask('test', ['jshint']);

  grunt.registerTask('default', ['jshint', 'concat', 'uglify', 'less']);
  
  grunt.registerTask('styles', ['less']);

};
