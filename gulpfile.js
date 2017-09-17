'use strict';

const gulp = require('gulp');
const istanbul = require('gulp-istanbul');
const mocha = require('gulp-mocha');

gulp.task('test', function (cb) {
  gulp
    .src(['lib/**/*.js'])
    .pipe(istanbul({ includeUntested: true })) // Covering files
    .pipe(istanbul.hookRequire()) // Force `require` to return covered files
    .on('error', function (error) {
      console.error(error);
    })
    .on('finish', function () {
      gulp.src('./test/lib/*.js')
        .pipe(mocha({ reporter: 'spec', timeout: 5000 }))
        .pipe(istanbul.writeReports({ reporters: ['lcov', 'json', 'text-summary'] }))
        .on('error', function (error) {
          console.error(error);
        })// Creating the reports after tests run
        .on('end', function () {
          cb();
          process.exit(0);
        });
    });
});
