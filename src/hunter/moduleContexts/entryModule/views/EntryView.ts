import inject = riggerIOC.inject;
import UIWindow from "../../../utils/UIWindow";
import FUIEntryView from "../../../fui/entry/FUIEntryView";
import FUIEntryItem from "../../../fui/entry/FUIEntryItem";
import { ScreenMode } from "../../../definitions/ScreenMode";
import playerModule from '../../playerModule/models/PlayerModel';
import EntryServer from "../../../moduleContexts/entryModule/servers/EntryServer";
import EnterRoomSignal from "../../roomModule/signals/EnterRoomSignal";
import PlayerInfoUpdateSignal from '../../playerModule/signals/PlayerInfoUpdateSignal';
import GoldAni from "../../../script/gold/GoldAni";
import UIManager from "../../../manager/UIManager";
import VideoPlayerView, { VideoPlayerViewParams } from "../../../commonView/VideoPlayerView";
import { VideoType } from "../../../definitions/VideoType";
import PlayerServer from "../../playerModule/servers/PlayerServer";
import TipView from "../../briefModule/views/TipView";
import DataLv from "../../../data/tpls/DataLv";
import BalanceUpdateSignal from "../../roomModule/signals/BalanceUpdateSignal";

export default class EntryView extends UIWindow<FUIEntryView> {
    /**server */
    @inject(EntryServer)
    entryServer: EntryServer;

    /**请求进入房间,需携带房间id */
    @inject(EnterRoomSignal)
    private enterRoomSignal: EnterRoomSignal;

    /**玩家信息更新信号 */
    @inject(PlayerInfoUpdateSignal)
    private playerInfoUpdateSignal: PlayerInfoUpdateSignal;

    /**玩家信息 */
    @inject(playerModule)
    private playerModule: playerModule;

    /**战斗服务 */
    @inject(PlayerServer)
    private playerServer: PlayerServer;

    /**玩家余额更新,这里主要处理充值更新 */
    @inject(BalanceUpdateSignal)
    private balanceUpdateSignal: BalanceUpdateSignal;

    constructor() {
        super();
        this.needMask = false;
        this.isCache = true;
    }

    public static getUrl(): string {
        return FUIEntryView.URL;
    }

    onInit() {
        super.onInit();
        this.createAni();
        this.createList();
    }

    onShown(): void {
        super.onShown();
        this.onResize(UIManager.instance.changedScreenMode);
        this.addEvent();
        this.playerServer.userInfoReq();
    }

    /**添加绑定 */
    private addEvent(): void {
        this.playerInfoUpdateSignal.on(this, this.updata);
        this.balanceUpdateSignal.on(this, this.onBalanceUpdate);
        this.contentPane.m_infoview.m_headBox.onClick(this, this.showInfoView);
        this.contentPane.m_context.on(fairygui.Events.CLICK_ITEM, this, this.clickList);
    }

    /**移除绑定 */
    private removeEvent(): void {
        this.playerInfoUpdateSignal.off(this, this.updata);
        this.balanceUpdateSignal.off(this, this.onBalanceUpdate);
        this.contentPane.m_infoview.m_headBox.offClick(this, this.showInfoView);
        this.contentPane.m_context.off(fairygui.Events.CLICK_ITEM, this, this.clickList);
    }

    /**背景动画 */
    createAni() {
        var player = new VideoPlayerView();
        let params: VideoPlayerViewParams = new VideoPlayerViewParams();
        params.url = "res/spine/dating/dating.sk";
        params.type = VideoType.Skeleton;
        params.screenMode = ScreenMode.None;
        player.init(params);
        player.setScale(1, 1);
        player.play("1", true);
        this.contentPane.m_bgAniBox.addChild(player);
    }

    /**list */
    private nameArr: string[] = ["cj", "zj", "gj"];
    createList() {
        // 动画参数
        let params: VideoPlayerViewParams = new VideoPlayerViewParams();
        params.url = "res/spine/icon/icon.sk";
        params.type = VideoType.Skeleton;
        params.screenMode = ScreenMode.None;

        for (var i = 0, len = 3; i < len; i++) {
            var icon: FUIEntryItem = FUIEntryItem.createInstance();
            var player = new VideoPlayerView();
            player.init(params);
            player.setScale(1, 1);
            player.play(i + 1 + "", true);
            icon.name = this.nameArr[i];
            icon.addChild(player);
            this.contentPane.m_context.addChild(icon);
        }
    }

    /**点击列表 */
    clickList(btn: FUIEntryItem) {
        let name: string = btn.name;
        var index: number = 0;
        switch (name) {
            case "cj":
                index = 1;
                break;
            case "zj":
                index = 2;
                break;
            case "gj":
                index = 3;
                break;
        }
        this.reqEnterRoom(index);
    }

    /**更新玩家数据 */
    private updata(): void {
        let maxLv = DataLv.getData(DataLv.getIds().length).lv;
        let info = this.playerModule.playerSelfInfo;
        let view = this.contentPane.m_infoview.m_headBox;
        let exp = this.playerModule.playerSelfInfo.exp;
        let curLv: number = info.lv;
        let persent: number;
        if(curLv >= maxLv) {
            persent = 1;
            curLv = maxLv;
        }
        else {
            let needExp: number = DataLv.getData(curLv + 1).exp;
            persent = exp / needExp;
        }
        let width = view.m_exeModule.width * persent;
        if (width == 0) width = 1;

        view.m_lvNum.text = `v${curLv}`;
        view.m_idText.text = `${info.name}`;
        view.m_persentText.text = Math.round(persent * 100) + "%";
        view.m_exeRect.width = width;

        let headImgNum: number = (curLv == 0) ? 1 : DataLv.getData(curLv).headId;
        view.m_headImg.url = "ui://briefUI/bydr_dt_icon_toux" + headImgNum;

        this.contentPane.m_infoview.m_goldText.text = `${(info.balance / 100).toFixed(2)}`;
    }

    /**玩家余额更新,处理充值更新 */
    private onBalanceUpdate([id, change]) {
        if (id == this.playerModule.playerSelfInfo.userId) {
            this.contentPane.m_infoview.m_goldText.text = `${(this.playerModule.playerSelfInfo.balance / 100).toFixed(2)}`;
        }
    }

    /**点击请求进入房间 */
    private reqEnterRoom(index: number): void {
        this.enterRoomSignal.dispatch(index);
    }

    /**显示信息面板 */
    showInfoView() {
        UIManager.instance.showWindow(TipView, true, UIManager.instance.popupLayer, [3]);
    }

    /**适配 */
    protected layout() {
        // 横背景
        let bgGroup: riggerLayout.Group = new riggerLayout.Group(this.contentPane.m_bg);
        bgGroup.name = 'bgGroup';
        bgGroup.height = riggerLayout.LayoutSpec.create(1, 1334 / 750, "100%");
        bgGroup.width = [
            riggerLayout.LayoutSpec.create(1334 / 750, -1, "100%"),
            riggerLayout.LayoutSpec.create(-1, 1, "100%"),
        ]
        bgGroup.verticalCenter = RiggerLayoutHelper.createScreenL("0%");
        bgGroup.horizontalCenter = 0;
        bgGroup.top = RiggerLayoutHelper.createScreenP(110);
        RiggerLayout.layer.addChild(bgGroup);

        // 横背景
        let bgAniGroup: riggerLayout.Group = new riggerLayout.Group(this.contentPane.m_bgAniBox);
        bgAniGroup.name = 'bgAniGroup';
        bgAniGroup.height = riggerLayout.LayoutSpec.create(1, 1334 / 750, "100%");
        bgAniGroup.width = [
            riggerLayout.LayoutSpec.create(1334 / 750, -1, "100%"),
            riggerLayout.LayoutSpec.create(-1, 1, "100%"),
        ]
        bgAniGroup.verticalCenter = RiggerLayoutHelper.createScreenL("0%");
        bgAniGroup.horizontalCenter = 0;
        bgAniGroup.top = RiggerLayoutHelper.createScreenP(110);
        RiggerLayout.layer.addChild(bgAniGroup);

        // 竖背景
        let bg2Group: riggerLayout.Group = new riggerLayout.Group(this.contentPane.m_bg2);
        bg2Group.name = 'bg2Group';
        bg2Group.height = riggerLayout.LayoutSpec.create(-1, 750 / 1334, "100%");
        bg2Group.width = riggerLayout.LayoutSpec.create(750 / 1334, 1, "100%");
        RiggerLayout.layer.addChild(bg2Group);

        // 信息
        let infoGroup: riggerLayout.Group = new riggerLayout.Group(this.contentPane.m_infoview);
        infoGroup.name = 'infoGroup';
        infoGroup.width = [
            riggerLayout.LayoutSpec.create(1, 1334 / 750, "72%"),
            riggerLayout.LayoutSpec.create(-1, 1, "100%")
        ]
        infoGroup.height = riggerLayout.LayoutSpec.create(1334 / 750, -1, "33.3%");
        RiggerLayout.layer.addChild(infoGroup);

        // list
        let contextGroup: riggerLayout.Group = new riggerLayout.Group(this.contentPane.m_context);
        contextGroup.name = 'contextGroup';
        contextGroup.horizontalCenter = 0;
        contextGroup.verticalCenter = RiggerLayoutHelper.createScreenL("0%");
        contextGroup.width = [
            riggerLayout.LayoutSpec.create(1, 1334 / 750, "83.5%"),
            riggerLayout.LayoutSpec.create(-1, 1, "83.5%")
        ];
        contextGroup.height = riggerLayout.LayoutSpec.create(1334 / 750, -1, "52.2%");
        contextGroup.top = RiggerLayoutHelper.createScreenP(150);
        RiggerLayout.layer.addChild(contextGroup);

        // 菜单
        let menuGroup: riggerLayout.Group = new riggerLayout.Group(this.contentPane.m_menu);
        menuGroup.name = 'menuGroup';
        menuGroup.top = RiggerLayoutHelper.createScreenL("1.5%");
        menuGroup.right = RiggerLayoutHelper.createScreenL("1%");
        menuGroup.height = [
            RiggerLayoutHelper.createScreenL("74%"),
            riggerLayout.LayoutSpec.create(750 / 1334, 1, "38.6%")
        ]
        menuGroup.width = riggerLayout.LayoutSpec.create(-1, 750 / 1334, "78.6%");
        menuGroup.horizontalCenter = RiggerLayoutHelper.createScreenP(0);
        menuGroup.bottom = RiggerLayoutHelper.createScreenP("10%");
        RiggerLayout.layer.addChild(menuGroup);

        // jackPot
        // let jkPortGroup: riggerLayout.Group = new riggerLayout.Group(this.contentPane.m_jkPort);
        // jkPortGroup.name = 'jkPortGroup';
        // jkPortGroup.bottom = RiggerLayoutHelper.createScreenL("0.05%");
        // jkPortGroup.left = RiggerLayoutHelper.createScreenL("1.5%");
        // jkPortGroup.top = RiggerLayoutHelper.createScreenP("2%");
        // jkPortGroup.right = RiggerLayoutHelper.createScreenP("4%");
        // jkPortGroup.height = [
        //     RiggerLayoutHelper.createScreenL("23%"),
        //     riggerLayout.LayoutSpec.create(750 / 1334, 1, "13%")
        // ];
        // jkPortGroup.width = [
        //     riggerLayout.LayoutSpec.create(-1, 750 / 1334, "29.2%")
        // ]
        // RiggerLayout.layer.addChild(jkPortGroup);
    }

    /**移除适配 */
    protected removeLayout() {
        RiggerLayout.layer.remove(this.contentPane.m_bg);
        RiggerLayout.layer.remove(this.contentPane.m_bg2);
        RiggerLayout.layer.remove(this.contentPane.m_bgAniBox);
        RiggerLayout.layer.remove(this.contentPane.m_infoview);
        RiggerLayout.layer.remove(this.contentPane.m_context);
        RiggerLayout.layer.remove(this.contentPane.m_menu);
        // RiggerLayout.layer.remove(this.contentPane.m_jkPort);
    }

    /**
     * 屏幕尺寸变化的回调
     */
    protected onResize(changedScreenMode: ScreenMode) {
        var infoGroup = RiggerLayout.layer.getElementByName("infoGroup") as riggerLayout.Group;
        var menuGroup = RiggerLayout.layer.getElementByName("menuGroup") as riggerLayout.Group;

        let ratio: number = Laya.stage.width / Laya.stage.height;
        if (ratio == 1 || !this.contentPane) return;
        if (ratio > 1) {
            // 横屏
            this.contentPane.m_c1.selectedIndex = 0;
            this.contentPane.m_menu.width = 102;
            this.contentPane.m_menu.height = 567;
        } else {
            // 竖屏
            this.contentPane.m_c1.selectedIndex = 1;
            this.contentPane.m_menu.width = 556;
            this.contentPane.m_menu.height = 495;
        }

        infoGroup && infoGroup.onChildRectangleChange();
        menuGroup && menuGroup.onChildRectangleChange();
    }

    onHide(): void {
        super.onHide();
        this.removeEvent();
    }

    dispose() {
        this.entryServer = null;
        super.dispose();
    }
}