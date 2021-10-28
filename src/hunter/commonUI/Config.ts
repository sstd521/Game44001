import AssetsConfigs, { IAssetsConfigs } from "../AssetsConfigs";
import commonUIBinder from "../fui/commonUI/commonUIBinder";
/**
* 战斗相关界面资源配置
*/
export default class commonUIConfig implements IAssetsConfigs {
    constructor()  {
        rigger.service.FairyGUIPackagePlugin.packageMap["commonUIBinder"] = commonUIBinder;
        rigger.service.FairyGUIPackagePlugin.packageMap["commonUI"] = this;
        rigger.service.PackageUrlPlugin.packageMap["commonUI"] = this;
    }
	/**
     * Common包类需要进行的自定义扩展放在这
     */
    bindCustom(): void {

    }

    getPreLoadingAssets() {
        return [
            // { url: "res/fui/commonUI/commonUI_atlas0.png", type: Laya.Loader.IMAGE },
        ];
    }
}