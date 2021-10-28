import entryBinder from "../../fui/entry/entryBinder";
import FUIMenuView from "../../fui/entry/FUIMenuView";
import EntryMenuView from "../../moduleContexts/entryModule/views/EntryMenuView";
import { IAssetsConfigs } from "../../AssetsConfigs";

/**
 * Common包类需要进行的自定义扩展放在这
 */
export default class EntryConfig implements IAssetsConfigs {
    constructor() {
        rigger.service.FairyGUIPackagePlugin.packageMap["entryBinder"] = entryBinder;
        rigger.service.FairyGUIPackagePlugin.packageMap["entry"] = this;
        rigger.service.PackageUrlPlugin.packageMap["entry"] = this;
    }

    bindCustom(): void {
        fairygui.UIObjectFactory.setPackageItemExtension(FUIMenuView.URL, EntryMenuView);
    }

    getPreLoadingAssets() {
        return [
            { url: "res/fui/entry/entry_atlas0.png", type: Laya.Loader.IMAGE },
            { url: "res/fui/entry/entry_atlas0_1.png", type: Laya.Loader.IMAGE },
            { url: "res/fui/entry/entry_atlas_vv7ubm.png", type: Laya.Loader.IMAGE },
            { url: "res/fui/entry/entry_atlas_rhqcbn.png", type: Laya.Loader.IMAGE },

            // 大厅背景动画
            { url: "res/spine/dating/dating.sk", type: Laya.Loader.BUFFER },
            { url: "res/spine/dating/dating.png", type: Laya.Loader.IMAGE },

            // 图标动画
            { url: "res/spine/icon/icon.png", type: Laya.Loader.IMAGE },
            { url: "res/spine/icon/icon2.png", type: Laya.Loader.IMAGE },
            { url: "res/spine/icon/icon.sk", type: Laya.Loader.BUFFER }
        ];
    }
}
