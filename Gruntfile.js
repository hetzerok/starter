module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sprite: {
            all: {
                src: 'src/icon/*.png',
                dest: 'src/img/sprite.png',
                destCss: 'src/css/sprite.less',
                padding: 10,
                engineOpts: {
                    'imagemagick': true
                },
                'cssFormat': 'less',
                'algorithm': 'binary-tree'
            }
        },
        svgstore: {
            options: {
                prefix: 'icon-',
                svg: {
                    viewBox: '0 0 100 100',
                    xmlns: 'http://www.w3.org/2000/svg',
                    style: 'display:none'
                },
                cleanup: ['fill', 'class', 'style'],
                cleanupdefs: true
            },
            all: {
                files: {
                    'src/img/sprite.svg': ['src/svgs/*.svg']
                }
            }
        },
        less: {
            dev: {
                files: {
                    "src/css/styles.css": ['src/css/styles.less']
                }
            }
        },
        autoprefixer: {
            options: {
                browsers: ['last 2 versions', 'ie 9']
            },
            all: {
                src: 'src/css/styles.css'
            }
        },
        cssmin: {
            options: {
                banner: '/* Created by Hetzerok */'
            },
            all: {
                files: {
                    'out/css/styles.css': ['src/css/styles.css']
                }
            }
        },
        uglify: {
            all: {
                options: {
                    beautify: true
                },
                files: {
                    'out/js/all.min.js': ['src/js/plugins.js', 'src/js/main.js']
                }
            }
        },
        copy: {
            main: {
                expand: true,
                src: './*.html',
                dest: 'out/',
                options: {
                    process: function (content, srcpath) {
                        var str = content;
                        str =  content.replace(/src\/css/g,"css");
                        str = str.replace(/src\/img/g, "img");
                        str = str.replace("<script src=\"src/js/plugins.js\"></script>", "");
                        str = str.replace("<script src=\"src/js/main.js\"></script>", "<script src=\"js/all.min.js\"></script>");
                        str = str.replace(/src\/js/g, "js");
                        return str;
                    }
                }
            },
            js: {
                expand: true,
                cwd: 'src/js/',
                src: 'vendor/**',
                dest: 'out/js/'
            },
            fonts: {
                expand: true,
                cwd: 'src/',
                src: 'fonts/**',
                dest: 'out/'
            }
        },
        imagemin: {
            options: {
                optimizationLevel: 3
            },
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'src/img/',
                    src: ['**/*.{png,jpg,gif,svg}'],
                    dest: 'out/img/'
                }]
            }
        }
    });
    grunt.loadNpmTasks('grunt-spritesmith');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-newer');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-svgstore');
    grunt.registerTask('svg', ['svgstore']);
    grunt.registerTask('default', ['sprite', 'svg', 'newer:less', 'autoprefixer', 'newer:cssmin', 'newer:uglify', 'copy', 'newer:imagemin']);
};