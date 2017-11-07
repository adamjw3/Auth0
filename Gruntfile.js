module.exports = function (grunt) {
    grunt.initConfig({
        /*****************************************************/
        // YOU WILL ONLY NEED TO MAKE CHANGES TO THESE 4 TASKS
        /*****************************************************/
        concat: {
            // We don't need a separate frontend/backend task as the files we need to check will always be the same (any new template js files will need adding here)
            global: {
                src: ['src/resources/js/app/global/global-fe.js', 'src/resources/js/app/global/global-be.js'],
                dest: 'src/resources/js/global.js'
            },
            profile: {
                src: ['src/resources/js/app/profile/profile-fe.js', 'src/resources/js/app/profile/profile-be.js'],
                dest: 'src/resources/js/profile.js'
            },
            accordion: {
                src: ['src/resources/js/app/accordion/accordion-fe.js', 'src/resources/js/app/accordion/accordion-be.js'],
                dest: 'src/resources/js/accordion.js'
            },
            blogarticle: {
                src: ['src/resources/js/app/blogarticle/blogarticle-fe.js', 'src/resources/js/app/blogarticle/blogarticle-be.js'],
                dest: 'src/resources/js/blogarticle.js'
            },
            carousel: {
                src: ['src/resources/js/app/carousel/carousel-fe.js', 'src/resources/js/app/carousel/carousel-be.js'],
                dest: 'src/resources/js/carousel.js'
            },
            filterbar: {
                src: ['src/resources/js/app/filterbar/filterbar-fe.js', 'src/resources/js/app/filterbar/filterbar-be.js'],
                dest: 'src/resources/js/filterbar.js'
            },
            socialshare: {
                src: ['src/resources/js/app/socialshare/socialshare-fe.js', 'src/resources/js/app/socialshare/socialshare-be.js'],
                dest: 'src/resources/js/socialshare.js'
            },
            tabs: {
                src: ['src/resources/js/app/tabs/tabs-fe.js', 'src/resources/js/app/tabs/tabs-be.js'],
                dest: 'src/resources/js/tabs.js'
            },
            download: {
                src: ['src/resources/js/app/download/download-fe.js', 'src/resources/js/app/download/download-be.js'],
                dest: 'src/resources/js/download.js'
            }
        },
        tinypng: {
            // This is used to compress PNG & JPG files (you will need to add an api key)
            options: {
                apiKey: "vkIi9Fq9PzwmX71EEwbsxKimH6VUkf8L", //API key will need adding - see https://tinypng.com/developers
                summarize: true,
                stopOnImageError: true
            },
            compress: {
                expand: true,
                cwd: 'src/resources/images',
                src: ['**/*.png', '**/*.jpg'],
                dest: 'dist/resources/images'
            }
        },
        bake: {
            // Frontend bake task (any new flat template files will need adding here)
            frontend: {
                files: {
                    'dist/template-homepage.html': 'src/template-homepage.html',
                    'dist/template-profile.html': 'src/template-profile.html'
                }
            },
            // AppOffline css bake task
            appoffline: {
                files: {
                    'dist/_app_offline.html': 'src/_app_offline.html'
                }
            }
        },
        /*****************************************************/
        // YOU WILL NOT NEED TO EDIT ANYTHING BELOW
        /*****************************************************/
        sass: {
            // Frontend sass to css task
            frontend: {
                files: {
                    "dist/resources/css/site.css": "src/resources/sass/site.scss"
                }
            },
            // Backend sass to css task
            backend: {
                files: {
                    "resources/css/site.css": "src/resources/sass/site.scss"
                }
            },
            // Styleguide sass to css task
            styleguide: {
                files: {
                    "dist/resources/css/styleguide.css": "src/resources/sass/styleguide.scss"
                }
            },
            // AppOffline sass to css task
            appoffline: {
                files: {
                    "src/resources/appoffline/appoffline.css": "src/resources/sass/appoffline.scss"
                }
            }
        },
        cmq: {
            // Frontend combine media queries task
            frontend: {
                options: {
                    log: false
                },
                files: {
                    'dist/resources/css': ['dist/resources/css/site.css']
                }
            },
            // Backend combine media queries task
            backend: {
                options: {
                    log: false
                },
                files: {
                    'resources/css': ['resources/css/site.css']
                }
            }
        },
        postcss: {
            // Post CSS task
            // Add/remove CSS prefixes
            options: {
                map: false,
                processors: [
                    require('autoprefixer')({
                        browsers: ['last 3 versions', 'Safari 8'] // Will check 3 last versions of each browser
                    })
                ]
            },
            frontend: {
                src: 'dist/resources/css/site.css'
            },
            backend: {
                src: 'resources/css/site.css'
            }
        },
        cssmin: {
            // Frontend css minification
            frontend: {
                files: [{
                    expand: true,
                    cwd: 'dist/resources/css',
                    src: ['site.css'],
                    dest: 'dist/resources/css',
                    ext: '.min.css'
                }]
            },
            // Backend css minification
            backend: {
                files: [{
                    expand: true,
                    cwd: 'resources/css',
                    src: ['*.css', '!*.min.css'],
                    dest: 'resources/css',
                    ext: '.min.css'
                }]
            },
            // AppOffline css minification
            appoffline: {
                files: [{
                    expand: true,
                    cwd: 'src/resources/appoffline',
                    src: ['*.css', '!*.min.css'],
                    dest: 'src/resources/appoffline',
                    ext: '.min.css'
                }]
            }
        },
        imagemin: {
            // This is used to compress GIF & SVG files
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'src/resources/images',
                    src: ['**/*.gif', '**/*.svg'],
                    dest: 'dist/resources/images'
                }]
            }
        },
        uglify: {
            // The frontend js minification will minify the global & template js files & put them in the relevant folder
            frontend: {
                options: {
                    sourceMap: true
                },
                files: [{
                    expand: true,
                    src: '*.js',
                    dest: 'dist/resources/js',
                    cwd: 'src/resources/js',
                    ext: '.min.js',
                    extDot: 'last'
                }]
            },
            // The plugins js minification will minify all plugins
            plugins: {
                options: {
                    sourceMap: true
                },
                files: [{
                    expand: true,
                    src: '**/*.js',
                    dest: 'dist/resources/js/plugins',
                    cwd: 'src/resources/js/plugins',
                    ext: '.min.js',
                    extDot: 'last'
                }]
            },
            // The backend js minification will minify the global & template js files & put them in the relevant folder
            backend: {
                options: {
                    sourceMap: true
                },
                files: [{
                    expand: true,
                    src: '*.js',
                    dest: 'resources/js',
                    cwd: 'src/resources/js',
                    ext: '.min.js',
                    extDot: 'last'
                }]
            }
        },
        jshint: {
            // We don't need a separate frontend/backend task as the files we need to check will always be the same
            files: ['src/resources/js/app/**/*.js'],
            options: {
                jshintrc: '.jshintrc'
            }
        },
        browserSync: {
            // Browser sync task (you won't need to change this task)
            bsFiles: {
                src :[
                    'dist/resources/css/*.css',
                    'dist/resources/js/*.js',
                    'dist/*.html'
                ]
            },
            options: {
                watchTask: true,
                server: {
                    baseDir: "./dist/"
                }
            }
        }
    });

    // Load all our packages
    grunt.loadNpmTasks('grunt-newer');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-combine-media-queries');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-bake');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-tinypng');
    grunt.loadNpmTasks('grunt-postcss');

    // Configuration for frontend tasks.
    grunt.registerTask('frontend', function() {
        var config = {
            css: {
                files: ['src/resources/sass/**/*.scss', 'src/resources/bootstrap/*.scss', 'dist/resources/css/*.css'],
                tasks: ['sass:frontend', 'cmq:frontend', 'postcss:frontend', 'cssmin:frontend'],
                options: {
                    nospawn: true
                }
            },
            js: {
                files: ['src/resources/js/app/**/*.js'],
                tasks: ['concat', 'uglify:frontend'],
                options: {
                    nospawn: true
                }
            },
            images: {
                files: ['src/resources/images/**/*.{png,jpg,gif,svg}'],
                tasks: ['newer:imagemin', 'newer:tinypng'],
                options: {
                    nospawn: true
                }
            },
            html: {
                files: ['src/**/*.html'],
                tasks: ['bake:frontend'],
                options: {
                    nospawn: true
                }
            }
        };

        grunt.config('watch', config);
        grunt.task.run('browserSync', 'watch');
    });

    // Configuration for js plugins tasks - this needs to be called manually.
    grunt.registerTask('jsplugins', ['uglify:plugins']);

    // Configuration for styleguide tasks - this needs to be called manually.
    grunt.registerTask('styleguide', ['sass:styleguide']);

    // Configuration for appoffline tasks - this needs to be called manually.
    grunt.registerTask('appoffline', ['sass:appoffline', 'cssmin:appoffline', 'bake:appoffline']);

    // Configuration for backend tasks.
    grunt.registerTask('backend', function() {
        var config = {
            css: {
                files: ['src/resources/sass/*.scss', 'src/resources/bootstrap/*.scss', 'resources/css/*.css'],
                tasks: ['sass:backend', 'cmq:backend', 'postcss:backend', 'cssmin:backend'],
                options: {
                    nospawn: true
                }
            },
            js: {
                files: ['src/resources/js/app/**/*.js'],
                tasks: ['jshint', 'concat', 'uglify:backend'],
                options: {
                    nospawn: true
                }
            }
        };

        grunt.config('watch', config);
        grunt.task.run('watch');
    });
};
