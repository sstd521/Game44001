import UIWindow from "../../../utils/UIWindow";
import FUIRoomView from "../../../fui/roomScene/FUIRoomView";
import FUIFishContent from "../../../fui/roomScene/FUIFishContent";
import FishView from "./FishView";
import BulletView from "./BulletView";
import RoomTipsView from "./RoomTipsView";
import DynamicSource from "../../../definitions/DynamicSource";
import inject = riggerIOC.inject;
import RoomViewLoadSignal from "../signals/RoomViewLoadSignal";
import VideoPlayerView, { VideoPlayerViewParams } from "../../../commonView/VideoPlayerView";
import { VideoType } from "../../../definitions/VideoType";
import { ScreenMode } from "../../../definitions/ScreenMode";
export default class RoomView extends UIWindow<FUIRoomView> {
    @inject(RoomViewLoadSignal)
    private roomViewLoadSignal: RoomViewLoadSignal;

    constructor() {
        super();
        this.needMask = false;
        this.isCache = false;
    }

    static getUrl(): string {
        return FUIRoomView.URL;
    }

    onInit() {
        super.onInit();
    }

    onShown() {
        super.onShown();
        this.addEventListener();
        this.addProtocolListener();
        // Laya.timer.frameLoop(4, this, this.bgMove);
        this.bgMove();
        if(!RoomView._loadingView) {
            this.roomViewLoadSignal.dispatch();
        }
        // this.initBgWaveAni();
    }

    onHide() {
        super.onHide();
        this.removerEventListener();
        this.removerProtocolListener();
        // Laya.timer.clear(this, this.bgMove);
        this.cancelBgMove();
    }

    /**
     * 获取鱼界面的实例
     */
    get fishView(): FishView {
        return this.contentPane.m_content.m_fishView as FishView;
    }

    /**
     * 获取子弹界面的实例
     */
    get bulletView(): BulletView {
        return this.contentPane.m_content.m_bulletView as BulletView;
    }

    /**
     * 获取提示界面的实例
     */
    get roomTipsView(): RoomTipsView {
        return this.contentPane.m_content.m_tipsView as RoomTipsView;
    }

    layout() {
        let bgGroup: riggerLayout.Group = new riggerLayout.Group(this.contentPane.m_bg);
        bgGroup.horizontalCenter = 0;
        bgGroup.verticalCenter = 0;
        bgGroup.width = riggerLayout.LayoutSpec.create(1334/750, -1, '100%');
        bgGroup.height = riggerLayout.LayoutSpec.create(1, 1334/750, '100%');
        RiggerLayout.layer.addChild(bgGroup);

        let contentGroup: riggerLayout.Group = new riggerLayout.Group(this.contentPane.m_content);
        contentGroup.top = 0;
        contentGroup.left = 0;
        contentGroup.width = `100%`;
        contentGroup.height = `100%`;
        RiggerLayout.layer.addChild(contentGroup);
    }

    removeLayout() {
        RiggerLayout.layer.remove(this.contentPane.m_bg);
        RiggerLayout.layer.remove(this.contentPane.m_content);
    }

    funEx() {

    }

    addEventListener() {

    }

    removerEventListener() {

    }

    addProtocolListener() {

    }

    removerProtocolListener() {

    }

    // initBgWaveAni() {
    //     let videoPlayer1: VideoPlayerView = new VideoPlayerView();
    //     let videoPlayer2: VideoPlayerView = new VideoPlayerView();

    //     let params: VideoPlayerViewParams = new VideoPlayerViewParams();
    //     params.url = "res/spine/bgWaveAni/water.sk";
    //     params.type = VideoType.Skeleton;
    //     params.screenMode = ScreenMode.None;

    //     videoPlayer1.init(params);
    //     videoPlayer1.setScale(1, 1);
    //     videoPlayer1.play("1", true);
    //     videoPlayer1.setXY(650, 500);

    //     videoPlayer2.init(params);
    //     videoPlayer2.setScale(1, 1);
    //     videoPlayer2.play("2", true);
    //     videoPlayer2.setXY(800 , 200);

    //     // this.contentPane.m_bg.m_waveAniVew.addChild(videoPlayer1);
    //     // this.contentPane.m_bg.m_waveAniVew.addChild(videoPlayer2);
    // }

    bgMove() {
        this.contentPane.m_bg.m_t0.setDuration('move1', 500);
        this.contentPane.m_bg.m_t1.setDuration('move2', 500);
        this.t1Play();
    }

    t1Play() {
        this.contentPane.m_bg.m_t0.play(Laya.Handler.create(this, this.t2Play), 1, null, 0, -1);
    }

    t2Play() {
        this.contentPane.m_bg.m_t1.play(Laya.Handler.create(this, this.t1Play), 1, null, 0, -1);
    }

    cancelBgMove() {
        this.contentPane.m_bg.m_t0.stop();
        this.contentPane.m_bg.m_t1.stop();
    }

    /**
     * 动态加载资源
     */
    protected configUISource() {
        //--- gulp update_preload_config ---
		this.addUISource(new DynamicSource(this, "res/fui/roomScene/roomScene_atlas0.png", Laya.Loader.IMAGE, "roomScene")),
		this.addUISource(new DynamicSource(this, "res/fui/roomScene/roomScene_atlas0_1.png", Laya.Loader.IMAGE, "roomScene")),
		this.addUISource(new DynamicSource(this, "res/fui/roomScene/roomScene_atlas_9lp31.png", Laya.Loader.IMAGE, "roomScene")),
		this.addUISource(new DynamicSource(this, "res/fui/roomScene/roomScene_atlas_9lp32.png", Laya.Loader.IMAGE, "roomScene")),
		this.addUISource(new DynamicSource(this, "res/fui/roomScene/roomScene_atlas_9lp33.png", Laya.Loader.IMAGE, "roomScene")),
		this.addUISource(new DynamicSource(this, "res/fui/roomScene/roomScene_atlas_9lp34.png", Laya.Loader.IMAGE, "roomScene")),
		this.addUISource(new DynamicSource(this, "res/fui/roomScene/roomScene_atlas_9lp35.png", Laya.Loader.IMAGE, "roomScene")),
		this.addUISource(new DynamicSource(this, "res/fui/roomScene/roomScene_atlas_9lp36.png", Laya.Loader.IMAGE, "roomScene")),
		this.addUISource(new DynamicSource(this, "res/fui/roomScene/roomScene_atlas_9lp3i.png", Laya.Loader.IMAGE, "roomScene")),
		this.addUISource(new DynamicSource(this, "res/fui/roomScene/roomScene_atlas_9lp3j.png", Laya.Loader.IMAGE, "roomScene")),
		this.addUISource(new DynamicSource(this, "res/fui/roomScene/roomScene_atlas_9lp3k.png", Laya.Loader.IMAGE, "roomScene")),
		this.addUISource(new DynamicSource(this, "res/fui/roomScene/roomScene_atlas_czni74b.png", Laya.Loader.IMAGE, "roomScene")),
		this.addUISource(new DynamicSource(this, "res/fui/roomScene/roomScene_atlas_czni74c.png", Laya.Loader.IMAGE, "roomScene")),
		this.addUISource(new DynamicSource(this, "res/fui/roomScene/roomScene_atlas_czni74d.png", Laya.Loader.IMAGE, "roomScene")),
		this.addUISource(new DynamicSource(this, "res/fui/roomScene/roomScene_atlas_czni74e.png", Laya.Loader.IMAGE, "roomScene")),
		this.addUISource(new DynamicSource(this, "res/fui/roomScene/roomScene_atlas_czni74f.png", Laya.Loader.IMAGE, "roomScene")),
		this.addUISource(new DynamicSource(this, "res/fui/roomScene/roomScene_atlas_glv2p.png", Laya.Loader.IMAGE, "roomScene")),
		this.addUISource(new DynamicSource(this, "res/fui/roomScene/roomScene_atlas_h8iq79m.png", Laya.Loader.IMAGE, "roomScene")),
		this.addUISource(new DynamicSource(this, "res/fui/roomScene/roomScene_atlas_ix0816.png", Laya.Loader.IMAGE, "roomScene")),
		this.addUISource(new DynamicSource(this, "res/fui/roomScene/roomScene_atlas_ix0817.png", Laya.Loader.IMAGE, "roomScene")),
		this.addUISource(new DynamicSource(this, "res/fui/roomScene/roomScene_atlas_ix0818.png", Laya.Loader.IMAGE, "roomScene")),
		this.addUISource(new DynamicSource(this, "res/fui/roomScene/roomScene_atlas_ix0819.png", Laya.Loader.IMAGE, "roomScene")),
		this.addUISource(new DynamicSource(this, "res/fui/roomScene/roomScene_atlas_m1sv79n.png", Laya.Loader.IMAGE, "roomScene")),
		this.addUISource(new DynamicSource(this, "res/fui/roomScene/roomScene_atlas_n86c773.png", Laya.Loader.IMAGE, "roomScene")),
		this.addUISource(new DynamicSource(this, "res/fui/roomScene/roomScene_atlas_n86c77g.png", Laya.Loader.IMAGE, "roomScene")),
		this.addUISource(new DynamicSource(this, "res/fui/roomScene/roomScene_atlas_n86c77h.png", Laya.Loader.IMAGE, "roomScene")),
		this.addUISource(new DynamicSource(this, "res/fui/roomScene/roomScene_atlas_n86c77i.png", Laya.Loader.IMAGE, "roomScene")),
		this.addUISource(new DynamicSource(this, "res/fui/roomScene/roomScene_atlas_n86c77k.png", Laya.Loader.IMAGE, "roomScene")),
		this.addUISource(new DynamicSource(this, "res/fui/roomScene/roomScene_atlas_n86c77l.png", Laya.Loader.IMAGE, "roomScene")),
		this.addUISource(new DynamicSource(this, "res/fui/roomScene/roomScene_atlas_n86c77m.png", Laya.Loader.IMAGE, "roomScene")),
		this.addUISource(new DynamicSource(this, "res/fui/roomScene/roomScene_atlas_n86c78h.png", Laya.Loader.IMAGE, "roomScene")),
		this.addUISource(new DynamicSource(this, "res/fui/roomScene/roomScene_atlas_nyu978p.png", Laya.Loader.IMAGE, "roomScene")),
		this.addUISource(new DynamicSource(this, "res/fui/roomScene/roomScene_atlas_nyu9794.png", Laya.Loader.IMAGE, "roomScene")),
		this.addUISource(new DynamicSource(this, "res/fui/roomScene/roomScene_atlas_q4y6717.png", Laya.Loader.IMAGE, "roomScene")),
		this.addUISource(new DynamicSource(this, "res/fui/roomScene/roomScene_atlas_q4y6718.png", Laya.Loader.IMAGE, "roomScene")),
		this.addUISource(new DynamicSource(this, "res/fui/roomScene/roomScene_atlas_rgdn795.png", Laya.Loader.IMAGE, "roomScene")),
		this.addUISource(new DynamicSource(this, "res/fui/roomScene/roomScene_atlas_rgdn796.png", Laya.Loader.IMAGE, "roomScene")),
		this.addUISource(new DynamicSource(this, "res/fui/roomScene/roomScene_atlas_rzeh72k.png", Laya.Loader.IMAGE, "roomScene")),
		this.addUISource(new DynamicSource(this, "res/fui/roomScene/roomScene_atlas_rzeh72l.png", Laya.Loader.IMAGE, "roomScene")),
		this.addUISource(new DynamicSource(this, "res/fui/roomScene/roomScene_atlas_rzeh72m.png", Laya.Loader.IMAGE, "roomScene")),
		this.addUISource(new DynamicSource(this, "res/fui/roomScene/roomScene_atlas_rzeh72o.png", Laya.Loader.IMAGE, "roomScene")),
		this.addUISource(new DynamicSource(this, "res/fui/roomScene/roomScene_atlas_rzeh72p.png", Laya.Loader.IMAGE, "roomScene")),
		this.addUISource(new DynamicSource(this, "res/fui/roomScene/roomScene_atlas_rzeh72r.png", Laya.Loader.IMAGE, "roomScene")),
		this.addUISource(new DynamicSource(this, "res/fui/roomScene/roomScene_atlas_uhyn79a.png", Laya.Loader.IMAGE, "roomScene")),
		this.addUISource(new DynamicSource(this, "res/fui/roomScene/roomScene_atlas_uhyn79b.png", Laya.Loader.IMAGE, "roomScene")),
		this.addUISource(new DynamicSource(this, "res/fui/roomScene/roomScene_atlas_v27g746.png", Laya.Loader.IMAGE, "roomScene")),
		this.addUISource(new DynamicSource(this, "res/fui/roomScene/roomScene_atlas_v27g747.png", Laya.Loader.IMAGE, "roomScene")),
		this.addUISource(new DynamicSource(this, "res/fui/roomScene/roomScene_atlas_v27g748.png", Laya.Loader.IMAGE, "roomScene")),
		this.addUISource(new DynamicSource(this, "res/fui/roomScene/roomScene_atlas_v27g749.png", Laya.Loader.IMAGE, "roomScene")),
		this.addUISource(new DynamicSource(this, "res/fui/roomScene/roomScene_atlas_v27g74a.png", Laya.Loader.IMAGE, "roomScene")),
		this.addUISource(new DynamicSource(this, "res/fui/roomScene/roomScene_atlas_vmmd767.png", Laya.Loader.IMAGE, "roomScene")),
		this.addUISource(new DynamicSource(this, "res/fui/roomScene/roomScene_atlas_vmmd768.png", Laya.Loader.IMAGE, "roomScene")),
		this.addUISource(new DynamicSource(this, "res/fui/roomScene/roomScene_atlas_vmmd769.png", Laya.Loader.IMAGE, "roomScene")),
		this.addUISource(new DynamicSource(this, "res/fui/roomScene/roomScene_atlas_vmmd76a.png", Laya.Loader.IMAGE, "roomScene")),
		this.addUISource(new DynamicSource(this, "res/fui/roomScene/roomScene_atlas_vmmd76b.png", Laya.Loader.IMAGE, "roomScene")),
		this.addUISource(new DynamicSource(this, "res/fui/roomScene/roomScene_atlas_vmmd76c.png", Laya.Loader.IMAGE, "roomScene")),
		this.addUISource(new DynamicSource(this, "res/fui/roomScene/roomScene_atlas_vmmd76d.png", Laya.Loader.IMAGE, "roomScene")),
		this.addUISource(new DynamicSource(this, "res/fui/roomScene/roomScene_atlas_vmmd76e.png", Laya.Loader.IMAGE, "roomScene")),
		this.addUISource(new DynamicSource(this, "res/fui/roomScene/roomScene_atlas_vmmd76f.png", Laya.Loader.IMAGE, "roomScene")),
		this.addUISource(new DynamicSource(this, "res/fui/roomScene/roomScene_atlas_vmmd76g.png", Laya.Loader.IMAGE, "roomScene")),
		this.addUISource(new DynamicSource(this, "res/fui/roomScene/roomScene_atlas_vmmd76h.png", Laya.Loader.IMAGE, "roomScene")),
		this.addUISource(new DynamicSource(this, "res/fui/roomScene/roomScene_atlas_vmmd76i.png", Laya.Loader.IMAGE, "roomScene")),
		this.addUISource(new DynamicSource(this, "res/fui/roomScene/roomScene_atlas_vmmd76j.png", Laya.Loader.IMAGE, "roomScene")),
		this.addUISource(new DynamicSource(this, "res/fui/roomScene/roomScene_atlas_vmmd76o.png", Laya.Loader.IMAGE, "roomScene")),
		this.addUISource(new DynamicSource(this, "res/fui/roomScene/roomScene_atlas_vmmd76o_1.png", Laya.Loader.IMAGE, "roomScene"))	
		//--- gulp update_preload_config ---
    }

}