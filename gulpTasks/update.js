var gulp = require("gulp");
var updateUtils = require("./utils/updateUtils.js");
var preloadConfigUtils = require("./utils/preloadConfig.js");

gulp.task("update-data", function(){
    updateUtils.updateData();
})

gulp.task("update_preload_config", function() {
    preloadConfigUtils.updatePreloadConfig();
})

