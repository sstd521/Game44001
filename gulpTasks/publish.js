var gulp = require("gulp");
var ts = require("gulp-typescript"); // 需要安装包
var glob = require("glob");
var path = require("path");
var del = require("del");
var sd = require("silly-datetime");
var colors = require("colors");
var nodemon = require("gulp-nodemon");
var runSeq = require("gulp-sequence");

var RiggerPublishUtils = require("./utils/publishUtils.js");

// gulp.task("publish", function(){
//     RiggerPublishUtils.publish();     
// })

gulp.task("tsc", function(){
    RiggerPublishUtils.tsc();     
})

gulp.task("initApplicationConfig", function(){
    return RiggerIOC.init();
})
