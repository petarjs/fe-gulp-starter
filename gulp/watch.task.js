var config;
var plugins;
var gulp;
var _;

function watchStylesTask() {
  gulp.watch([config.srcPath + '/less/*.less'], function() {
    plugins.runSequence(
      'css:app'
    );
  });
}

function watchScriptsTask() {
  gulp.watch([config.srcPath + '/js/**/*.js'], function() {
    plugins.runSequence(
      'scripts:app'
    );
  });
}

function watchVendorTask() {
  gulp.watch(config.vendorFilename, ['build']);
}

function watchIndexTask() {
  gulp.watch(config.srcPath.concat('/index.html'), ['build']);
}

module.exports = function(globalGulp, globalPlugins, globalConfig) {
  config = globalConfig;
  plugins = globalPlugins;
  gulp = globalGulp;
  _ = plugins._;

  gulp.task('watch:styles', watchStylesTask);
  gulp.task('watch:scripts', watchScriptsTask);
  gulp.task('watch:vendor', watchVendorTask);
  gulp.task('watch:index', watchIndexTask);
  gulp.task('watch', ['watch:styles', 'watch:scripts', 'watch:vendor', 'watch:index']);

}
