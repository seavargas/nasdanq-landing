const gulp     = require('gulp'),
  sass         = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  cleanCss     = require('gulp-clean-css'),
  open         = require('gulp-open'),
  connect      = require('gulp-connect');

gulp.task('scss', function() {
  return gulp.src('./stylesheets/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(cleanCss())
    .pipe(gulp.dest('./stylesheets'))
    .pipe(connect.reload());
});

gulp.task('connect', function() {
  connect.server({
    root: '.',
    livereload: true,
    port: 8001
  });
});

gulp.task('watch', function() {
  gulp.watch('./stylesheets/**/*.scss', ['scss']);
});

gulp.task('open', function(){
  gulp.src(__filename)
    .pipe(open({uri: 'http://localhost:8001'}));
});

gulp.task('init', ['scss', 'watch']);
gulp.task('open', ['open']);