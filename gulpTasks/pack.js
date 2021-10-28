/**
 * 打包游戏相关库
 */
var gulp = require("gulp");
// var util = require("./util");
var sorter = require("gulp-typescript-sort");
var packingConfig = require("./packingConfig.json");
var concat = require('gulp-concat'); // 需要安装包
var uglify = require('gulp-uglify'); // 需要安装包
var merge = require("merge-stream");
var rename = require('gulp-rename'); // 需要安装包
var filter = require("gulp-filter");
var ts = require("gulp-typescript"); // 需要安装包
var gUtil = require("gulp-util");
// var order = require("gulp-order");
// var imagemin = require("gulp-imagemin");
// var tinyPng = require("gulp-tinypng");
var rev = require("gulp-rev");
var revCollector = require("gulp-rev-collector");
var runSeq = require("gulp-sequence");
var del = require("del");
var fs = require('fs');
var zip = require('gulp-zip');
var sd = require("silly-datetime");
var gulpRm = require("gulp-rm");
var utils = require("./utils/utils.js");

var resVer;
var resCmd = `layaair-cmd resourceVersion -i bin/res -o bin -n `;
var resCmd2 = `layaair2-cmd publish -c web`;
var prog = require('child_process')

/**
 * gulp默认任务，对项目进行打包（只打包指定游戏ID）
 * 任务开始前，会先将Laya和项目中使用到的第三方库的代码以及项目需要的资源进行打包
 */
// gulp.task("pack", function (cb) {
//     runSeq('delVerPack', "clearOld", "makeVersion", "updateVer", ["copyHtml", "copyRes", "packLib", "packConfigs", "packGame", "revJsonConfig"], "revHtml", "pack_zip", "zip_version")(cb);
// });
gulp.task("pack",function(cb) {
    runSeq(["layaaircmd2"], ["openResVersion"], ["moveDirectory"], "pack_zip", "zip_version")(cb);
});

gulp.task("layaaircmd2", function() {
    prog.execSync(resCmd2);
});

gulp.task("openResVersion", function() {
    var content = fs.readFileSync('./release/web/rigger/riggerConfigs/RiggerConfig.json', 'utf-8');
    content = content.replace(/"resVersionAvailable":false,/, `"resVersionAvailable":true,`);
    return fs.writeFileSync('./release/web/rigger/riggerConfigs/RiggerConfig.json', content);
});

gulp.task("moveDirectory", function() {
    var nowGameId = require("../bin/rigger/riggerConfigs/RiggerConfig.json").gameId;
    return gulp.src(`release/web/**`)
        .pipe(gulp.dest(`dist/${nowGameId}/bin`));
});

gulp.task('updateVer', function () {
    var verJson = require(`./version.json`);
    var commonLibsVer = verJson.commonLibsVer;
    var arr = commonLibsVer.split(".");
    var date = new Date();
    var ver = verJson.serverVer + "." + zeroInter(arr[0]) + zeroInter(arr[1]) + zeroInter(arr[2]) + "." + zeroInter(resVer + "");
    var content = fs.readFileSync('./bin/rigger/rigger.min.js', 'utf-8');
    content = content.replace(/\/\/--- client version ---([.\s\S]*)\/\/--- client version ---/, `//--- client version ---\r\nVersion.ver = \"${ver}  \";\r\n//--- client version ---`);
    return fs.writeFileSync('./bin/rigger/rigger.min.js', content);

    function zeroInter(str) {
        if (parseInt(str) < 100)
            return parseInt(str) < 10 ? "0" + str : str;
        else
            return str.substring(str.length - 2);
    }
});

/**
 * 删除增量包
 */
gulp.task('delVerPack', ["delVerPackFiles"], function () {
    return merge(gulp.src("./bin/res-ver-*").pipe(gulpRm()), gulp.src(["./bin/.record"]).pipe(gulpRm()));
    // var pa = fs.readdirSync('./bin');
    // pa.forEach(function (ele, index) {
    //     var info = fs.statSync('./bin/' + ele)
    //     if (info.isDirectory()) {
    //         if (ele.indexOf('res-ver-') != -1)
    //             del('./bin/' + ele);
    //     } else {
    //         if (ele == '.record')
    //             del('./bin/' + ele);
    //     }
    // })
});

gulp.task("delVerPackFiles", function () {
    return gulp.src(["./bin/res-ver-*/**/*"]).pipe(gulpRm());
})

/**
 * 打包zip
 */
gulp.task("pack_zip", function () {
    var nowGameId = require("../bin/rigger/riggerConfigs/RiggerConfig.json").gameId;
    return gulp.src(`dist/${nowGameId}/**`)
        .pipe(zip(`${nowGameId}.zip`))
        .pipe(gulp.dest(`dist/${nowGameId}`));
});

/**
 * 添加version.json
 */
gulp.task("zip_version", function () {
    // var nowGameId = require("../bin/gameConfig.json").gameId;
    var date = new Date();
    var content = `{\n\t"version":"${sd.format(date, 'YYYY.MM.DD.HH.mm.ss')}",\n\t"index":"./${4001}/bin/index.html"\n}`;
    return fs.writeFileSync(`dist/${4001}/meta.json`, content);
});

function makeRootPath(gameId) {
    return `./dist/${gameId}/bin`;
}

gulp.task("writeGameConfig", function () {
    var nowGameId = require("../bin/gameConfig.json").gameId;
    if (!fs.existsSync(`${makeRootPath(nowGameId)}`)) fs.mkdirSync(`${makeRootPath(nowGameId)}`);
    // 修改游戏配置中的资源管理项
    var content =
        `{
                "gameId":"${nowGameId}",
                "mode":2,
                "resVersionAvailable":true
            }`;
    fs.writeFileSync(`${makeRootPath(nowGameId)}/gameConfig.json`, content);

})

gulp.task("clearOld", function (cb) {
    // var nowGameId = require("../bin/gameConfig.json").gameId;
    // if (fs.existsSync(makeRootPath(nowGameId))) {
    //     return del(makeRootPath(nowGameId), cb);
    // }
    // return cb();

    if (fs.existsSync('./dist')) {
        return del('./dist', cb);
    }
    return cb();
})

gulp.task("mv", ["makeVersion"], function () {

})

gulp.task("makeVersion", function (cb) {
    // 获取原来的版本号
    initResVersion();
    // 生成资源版本
    makeResVersion();
    // 更新版本号
    updateResVersion();

    return cb();

})


function initResVersion() {
    if (fs.existsSync("bin/.resVersion.json")) {
        var version = require("../bin/.resVersion.json");
        resVer = parseInt(version.resVersion) + 1;
        console.log("ver:" + resVer);
    }
    else {
        resVer = 1;
    }
}

function makeResVersion() {
    // 获取资源版本文件夹前缀
    var pre = packingConfig.verPre;
    prog.execSync(resCmd + `${pre}${resVer}`);
}

function updateResVersion() {
    // 检查是否生成了新版本
    var pre = packingConfig.verPre;
    if (fs.existsSync(`bin/${pre}${resVer}`)) {
        // 成功，将新版本写入版本文件
        writeResVersion(resVer);
    }

}

function writeResVersion(v) {
    var content = `{
        "resVersion":${v}
    }`
    fs.writeFileSync("bin/.resVersion.json", content);
}


gulp.task("packGame", function () {
    // 如果没有指明打包的游戏ID，直接退出,此时可以输出一些退出信息提醒用户
    var nowGameId = require("../bin/gameConfig.json").gameId;
    if (!nowGameId) return;

    var srcStream = gulp.src(packingConfig.srcPath.concat(packingConfig.dtsPath)).pipe(sorter(false));
    var tsProject = ts.createProject("./tsconfig.json");

    // =====
    var tsPro = utils.createTSProject();
    // console.log(` start publish, Rigger:${Rigger.toString()}, init:${Rigger.init}, config:${Rigger.applicationConfig}`); 

    var tsResult = gulp.src(["src/**/*.ts", "libs/**/*.ts", "rigger/**/*.ts"])
        // var tsResult = gulp.src(["src/**/*.ts"])
        .pipe(sorter())
        .pipe(tsPro());
    //=====

    // 合并，压缩，混淆,输出
    return tsResult.js.pipe(gulp.dest(`${makeRootPath(nowGameId)}`))
        .pipe(uglify())
        .on('error', function(err) {
            gUtil.log(gUtil.colors.red('[Error]'), err.toString());
        })
        .pipe(rev())
        .pipe(gulp.dest(`${makeRootPath(nowGameId)}`))
        .pipe(rev.manifest({ base: null, merge: false }))
        .pipe(gulp.dest(`${makeRootPath(nowGameId)}`));;

})

gulp.task("packConfigs", function () {
    var nowGameId = require("../bin/gameConfig.json").gameId;
    // 打包Rigger配置
    var streamRigger = gulp.src([`bin/rigger/**/*`])
    .pipe(
        filter(["**", "!**/*.js"])
        );
    var gmConfigStream = gulp.src(["bin/gmCmds.json"]);
    return gulp.src(["bin/gmCmds.json"]).pipe(gulp.dest(`${makeRootPath(nowGameId)}`));
    // return streamRigger.pipe(gulp.dest(`${makeRootPath(nowGameId)}/rigger`));
})


/**
 * 打包库代码
 */
gulp.task("packLib", function () {
    var nowGameId = require("../bin/gameConfig.json").gameId;
    if (!nowGameId) return;
    return gulp.src(packingConfig.libPath)/*.pipe(order(["laya.core.js"]))*/
        .pipe(concat("lib.js"))
        .pipe(uglify())
        .on('error', function(err) {
            gUtil.log(gUtil.colors.red('[Error]'), err.toString());
        })
        .pipe(rename("lib.min.js"))
        // .pipe(gulp.dest(`${makeRootPath(nowGameId)}/libs`))
        .pipe(rev())
        .pipe(gulp.dest(`${makeRootPath(nowGameId)}/libs`))
        .pipe(rev.manifest({ base: null, merge: false }))
        .pipe(gulp.dest(`${makeRootPath(nowGameId)}/libs`));
})

gulp.task("revHtml", function () {
    var nowGameId = require("../bin/gameConfig.json").gameId;
    return gulp.src(["dist/**/rev-manifest.json", `${makeRootPath(nowGameId)}/index.html`])
        .pipe(revCollector())
        .pipe(gulp.dest(`${makeRootPath(nowGameId)}`));
})

gulp.task("revJsonConfig", function () {
    var nowGameId = require("../bin/gameConfig.json").gameId;
    if (!nowGameId) return;
    gulp.src([packingConfig.riggerConfigPath, packingConfig.manifestPath])/*.pipe(order(["laya.core.js"]))*/
        .pipe(rev())
        .pipe(gulp.dest(`${makeRootPath(nowGameId)}/rigger/riggerConfigs`))
        .pipe(rev.manifest())
        .pipe(gulp.dest(`${makeRootPath(nowGameId)}/rigger/riggerConfigs`));
})


/**
 * 打包指定游戏的代码
 */
gulp.task("packSub", function () {

})


gulp.task("copyHtml", function () {
    var nowGameId = require("../bin/gameConfig.json").gameId;
    return gulp.src(packingConfig.indexPath).pipe(rename("index.html")).pipe(gulp.dest(makeRootPath(nowGameId)));
})

var TINY_PNG_API_KEY = "LtjluFYOsL3YdwXfXDQG76uG3OrHRW19";

/**
 * 复制项目资源
 */
gulp.task("copyRes", function () {
    // console.log("id:" + options.id);
    var nowGameId = require("../bin/gameConfig.json").gameId;
    var allRes = gulp.src(packingConfig.resPath, { base: "bin" });
    // 将资源分成PNG和非PNG
    var pngRes = allRes.pipe(filter(["**/*.png"]));
    var nonPngRes = allRes.pipe(filter(["**", "!**/*.png"]));
    nonPngRes.pipe(gulp.dest(makeRootPath(nowGameId)));

    // 复制资源版本配置文件
    // var resVerConfig = gulp.src("bin/manifest.json").pipe(gulp.dest(makeRootPath(nowGameId)));
    // return pngRes.pipe(tinyPng(TINY_PNG_API_KEY)).pipe(gulp.dest(makeRootPath(nowGameId)));

    // return pngRes.pipe(imagemin({
    //     progressive: true
    // })).pipe(gulp.dest(makeRootPath(nowGameId)));
    return pngRes.pipe(gulp.dest(makeRootPath(nowGameId)));

})