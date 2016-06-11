'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');

gulp.task('sass', () => {
  return gulp.src('./src/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/css'));
});

gulp.task('js', () => {
  return gulp.src('./src/js/**/*.js')
    .pipe(concat('script.js'))
    .pipe(gulp.dest('./public/js'));
});

gulp.task('sass:watch', () => {
  gulp.watch('./src/scss/**/*.scss', ['sass']);
});

gulp.task('dev', ['sass:watch', 'js']);
gulp.task('dist', ['sass', 'js']);

gulp.task('default', ['dev']);
