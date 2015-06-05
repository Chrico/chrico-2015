module.exports = function (grunt) {
	var path = require('path'),
		THEME_DIR = './';

	// Load tasks.
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	// Project configuration.
	grunt.initConfig({
		debug       : {
			options: {
				// do not open node-inspector in Chrome automatically
				open: false
			}
		},
		svgmin      : {
			options : {
				plugins: [
					{
						removeViewBox: false
					}, {
						removeUselessStrokeAndFill: false
					}
				]
			},
			multiple: {
				files: [{
					expand: true,
					cwd   : THEME_DIR + 'assets/img/src/',
					src   : ['**/*.svg'],
					dest  : THEME_DIR + 'assets/img/'
				}]
			}
		},
		imagemin    : {
			dynamic: {
				files: [
					{
						expand: true,
						cwd   : THEME_DIR + 'assets/img/src/',
						src   : ['**/*.{gif,jpg,png}'],
						dest  : THEME_DIR + 'assets/img/'
					}
				]
			}
		},
		autoprefixer: {
			options: {
				browsers: [
					'Android >= 2.1',
					'Chrome >= 21',
					'iOS >= 3',
					'Explorer >= 8',
					'Firefox >= 17',
					'Opera >= 12.1',
					'Safari >= 5.0'
				]
			},
			theme  : {
				expand: true,
				cwd   : THEME_DIR,
				dest  : THEME_DIR,
				src   : [
					'assets/css/*.css',
					// Exceptions
					'!assets/css/*.min.css'
				]
			}
		},
		cssmin      : {
			theme: {
				options: {
					processImport: true
				},
				expand : true,
				cwd    : THEME_DIR,
				dest   : THEME_DIR,
				ext    : '.min.css',
				src    : [
					'assets/css/*.css',
					// Exceptions
					'!assets/css/*.min.css'
				]
			}
		},
		jshint      : {
			grunt: {
				src: ['Gruntfile.js']
			},
			theme: {
				expand: true,
				cwd   : THEME_DIR,
				src   : [
					'assets/js/*.js',
					// Exceptions
					'!assets/js/*.min.js'
				]
			}
		},
		concat      : {
			options : {
				separator: '\n'
			},
			jquery  : {
				src : THEME_DIR + 'assets/js/src/addon/*.js',
				dest: THEME_DIR + 'assets/js/addons.js'
			},
			polyfill: {
				src : THEME_DIR + 'assets/js/src/polyfill/*.js',
				dest: THEME_DIR + 'assets/js/polyfills.js'
			},
			theme   : {
				src : THEME_DIR + 'assets/js/src/theme/*.js',
				dest: THEME_DIR + 'assets/js/theme.js'
			}
		},
		sass        : {
			theme: {
				expand : true,
				cwd    : THEME_DIR + 'assets/scss/',
				dest   : THEME_DIR + 'assets/css/',
				ext    : '.css',
				options: {
					style      : 'expanded',
					lineNumbers: false,
					noCache    : true
				},
				src    : [
					'style.scss'
				]
			}
		},
		uglify      : {
			theme: {
				expand: true,
				screwIE8: true,
				cwd   : THEME_DIR,
				dest  : THEME_DIR,
				rename: function (destBase, destPath) {
					// Fix for files with mulitple dots
					destPath = destPath.replace(/(\.[^\/.]*)?$/, '.min.js');
					return path.join(destBase || '', destPath);
				},
				src   : [
					'assets/js/*.js',
					// Exceptions
					'!assets/js/*.min.js'
				]
			}
		},
		lineending  : {
			theme: {
				expand : true,
				cwd    : THEME_DIR,
				dest   : THEME_DIR,
				src    : [
					'assets/css/*.css'
				],
				options: {
					eol      : 'lf',
					overwrite: true
				}
			}
		},
		combine_mq  : {
			default_options: {
				expand: true,
				cwd   : THEME_DIR,
				src   : [
					'assets/css/*.css',
					// Exceptions
					'!assets/css/*.min.css'
				],
				dest  : './'
			}
		}

	});

	// Register tasks

	grunt.registerTask('javascript-testing', ['jshint']);
	grunt.registerTask('javascript', ['concat:jquery', 'concat:polyfill', 'concat:theme', 'uglify:theme']);
	grunt.registerTask('css', ['sass:theme', 'autoprefixer:theme', 'lineending:theme', 'combine_mq', 'cssmin:theme']);
	grunt.registerTask('image', ['imagemin', 'svgmin']);

	// Default task
	grunt.registerTask('production', ['javascript', 'css', 'imagemin']);
};
