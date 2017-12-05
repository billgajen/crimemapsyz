module.exports = function (grunt) {
	'use strict';

	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		less: {
			build: {
				files: {
					'public/css/compiled/master.css': 'public/css/less/master.less'
				}
			},
			options: {
				'compress': false,
				'ieCompat': true,
			}
		},		

		concat: {
			styles: {
				src: [
					'public/css/libs/normalize.css',
					'public/css/libs/flexboxgrid.min.css',
					'public/css/libs/loading-bar.css',
					'public/css/font-icons.css',
					'public/css/compiled/master.css'
				],
				dest: 'public/css/styles.css'
			},
			scripts: {
				src: [
					'public/js/libs/angular.js',
					'public/js/libs/angular-route.js',
					'public/js/libs/loading-bar.js',
					'<%= jshint.files %>'
				],
				dest: 'public/js/scripts.js'
			}
		},

		cssmin: {
			minify: {
				expand: false,
				src: 'public/css/styles.css',
				dest: 'dist/css/styles.min.css'
			}
		},

		imagemin: {
			static: {
				options: {
					optimizationLevel: 3
				},
				files: {
					//'dist/images/car.png': 'public/images/car.png',
					//'dist/images/two-point-0.png': 'public/images/two-point-0.png'
				}
			}
		},

		jshint: {
			files: [
				'/public/js/app.js',
				'/public/js/controllers/MainController.js',
				 //'/public/js/directives/main.js',
				'/public/js/modules/main.js'
			],
			options: {
				curly: true,
				eqeqeq: true,
				eqnull: true,
				browser: true,
				globals: {
					jQuery: true,
					console: true,
					module: true,
					document: true
				}
			}
		},

		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			build: {
				files: {
					'dist/js/scripts.min.js': [
						'public/js/scripts.js'
					]
				}
			}
		},

		watch: {
			stylesheets: {
				files: 'public/css/less/*.less',
				tasks: ['less', 'concat:styles']
			},
			scripts: {
				files: '<%= jshint.files %>',
				tasks: ['jshint', 'concat:scripts']
			}
		}
	});

	grunt.registerTask('dev', ['jshint', 'less', 'concat']);
	grunt.registerTask('default', ['jshint', 'less', 'concat', 'cssmin', 'imagemin', 'uglify']);
};