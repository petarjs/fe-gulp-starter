var gulp = require('gulp');
var gulpLoadPlugins = require('gulp-load-plugins');

// all npm packages will be available in plugins variable
var plugins = gulpLoadPlugins({
 rename: {
  'gulp-util': 'gutil'
 }
});

// add non-gulp plugins
plugins.path = require('path');
plugins.del = require('del');
plugins.merge = require('merge-stream');
plugins.stylish = require('jshint-stylish');
plugins.es = require('event-stream');
plugins.fs = require('fs');
plugins._ = require('lodash');
plugins.series = require('stream-series');
plugins.runSequence = require('run-sequence');

var version = JSON.parse(plugins.fs.readFileSync('./package.json', 'utf8')).version;
var bowerPath = JSON.parse(plugins.fs.readFileSync('./.bowerrc', 'utf8')).directory;

var config = {
 srcPath: 'app',
 buildPath: 'dist',
 version: version,
 vendorFilename: './vendors.json',
 bowerPath: bowerPath,
 port: 3000
};

// load tasks
var versionTask = require('./gulp/version.task')(gulp, plugins, config);
var cleanTask = require('./gulp/clean.task')(gulp, plugins, config);
var copyTask = require('./gulp/copy.task')(gulp, plugins, config);
var scriptsTask = require('./gulp/scripts.task')(gulp, plugins, config);
var cssTask = require('./gulp/css.task')(gulp, plugins, config);
var indexTask = require('./gulp/index.task')(gulp, plugins, config);
var serverTask = require('./gulp/server.task')(gulp, plugins, config);
var watchTask = require('./gulp/watch.task')(gulp, plugins, config);

// main tasks
gulp.task('default', ['serve']);

gulp.task('serve', function() {
 plugins.runSequence(
   ['clean'],
   ['scripts', 'css', 'copy'],
   ['index'],
   ['watch'],
   ['server']
 );
});

gulp.task('build', function() {
 plugins.runSequence(
   ['clean'],
   ['scripts', 'css', 'copy'],
   ['index']
 );
});
