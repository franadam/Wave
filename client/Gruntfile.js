/* eslint-disable no-undef */
module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-stylelint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-postcss');

  grunt.initConfig({
    eslint: {
      options: {
        configFile: '.eslintrc.json',
        fix: true,
      },
      target: ['src/**/*.js'],
    },
    stylelint: {
      options: {
        configFile: '.stylelintrc.json',
        fix: true,
      },
      all: ['src/**/*.css'],
    },
    postcss: {
      options: {
        map: false,
        processors: [
          //require('pixrem')(), // add fallbacks for rem units
          require('autoprefixer')(), // add vendor prefixes
          //require('cssnano')() // minify the result
        ],
      },
      dist: {
        src: 'src/components/**/*.css',
      },
    },
    watch: {
      files: ['Gruntfile.js', 'src/**/*.js', 'src/**/*.css'],
      tasks: ['eslint'],
    },
  });

  grunt.registerTask('default', ['eslint', 'postcss']);
};
