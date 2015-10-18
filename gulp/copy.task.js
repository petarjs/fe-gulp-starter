var config;
var plugins;
var gulp;
var _;

function copyFontsTask() {
  return gulp.src([
      config.bowerPath + '/font-awesome/fonts/**'
    ])
    .pipe(gulp.dest(config.buildPath + '/fonts'));
}

function copyOtherTask() {
  return gulp.src([
    config.srcPath + '/**/!(*.js|*.less|*.css|*.json|*.html)',
    '!' + config.srcPath + '/js{,/**}',
    '!' + config.srcPath + '/less{,/**}'
  ], {
    base: './app/'
  })
  .pipe(gulp.dest(config.buildPath));
}

module.exports = function(globalGulp, globalPlugins, globalConfig) {
  config = globalConfig;
  plugins = globalPlugins;
  gulp = globalGulp;
  _ = plugins._;

  gulp.task('copy:fonts', copyFontsTask);
  gulp.task('copy:other', copyOtherTask);
  
  gulp.task('copy', ['copy:fonts', 'copy:other']);
}
