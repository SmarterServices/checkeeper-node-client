'use strict';

const gulp = require('gulp');
const mocha = require('gulp-mocha');

gulp.task('test', function (cb) {
  gulp
    .src(['./test/lib/*.js'])
    .pipe(mocha())
    .on('end', function () {
      console.log('this happened');
      process.exit();
    });
});
