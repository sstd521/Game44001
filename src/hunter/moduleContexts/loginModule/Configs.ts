import { ServerItemView } from "./views/ServerItemView";
import FUIServerItemView from "../../fui/loginUi/FUIServerItemView";
import loginUiBinder from "../../fui/loginUi/loginUiBinder";
import { IAssetsConfigs } from "../../AssetsConfigs";
import FUIMaskView from "../../fui/commonUI/FUIMaskView";
import MaskView from "../../commonView/MaskView";
/**
 * Common包类需要进行的自定义扩展放在这
 */

export default class loginConfig implements IAssetsConfigs {
    constructor() {
        rigger.service.FairyGUIPackagePlugin.packageMap["loginUiBinder"] = loginUiBinder;
        rigger.service.FairyGUIPackagePlugin.packageMap["loginUi"] = this;
        rigger.service.PackageUrlPlugin.packageMap["loginUi"] = this;
    }
    
    bindCustom(): void  {
        fairygui.UIObjectFactory.setPackageItemExtension(FUIServerItemView.URL, ServerItemView);
        // fairygui.UIObjectFactory.setPackageItemExtension(FUIServerItemView.URL, ServerItemView);
        // laya.utils.ClassUtils.   
        fairygui.UIObjectFactory.setPackageItemExtension(FUIMaskView.URL, MaskView);   
    }

    getPreLoadingAssets()  {
        return [
            { url: "res/fui/loginUi/loginUi_atlas0.png", type: Laya.Loader.IMAGE}            
        ];
    }

}