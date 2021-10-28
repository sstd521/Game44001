import commonUIConfig from "./commonUI/Config";
import briefConfig from "./moduleContexts/briefModule/Configs";
import loadingConfig from "./moduleContexts/assetsModule/views/loading/Configs";
import loginConfig from "./moduleContexts/loginModule/Configs";
import gmCmdViewConfig from "./commonView/gmCmdView/Config";
import entryConfig from "./moduleContexts/entryModule/Configs";
import roomSceneConfig from "./moduleContexts/roomModule/Configs";

export default class AssetsConfigs {
    constructor() {
        let c1: commonUIConfig = new commonUIConfig();
        let c2: briefConfig = new briefConfig();
        let c3: loadingConfig = new loadingConfig();
        let c4: loginConfig = new loginConfig();
        // let c5: gmCmdViewConfig = new gmCmdViewConfig();
        let c6: entryConfig = new entryConfig();
        let c7: roomSceneConfig = new roomSceneConfig();
    }
}

export interface IAssetsConfigs {
    /**
     * 自定义扩展
     */
    bindCustom(): void;

    /**
     * 预加载资源
     */
    getPreLoadingAssets();
}