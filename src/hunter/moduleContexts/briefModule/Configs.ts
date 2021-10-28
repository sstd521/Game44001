import briefUIBinder from "../../fui/briefUI/briefUIBinder";
import { IAssetsConfigs } from "../../AssetsConfigs";
import HelpView from "./views/HelpView";
import FUIHelpView from "../../fui/briefUI/FUIhelpView";
import FUISettingView from "../../fui/briefUI/FUISettingView";
import SettingView from "./views/SettingView";
import RankView from "./views/RankView";
import FUIRankView from "../../fui/briefUI/FUIRankView";
import FUIInfoView from "../../fui/briefUI/FUIInfoView";
import InfoView from "./views/InfoView";
import FUIHelpYuPanel from "../../fui/briefUI/FUIHelpYuPanel";
import { FishTypeHelpView } from "./views/FishTypeHelpView";

/**
 * Common包类需要进行的自定义扩展放在这
 */
export default class briefConfig implements IAssetsConfigs {
    constructor() {
        rigger.service.FairyGUIPackagePlugin.packageMap["briefUIBinder"] = briefUIBinder;
        rigger.service.FairyGUIPackagePlugin.packageMap["briefUI"] = this;
        rigger.service.PackageUrlPlugin.packageMap["briefUI"] = this;
    }
    
    bindCustom(): void {
        fairygui.UIObjectFactory.setPackageItemExtension(FUIHelpView.URL, HelpView);
        fairygui.UIObjectFactory.setPackageItemExtension(FUIRankView.URL, RankView);
        fairygui.UIObjectFactory.setPackageItemExtension(FUISettingView.URL, SettingView);
        fairygui.UIObjectFactory.setPackageItemExtension(FUIInfoView.URL, InfoView);
        fairygui.UIObjectFactory.setPackageItemExtension(FUIHelpYuPanel.URL, FishTypeHelpView);
    }

    getPreLoadingAssets() {
        return [
            {url:"res/fui/briefUI/briefUI_atlas0.png", type:Laya.Loader.IMAGE},
            {url:"res/fui/briefUI/briefUI_atlas0_1.png", type:Laya.Loader.IMAGE},
        ];
    }
}