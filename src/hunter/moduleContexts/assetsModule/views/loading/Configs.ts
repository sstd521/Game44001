import loadingBinder from "../../../../fui/loading/loadingBinder";
import { IAssetsConfigs } from "../../../../AssetsConfigs";
import FUILoadBarView from "../../../../fui/loading/FUILoadBarView";

/**
 * Common包类需要进行的自定义扩展放在这
 */
export default class loadingConfig implements IAssetsConfigs {
    constructor() {
        rigger.service.FairyGUIPackagePlugin.packageMap["loadingBinder"] = loadingBinder;
        rigger.service.FairyGUIPackagePlugin.packageMap["loading"] = this;
        rigger.service.PackageUrlPlugin.packageMap["loading"] = this;
    }

    bindCustom(): void {
    }

    getPreLoadingAssets() {
        return [
            { url: "res/fui/loading/loading_atlas0.png", type: Laya.Loader.IMAGE },
            { url: "res/fui/loading/loading_atlas_w5i0o.png", type: Laya.Loader.IMAGE },
            // { url: "res/fui/loading/loading_w5i0d.mp3", type: Laya.Loader.SOUND},
            // { url: "res/fui/loading/loading_w5i0e.mp3", type: Laya.Loader.SOUND},
            
            { url: "res/spine/loading/loading.png", type: Laya.Loader.IMAGE },
            { url: "res/spine/loading/loading.sk", type: Laya.Loader.BUFFER }
        ];
    }
}