// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var cssnano = require('gulp-cssnano');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');

// Compile Our Sass
gulp.task('sass-dist', function() {
    gulp.src('source/sass/modularity-interactive-map.scss')
            .pipe(plumber())
            .pipe(sass())
            .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
            .pipe(rename({suffix: '.min'}))
            .pipe(cssnano())
            .pipe(gulp.dest('dist/css'));
});

gulp.task('sass-dev', function() {
    gulp.src('source/sass/modularity-interactive-map.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
        .pipe(rename({suffix: '.dev'}))
        .pipe(gulp.dest('dist/css'));
});

// Concatenate & Minify JS
gulp.task('scripts-dist', function() {
    gulp.src([
            '!source/js/admin/*.js',
            'source/js/vendor/*.js',
            'source/js/**/*.js',
        ])
        .pipe(concat('modularity-interactive-map.dev.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(rename('modularity-interactive-map.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('scripts-dist-admin', function() {
    gulp.src([
            'node_modules/spectrum-colorpicker/spectrum.js',
            'source/js/admin/*.js',
        ])
        .pipe(concat('modularity-interactive-map-admin.dev.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(rename('modularity-interactive-map-admin.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('source/js/**/*.js', ['scripts-dist', 'scripts-dist-admin']);
    gulp.watch('source/sass/**/*.scss', ['sass-dist', 'sass-dev']);
});

// Default Task
gulp.task('default', ['sass-dist', 'sass-dev', 'scripts-dist', 'scripts-dist-admin', 'watch']);

