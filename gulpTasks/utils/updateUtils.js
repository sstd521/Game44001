var ts = require("gulp-typescript"); // 需要安装包
var gulp = require("gulp");
var sorter = require("gulp-typescript-sort");
var concat = require('gulp-concat'); // 需要安装包
var rename = require("gulp-rename");
var merge = require("merge-stream");
var fs = require('fs');
var filter = require("gulp-filter");
var utils = require("../utils/utils.js");
var sourcemaps = require('gulp-sourcemaps');


var updateUtils = {
    /**
     * 发布,发布时根据配置的工程类型进行不同的发布
     */
    updateData: function () {
        try {
            var dataConfig = require('../../configs/settings.json');
        }
        catch(err) {
            console.log(`==========缺少数据路径或项目ID===========\n===========调用gulp install=============`);
            return;
        }
        var dataPath = dataConfig.defaultDataRoot;
        var gameDataId = dataConfig.gameDataId;
        console.log(`now copy data files of ${gameDataId}`);
        gulp.src([`${dataPath}/${gameDataId}/**/*`]).pipe(gulp.dest(`src/data/`));
        gulp.src([`${dataPath}/defines/*`]).pipe(gulp.dest(`src/data/defines`));
        return gulp.src([`${dataPath}/tpls/*`]).pipe(gulp.dest(`src/data/tpls`));
    }
}

/**
 * 暴露的方法或属性
 */
module.exports = {
    // 更新
    updateData: updateUtils.updateData,
}