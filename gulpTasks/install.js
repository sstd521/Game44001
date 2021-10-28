var gulp = require("gulp");
var ts = require("gulp-typescript"); // 需要安装包
var glob = require("glob");
var path = require("path");
var del = require("del");
var sd = require("silly-datetime");
var colors = require("colors");
var nodemon = require("gulp-nodemon");
var runSeq = require("gulp-sequence");
require('gulp-awaitable-tasks')(gulp);

var InstallUtils = require("./utils/installUtils.js");

// gulp.task("install", InstallUtils.install);
gulp.task("install", InstallUtils.install);

