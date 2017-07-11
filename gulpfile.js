var gulp = require('gulp'),
  sass = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  cleanCss = require('gulp-clean-css'),
  connect = require('gulp-connect');

gulp.task('scss', function() {
  return gulp.src('./stylesheets/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(cleanCss())
    .pipe(gulp.dest('stylesheets'))
    .pipe(connect.reload());
});

gulp.task('html', function() {
  gulp.src('./')
    .pipe(connect.reload());
});

gulp.task('connect', function() {
  connect.server({
    root: '.',
    livereload: true
  });
});

gulp.task('watch', function() {
  gulp.watch('stylesheets/**/*.scss', ['scss']);
  gulp.watch('./*.html', ['html']);
});

gulp.task('init', ['scss', 'html', 'connect', 'watch']);