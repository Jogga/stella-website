'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', () => {
  return gulp.src('./src/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/css'));
});

gulp.task('sass:watch', () => {
  gulp.watch('./src/scss/**/*.scss', ['sass']);
});