module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sprite: {
            all: {
                src: 'src/icon/*.png',
                dest: 'src/img/sprites.png',
                destCss: 'src/css/sprites.less',
                padding: 10,
                engineOpts: {
                    'imagemagick': true
                },
                'cssFormat': 'less',
                'algorithm': 'binary-tree'
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
                src: '*.html',
                dest: 'out/',
                options: {
                    process: function (content, srcpath) {
                        var str = content;
                        str =  content.replace(/src\/css/g,"css");
                        str = str.replace(/src\/img/g, "img");
                        str = str.replace("<script src=\"src/js/plugins.js\"></script>", "");
                        str = str.replace("<script src=\"src/js/main.js\"></script>", "<script src=\"js/all.min.js\"></script>");
                        str = str.replace(/src\/js/g, "js");;
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
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'src/img/',
                    src: ['**/*.{png,jpg,gif}'],
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
    grunt.registerTask('default', ['sprite', 'newer:less', 'autoprefixer', 'newer:cssmin', 'newer:uglify', 'copy', 'newer:imagemin']);
};