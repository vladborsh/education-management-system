var gulp = require('gulp'),
    less = require('gulp-less')
 
gulp.task('less', function () {
  return gulp.src('./client/less/**/*.less')
    .pipe(less())
    .pipe(gulp.dest('./client/css'));
});

gulp.task('w:less', function () {
  gulp.watch('./client/less/**/*.less', ['less']);
})

gulp.task('default', ['w:less']);