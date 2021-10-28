var gulp = require("gulp");
var fs = require('fs');
var path = require("path");

var fuiUrl = './bin/res/fui/roomScene';
var configUrl = './src/hunter/moduleContexts/roomModule/views/RoomView.ts';
var list = [];

// var configLangResUrl = './src/LanguageResPack/Config.ts';
// var langResList = [];

/**
* 自动生成预加载资源配置
*/
var preloadConfigUtils = {
    updatePreloadConfig: function() {
        preloadConfigUtils.readDirSync(fuiUrl);
    
        var content = "\t\t";
        for (var i = 0; i < list.length; i++) {
            content += list[i];
            if (i < list.length - 1)
                content += ",\n\t\t";
        }
        // console.log(content);
    
        var data = fs.readFileSync(configUrl, "utf8");
        data = data.replace(/\/\/--- gulp update_preload_config ---([.\s\S]*)\/\/--- gulp update_preload_config ---/, `//--- gulp update_preload_config ---\n${content}\t\n\t\t//--- gulp update_preload_config ---`);
        // console.log(data);
        fs.writeFileSync(configUrl, data);
    },

    /**
     * 遍历文件夹
     */
    readDirSync: function(readurl) {
        var pa = fs.readdirSync(readurl);
        pa.forEach(function (ele, index) {
            var info = fs.statSync(readurl + "/" + ele)
            if (info.isDirectory()) {
                preloadConfigUtils.readDirSync(readurl + "/" + ele);
            } else {
                var tempList = ele.split(".");
                if (tempList.length < 2) return;
                var fileType;
                var fileConfig;
                if (tempList[1] != "fui") {
                    switch (tempList[1]) {
                        case "png":
                        case "jpg":
                            fileType = "Laya.Loader.IMAGE";
                            break;
                        case "wav":
                        case "mp3":
                            fileType = "Laya.Loader.SOUND";
                            break;
                    }
    
                    var url = path.join(readurl, ele);
                    url = url.replace(/bin\\/, '');
                    url = url.replace(/\\/g, '/');
                    // console.log(url);
    
                    // fileConfig = `{url:"${url}", type:${fileType}}`
                    fileConfig = `this.addUISource(new DynamicSource(this, "${url}", ${fileType}, "roomScene"))`;
                    // console.log(fileConfig);
                    list.push(fileConfig);
                }
            }
        })
    }
}

/**
 * 暴露的方法或属性
 */
module.exports = {
    // 更新
    updatePreloadConfig: preloadConfigUtils.updatePreloadConfig,
    readDirSync: preloadConfigUtils.readdirSync
}