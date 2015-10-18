var config;
var plugins;
var gulp;

function versionTask() {
  console.log('Version', config.version);
}

module.exports = function(globalGulp, globalPlugins, globalConfig) {
  config = globalConfig;
  plugins = globalPlugins;
  gulp = globalGulp;

  gulp.task('version', versionTask);
};
