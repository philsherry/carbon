var gulp = require('gulp');
var express = require('express');
var BuildTask = require('carbon-factory/lib/gulp/build').default;
var SpecTask = require('carbon-factory/lib/gulp/spec').default;
var connect = require('gulp-connect');


gulp.task('webserver', function() {
  connect.server();
});

gulp.task('build', BuildTask());

gulp.task('default', ['webserver', 'build']);

gulp.task('test', SpecTask());
