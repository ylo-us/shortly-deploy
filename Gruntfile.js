module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';',
      },
      basic_and_extras: {
        files: {
          'public/dist/libraries.js': ['public/lib/jquery.js', 'public/lib/underscore.js', 
                                      'public/lib/backbone.js', 'public/lib/handlebars.js'],                                 
          'public/dist/client.js': ['public/client/*.js']
        }
      },
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/**/*.js']
      }
    },

    nodemon: {
      dev: {
        script: 'server.js'
      }
    },

    uglify: {
      options: {
        mangle: false
      },
      myTarget: {
        files: {
          'public/dist/client.min.js': ['public/dist/client.js'],
          'public/dist/libraries.min.js': ['public/dist/libraries.js']
        }
      }
    },

    eslint: {
      target: [
        // Add list of files to lint here
        'public/client/*.js',
        'server-config.js',
        'server.js',
        'app/**/*.js',
        'lib/utility.js'
      ]
    },

    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: 'release/css',
          src: ['*.css', '!*.min.css'],
          dest: 'release/css',
          ext: '.min.css'
        }]
      }
    },

    watch: {
      scripts: {
        files: [
          'public/client/**/*.js',
          'public/lib/**/*.js',
        ],
        tasks: [
          'concat',
          'uglify'
        ]
      },
      css: {
        files: 'public/*.css',
        tasks: ['cssmin']
      }
    },

    commitStatement: 'Add changes',
    shell: {
      prodServer: {
        command: [
          'git add .',
          'git commit -m "<%= commitStatement %>"',
          'git push live master'
        ].join('&&')
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.registerTask('server-dev', function (target) {
    grunt.task.run([ 'nodemon', 'watch' ]);
  });

  ////////////////////////////////////////////////////
  // Main grunt tasks
  ////////////////////////////////////////////////////

  // grunt.registerTask('eslint', ['']);

  grunt.registerTask('test', function() {
    var msg = 'Do something...';
    grunt.log.write(msg);
    grunt.task.run(['mochaTest']);
    // try {
    //   grunt.log.ok();
    //   grunt.log.error()
    // } catch (e) {
    //   grunt.log.or.write(msg).error().error(e.message);
    //   grunt.fail.fatal('Something went Wrong!!!!');
    // }
  });

  // grunt.registerTask('test', function() {
  //   grunt.task.run(['mochaTest']);
  //   if (failureOfSomeKind) {
  //     grunt.log.error('error!!!!!!!!!!');
  //   }
  //   if (ifErrors) { 
  //     return false; 
  //   }
  //   grunt.log.writeln('Success!!!!!!!!!!');
  // });

  // grunt.registerTask('build', [
  //   'concat', 
  //   'uglify'
  // ]);

  grunt.registerTask('build', function() {
    var msg = 'Do something...';
    grunt.log.write(msg);
    try {
      grunt.task.run(['concat']);
      grunt.log.ok();
    } catch (e) {
      grunt.log.or.write(msg).error().error(e.message);
      grunt.fail.warn('Something went Wrong!!!!');
    }
    // grunt.fail.fatal('error!!!!!!!!!!!!');
    grunt.task.run(['uglify']);
  });


  grunt.registerTask('upload', function(n) {
    if (grunt.option('prod')) {
      // add your production server task here
    } else {
      grunt.task.run([ 'server-dev' ]);
    }
  });

  grunt.registerTask('deploy', [
    // add your deploy tasks here
  ]);


};
