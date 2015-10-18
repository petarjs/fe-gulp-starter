var config;
var plugins;
var gulp;
var _;
var cssMinify;

function appCssTask() {
  var lessOptions = {
    paths: [ config.bowerPath ]
  };

  cssMinify = plugins.gutil.env.production ? plugins.minifyCss() : plugins.gutil.noop();

  return gulp.src([config.srcPath + '/less/app.less'])
      .pipe(plugins.less(lessOptions))
      .pipe(plugins.autoprefixer('last 10 version'))
      .pipe(plugins.concat('app.css'))
      .pipe(cssMinify)
      .pipe(gulp.dest(config.buildPath + '/css'));
}

function vendorCssTask() {
  //We use our vendor.json file to include specific files in a specific order.
  var vendorCssList = JSON.parse(plugins.fs.readFileSync(config.vendorFilename, 'utf8'));
  var vendorCssArray = [];
  if (!_.isUndefined(vendorCssList.stylesheets)) {
    vendorCssArray = vendorCssList.stylesheets;
  }
  
  cssMinify = plugins.gutil.env.production ? plugins.minifyCss() : plugins.gutil.noop();

  return gulp.src(vendorCssArray)
                    .pipe(plugins.concat('vendors.css'))
                    .pipe(cssMinify)
                    .pipe(gulp.dest(config.buildPath + '/css'));
}

module.exports = function(globalGulp, globalPlugins, globalConfig) {
  config = globalConfig;
  plugins = globalPlugins;
  gulp = globalGulp;
  _ = plugins._;

  gulp.task('css:vendor', vendorCssTask);
  gulp.task('css:app', appCssTask);

  gulp.task('css', ['css:app', 'css:vendor']);
}
