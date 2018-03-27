var gulp = require('gulp'),
    connect = require('gulp-connect'),
    sass = require('gulp-sass'),
    imagemin = require('gulp-imagemin'),
    watch = require('gulp-watch');
    autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', function() {
    gulp.src('./src/css/scss/**/*.scss')
        .pipe(sass({
            includePaths: require('node-normalize-scss').includePaths
        }).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions','ie >= 10'],
            cascade: true
            }))
        .pipe(gulp.dest('./build/css/'))
        .pipe(connect.reload());
});

gulp.task('connect', function() {
    connect.server({
        port: 1703,
        root: './build',
        livereload: true
    });
});

gulp.task('html', function () {
    gulp.src('./src/*.html')
        .pipe(gulp.dest('./build/'))
        .pipe(connect.reload());
});

gulp.task('images', function() {
    gulp.src('./src/images/**/*.{jpg,jpeg,png,gif}')
        .pipe(imagemin())
        .pipe(gulp.dest('./build/images/'))
});

gulp.task('svg', function () {
    gulp.src('./src/images/**/*.svg')
        .pipe(gulp.dest('./build/images/'))
})

gulp.task('fonts', function() {
    gulp.src('./src/fonts/**/*.*')
        .pipe(gulp.dest('./build/fonts/'))
});

gulp.task('watch', function() {
    gulp.watch(['./src/*.html'], ['html'])
    gulp.watch('./src/css/scss/**/*.scss', ['sass'])
    gulp.watch('./src/images/**/*.*', ['images'])
});

gulp.task('default', ['connect', 'html', 'fonts', 'sass', 'images', 'svg', 'watch']);
