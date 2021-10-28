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


var RiggerIOCPublishUtils = {
    /**
     * 发布,发布时根据配置的工程类型进行不同的发布
     */
    publish: function () {
        var tsPro = utils.createTSProject();
        // console.log(` start publish, Rigger:${Rigger.toString()}, init:${Rigger.init}, config:${Rigger.applicationConfig}`); 
        
        var tsResult = gulp.src("src/core/**/*.ts").pipe(sorter()).pipe(tsPro());
        // tsResult.dts.pipe(gulp.dest("./dist/riggerIOC/dts"));
        tsResult.js.pipe(concat("game.min.js")).pipe(gulp.dest("./bin/js/"));        
    },

    tsc: function(){
        // process.argv[2];
        var tsPro = utils.createTSProject();
        // console.log(` start publish, Rigger:${Rigger.toString()}, init:${Rigger.init}, config:${Rigger.applicationConfig}`); 
        let rootPath = process.argv[2].replace("--gulpfile=", "").replace("\\.laya\\compile.js", "").replace("/.laya/compile.js", "");
        var tsResult = gulp.src([rootPath + "/src/**/*.ts", rootPath + "/libs/**/*.ts", rootPath + "/rigger/**/*.ts"])
        // var tsResult = gulp.src(["src/**/*.ts"])
        .pipe(sorter())
        .pipe(sourcemaps.init())
        .pipe(tsPro());
        
        tsResult.pipe(sourcemaps.write(`./`, {includeContent:false, sourceRoot: `../../`})).pipe(gulp.dest(rootPath + "/bin/js"));
        // tsResult.dts.pipe(gulp.dest("./dist/riggerIOC/dts"));
        // tsResult.js.pipe(concat("game.min.js")).pipe(gulp.dest("./bin/js/"));       
    }
}

/**
 * 暴露的方法或属性
 */
module.exports = {
    // 发布
    publish: RiggerIOCPublishUtils.publish,
    tsc: RiggerIOCPublishUtils.tsc
    
}