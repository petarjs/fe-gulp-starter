function vendorScriptsTask() {
  //We use our vendor.json file to include specific files in a specific order.  Those are read into our vendorScript pipe and become vendors.js
  var vendorScriptList = JSON.parse(plugins.fs.readFileSync(config.vendorFilename, 'utf8'));
  var vendorScriptsArray = [];
  if (!_.isUndefined(vendorScriptList.scripts)) {
    vendorScriptsArray = vendorScriptList.scripts;
  }

  return gulp.src(vendorScriptsArray)
    .pipe(plugins.concat('vendors.js'))
    .pipe(plugins.gutil.env.production ? plugins.uglify({
      mangle: false
    }) : plugins.gutil.noop())
    .pipe(gulp.dest(config.buildPath + '/js'));
}

function appScriptsTask() {
  return gulp.src([
      config.srcPath + '/js/**/*.js'
    ])
    .pipe(plugins.concat('app.js'))
    .pipe(plugins.gutil.env.production ? plugins.uglify({
      mangle: false
    }) : plugins.gutil.noop())
    .pipe(gulp.dest(config.buildPath + '/js'));
}

module.exports = function(globalGulp, globalPlugins, globalConfig) {
  config = globalConfig;
  plugins = globalPlugins;
  gulp = globalGulp;
  _ = plugins._;

  gulp.task('scripts:vendor', vendorScriptsTask);
  gulp.task('scripts:app', appScriptsTask);

  gulp.task('scripts', ['scripts:vendor', 'scripts:app']);

}
