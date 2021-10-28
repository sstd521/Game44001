import { IAssetsConfigs } from "../../AssetsConfigs";
import roomSceneBinder from "../../fui/roomScene/roomSceneBinder";
import FUIFishContent from "../../fui/roomScene/FUIFishContent";
import FishView from "./views/FishView";
import FUIBulletView from "../../fui/roomScene/FUIBulletView";
import BulletView from "./views/BulletView";
import FUIRoomTipsView from "../../fui/roomScene/FUIRoomTipsView";
import RoomTipsView from "./views/RoomTipsView";
import CatchAllAniView from "../../script/fish/fishScript/CatchAllAniView";
import FUIcatchAllLineView from "../../fui/roomScene/FUIcatchAllLineView";
import FUIFishDeadTipsView from "../../fui/roomScene/FUIFishDeadTipsView";
import SpecialDeadTipsView from "../../script/fish/fishScript/SpecialDeadTipsView";
import FUInet from "../../fui/roomScene/FUInet";
import { NetView } from "../../script/net/NetView";
import FUIwaveAniView from "../../fui/roomScene/FUIwaveAniView";
import { BgWaveAniView } from "./views/BgWaveAniView";
import FUIFullScreenGoldAniView from "../../fui/roomScene/FUIFullScreenGoldAniView";
import { FullScreenGoldAniView } from "./views/FullScreenGoldAniView";
import FUIShowGoldListView from "../../fui/roomScene/FUIShowGoldListView";
import { ShowGoldListView } from "./views/ShowGoldListView";
import FUIGoldListItemView from "../../fui/roomScene/FUIGoldListItemView";
import { GoldListItemView } from "./views/GoldListItemView";

export default class roomSceneConfig implements IAssetsConfigs {
    constructor() {
        rigger.service.FairyGUIPackagePlugin.packageMap["roomSceneBinder"] = roomSceneBinder;
        rigger.service.FairyGUIPackagePlugin.packageMap["roomScene"] = this;
        rigger.service.PackageUrlPlugin.packageMap["roomScene"] = this;
    }
    /**
     * Common包类需要进行的自定义扩展放在这
     */
    bindCustom(): void {
        fairygui.UIObjectFactory.setPackageItemExtension(FUIFishContent.URL, FishView); //鱼界面
        fairygui.UIObjectFactory.setPackageItemExtension(FUIBulletView.URL, BulletView); //子弹界面
        fairygui.UIObjectFactory.setPackageItemExtension(FUIRoomTipsView.URL, RoomTipsView); //提示界面

        fairygui.UIObjectFactory.setPackageItemExtension(FUIcatchAllLineView.URL, CatchAllAniView); //一网打尽特效界面
        fairygui.UIObjectFactory.setPackageItemExtension(FUIFishDeadTipsView.URL, SpecialDeadTipsView); //特殊鱼死亡提示界面
        fairygui.UIObjectFactory.setPackageItemExtension(FUInet.URL, NetView); //渔网界面
        fairygui.UIObjectFactory.setPackageItemExtension(FUIwaveAniView.URL, BgWaveAniView); //海底动画
        fairygui.UIObjectFactory.setPackageItemExtension(FUIFullScreenGoldAniView.URL, FullScreenGoldAniView); //全屏金币动画;
        fairygui.UIObjectFactory.setPackageItemExtension(FUIShowGoldListView.URL, ShowGoldListView);
        fairygui.UIObjectFactory.setPackageItemExtension(FUIGoldListItemView.URL, GoldListItemView);
    }

    getPreLoadingAssets() {
        //--- gulp update_preload_config ---
		return [
            //鱼登场spine动画
            {url:"res/spine/FishInAni/juesedengchang.sk", type:Laya.Loader.BUFFER},
            {url:"res/spine/FishInAni/juesedengchang.png", type:Laya.Loader.IMAGE},
            {url:"res/spine/FishInAni/juesedengchang2.png", type:Laya.Loader.IMAGE},
            {url:"res/spine/FishInAni/juesedengchang3.png", type:Laya.Loader.IMAGE},
            {url:"res/spine/FishInAni/juesedengchang4.png", type:Laya.Loader.IMAGE},
            {url:"res/spine/FishInAni/juesedengchang5.png", type:Laya.Loader.IMAGE},
            {url:"res/spine/FishInAni/juesedengchang6.png", type:Laya.Loader.IMAGE},
            {url:"res/spine/FishInAni/juesedengchang7.png", type:Laya.Loader.IMAGE},
            {url:"res/spine/FishInAni/juesedengchang8.png", type:Laya.Loader.IMAGE},
            {url:"res/spine/FishInAni/juesedengchang9.png", type:Laya.Loader.IMAGE}
		];
		//--- gulp update_preload_config ---
    }
    // //鱼登场spine动画
    // {url:"res/spine/FishInAni/juesedengchang.sk", type:Laya.Loader.BUFFER},
    // {url:"res/spine/FishInAni/juesedengchang.png", type:Laya.Loader.IMAGE},
    // {url:"res/spine/FishInAni/juesedengchang2.png", type:Laya.Loader.IMAGE},
    // {url:"res/spine/FishInAni/juesedengchang3.png", type:Laya.Loader.IMAGE},
    // {url:"res/spine/FishInAni/juesedengchang4.png", type:Laya.Loader.IMAGE},
    // {url:"res/spine/FishInAni/juesedengchang5.png", type:Laya.Loader.IMAGE},
    // {url:"res/spine/FishInAni/juesedengchang6.png", type:Laya.Loader.IMAGE},
    // {url:"res/spine/FishInAni/juesedengchang7.png", type:Laya.Loader.IMAGE},
    // {url:"res/spine/FishInAni/juesedengchang8.png", type:Laya.Loader.IMAGE},
}