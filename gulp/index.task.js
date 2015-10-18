var config;
var plugins;
var gulp;
var _;

var injectOptions = {
  ignorePath: '/dist/',
  removeTags: true
}

function indexTask(sources) {
  var srcOpts = {
    read: false,
    cwd: config.buildPath
  };
  var styleVendorStream = gulp.src(['css/vendors.css'], srcOpts);
  var styleAppStream = gulp.src(['css/app.css'], srcOpts);
  var scriptVendorStream = gulp.src(['js/vendors.js'], srcOpts);
  var scriptAppStream = gulp.src(['js/app.js'], srcOpts);

  var sources = plugins.series(
    styleVendorStream,
    styleAppStream,
    scriptVendorStream,
    scriptAppStream
  );

  return gulp
    .src(config.srcPath + '/index.html')
    .pipe(plugins.inject(sources, {
      addRootSlash: false
    }))
    .pipe(gulp.dest(config.buildPath));
}

module.exports = function(globalGulp, globalPlugins, globalConfig) {
  config = globalConfig;
  plugins = globalPlugins;
  gulp = globalGulp;
  _ = plugins._;

  gulp.task('index', indexTask);
}
