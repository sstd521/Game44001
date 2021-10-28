/**
 * 安装任务
 */
var gulp = require("gulp");
var concat = require('gulp-concat'); // 需要安装包
var rename = require('gulp-rename'); // 需要安装包
var merge = require("merge-stream");
var filter = require("gulp-filter");
var sd = require("silly-datetime");
var colors = require("colors");
var path = require("path");
var fs = require('fs');
var util = require("../utils/utils.js");
var readline = require(`readline`);

var Rigger = require('../../rigger//gulpTasks/utils/rigger.js');
var RiggerUtils = require('../../rigger//gulpTasks/utils/riggerUtils.js');

var rl;

var nowStep;
var defaultDataRoot;
var gameDataId;
const SETTING_DEFAULT_DATA_ROOT = 1;
const SETTING_GAME_DATA_ID = 2;



var InstallUtils = {
    install: function*() {
        // 检查是否有配置默认项目路径
        if (!fs.existsSync("./configs")) fs.mkdirSync("./configs");
        if (!fs.existsSync("./configs/settings.json")) fs.writeFileSync("./configs/settings.json", "{}");
        var settings = require("../../configs/settings.json");
        defaultDataRoot = settings.defaultDataRoot;
        gameDataId = settings.gameDataId;
        if (!settings.defaultDataRoot) {
            nowStep = SETTING_DEFAULT_DATA_ROOT;
            yield InstallUtils.askUserSync("请输入项目数据路径:").then(InstallUtils.treatInput);
        }
        if(!settings.gameDataId) {
            nowStep = SETTING_GAME_DATA_ID;
            yield InstallUtils.askUserSync("请输入项目数据ID:").then(InstallUtils.treatInput);
        }
        if (rl) rl.close();
        console.log(`dataRoot:${defaultDataRoot}, gameDataId:${gameDataId}`);
        if (defaultDataRoot) {
            InstallUtils.writeSettingsAsyn();
        }
    },

    askUserSync: function (tips) {
        return new Promise((resolve) => {
            if (rl) rl.close();
            rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            });

            rl.question(tips, (input) => {
                rl.close();
                resolve(input);
            });

        })
    },

    treatInput: function (input) {
        switch (nowStep) {
            case SETTING_DEFAULT_DATA_ROOT:
                InstallUtils.treatDefaultDataRoot(input);
                break;
            case SETTING_GAME_DATA_ID:
                InstallUtils.treatgameDataId(input);
                break;
            default:
                console.error("invalid operation when insatll settings!");
                break;
        }
    },

    treatDefaultDataRoot: function (input) {
        defaultDataRoot = input;
        console.log(`you input data root path:${defaultDataRoot}`);
    },

    treatgameDataId: function (input) {
        gameDataId = input;
        console.log(`you input game data id:${gameDataId}`);
    },

    writeSettingsAsyn: function () {
        defaultDataRoot = util.convertPath(defaultDataRoot);
        //将数据路径写入RiggerConfig.json
        var content
            = `{
                "defaultDataRoot":"${defaultDataRoot}",
                "gameDataId": "${gameDataId}"
            }`;
        console.log(`write setting file:${content}`);
        fs.writeFileSync("./configs/settings.json", content);
    }
};

module.exports = {
    install: InstallUtils.install,
    askUserSync: InstallUtils.askUserSync,
    treatInput: InstallUtils.treatInput,
    treatDefaultDataRoot: InstallUtils.treatDefaultDataRoot,
    writeSettingsAsyn: InstallUtils.writeSettingsAsyn
}