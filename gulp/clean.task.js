var config;
var plugins;
var gulp;

function cleanScriptsTask () {
  return plugins.del.sync([
    config.buildPath + '/js/**',
  ]);
}

function cleanCssTask () {
  return plugins.del.sync([
    config.buildPath + '/css/**',
  ]);
}

function cleanFontsTask () {
  return plugins.del.sync([
    config.buildPath + '/fonts/*',
  ]);
}

function cleanDistTask() {
  return plugins.del.sync([
    config.buildPath + '/**/*',
  ]);
}

module.exports = function(globalGulp, globalPlugins, globalConfig) {
  config = globalConfig;
  plugins = globalPlugins;
  gulp = globalGulp;

  gulp.task('clean:dist', cleanDistTask);

  gulp.task('clean', ['clean:dist']);
}
