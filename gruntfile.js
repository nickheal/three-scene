module.exports = function (grunt) {
    'use strict';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            options: {
                footer: '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today() %> */',
            },
            dist: {
                src: [
                    'code/assets/js/*/*/*.js',
                    'code/assets/js/*/*.js',
                    'code/assets/js/*.js'
                ],
                dest: 'code/assets/js.min/production.js'
            }
        },
        uglify: {
            my_target: {
                files: {
                    'code/assets/js.min/production.min.js': ['code/assets/js.min/production.js']
                }
            }
        },
        sass: {
            options: {
                sourceMap: true,
                style: 'compact'
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: 'code/assets/scss/',
                    src: ['*.scss'],
                    dest: 'code/assets/css/',
                    ext: '.css',
                    extDot: 'last'
                }]
            }
        },
        watch: {
            scripts: {
                files: ['code/assets/js/*/*/*.js',
                        'code/assets/js/*/*.js',
                        'code/assets/js/*.js'],
                tasks: ['concat'],
                options: {
                    spawn: false
                }
            },
            sass: {
                files: ['scss/*/*.scss',
                        'scss/*.scss'],
                tasks: ['scss'],
                options: {
                    spawn: false
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['concat', 'uglify', 'sass', 'watch']);
};