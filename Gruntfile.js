module.exports = function( grunt ) {
	var path = require( 'path' ),
		THEME_DIR = './';

	// Load tasks.
	require( 'matchdep' ).filterDev( 'grunt-*' ).forEach( grunt.loadNpmTasks );

	// Project configuration.
	grunt.initConfig( {
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
				files: [
					{
						expand: true,
						cwd   : THEME_DIR + 'assets/img/src/',
						src   : [ '**/*.svg' ],
						dest  : THEME_DIR + 'assets/img/'
					}
				]
			}
		},
		imagemin    : {
			dynamic: {
				files: [
					{
						expand: true,
						cwd   : THEME_DIR + 'assets/img/src/',
						src   : [ '**/*.{gif,jpg,png}' ],
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
			dist   : {
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
			dist: {
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
				src: [ 'Gruntfile.js' ]
			},
			dist : {
				expand: true,
				cwd   : THEME_DIR,
				src   : [
					'assets/js/*.js',
					// Exceptions
					'!assets/js/*.min.js'
				]
			}
		},
		browserify : {
			dist: {
				options: {
					transform: [
						[ "babelify", { loose: "all" } ]
					]
				},
				files  : {
					"./assets/js/build.js": "./assets/js/src/index.js"
				}
			}
		},
		sass        : {
			dist: {
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
					'style.scss',
					'editor-style.scss'
				]
			}
		},
		uglify      : {
			dist: {
				expand: true,
				cwd   : THEME_DIR,
				dest  : THEME_DIR,
				rename: function( destBase, destPath ) {
					// Fix for files with mulitple dots
					destPath = destPath.replace( /(\.[^\/.]*)?$/, '.min.js' );
					return path.join( destBase || '', destPath );
				},
				src   : [
					'assets/js/*.js',
					// Exceptions
					'!assets/js/*.min.js'
				]
			}
		},
		lineending  : {
			dist: {
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

	} );

	// Register tasks

	grunt.registerTask( 'javascript-testing', [ 'jshint' ] );
	grunt.registerTask( 'javascript', [
		'browserify',
		'uglify'
	] );
	grunt.registerTask( 'css', [
		'sass',
		'autoprefixer',
		'lineending',
		'combine_mq',
		'cssmin'
	] );
	grunt.registerTask( 'image', [ 'imagemin', 'svgmin' ] );

	// Default task
	grunt.registerTask( 'production', [ 'javascript', 'css', 'imagemin' ] );
};
