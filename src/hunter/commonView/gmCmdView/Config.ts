import gmCmdBinder from "../../fui/gmCmd/gmCmdBinder";
import { IAssetsConfigs } from "../../AssetsConfigs";

/**
* 战斗相关界面资源配置
*/
export default class gmCmdViewConfig implements IAssetsConfigs {
    constructor() {
        rigger.service.FairyGUIPackagePlugin.packageMap["gmCmdBinder"] = gmCmdBinder;
        rigger.service.FairyGUIPackagePlugin.packageMap["gmCmd"] = this;
        rigger.service.PackageUrlPlugin.packageMap["gmCmd"] = this;
    }
	/**
     * Common包类需要进行的自定义扩展放在这
     */
    bindCustom(): void  {
        // fairygui.UIObjectFactory.setPackageItemExtension(FUIFieldView.URL, ddz.mainScene.FieldView);
    }

    getPreLoadingAssets()  {
        return [
            // { url: "res/fui/gmCmd/gmCmd_atlas0.png", type: Laya.Loader.IMAGE },
        ];
    }
}