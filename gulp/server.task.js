var config;
var plugins;
var gulp;

function startServerTask() {
  return plugins.connect.server({
    root: 'dist',
    port: config.port
  });
}

module.exports = function(globalGulp, globalPlugins, globalConfig) {
  config = globalConfig;
  plugins = globalPlugins;
  gulp = globalGulp;

  gulp.task('server', startServerTask);
}
