import inject = riggerIOC.inject;
import * as protocol from '../../../protocol/protocols/protocols';
import FUIRoomTipsView from '../../../fui/roomScene/FUIRoomTipsView';
import FUIsettingBtn from '../../../fui/roomScene/FUIsettingBtn';
import ExitRoomSignal from '../signals/ExitRoomSignal';
import openReportSignal from '../../entryModule/signals/openReportSignal';
import OpenHelpViewSignal from '../../entryModule/signals/OpenHelpViewSignal';
import OpenSetViewSignal from '../../entryModule/signals/OpenSetViewSignal';
import FUIcatchAllLineView from '../../../fui/roomScene/FUIcatchAllLineView';
import CatchAllAniView from '../../../script/fish/fishScript/CatchAllAniView';
import VideoPlayerView, { VideoPlayerViewParams } from '../../../commonView/VideoPlayerView';
import { VideoType } from '../../../definitions/VideoType';
import { ScreenMode } from '../../../definitions/ScreenMode';
import ShowTipsSignal from '../signals/ShowTipsSignal';
import ConnectService from '../../../gameServices/connectService/ConnectService';
export default class RoomTipsView extends FUIRoomTipsView {
    /**退出房间 */
    @inject(ExitRoomSignal)
    private exitRoomSignal: ExitRoomSignal;

    /**打开报表 */
    @inject(openReportSignal)
    private openReportSignal: openReportSignal;

    /**打开帮助 */
    @inject(OpenHelpViewSignal)
    private openHelpViewSignal: OpenHelpViewSignal;

    /**打开设置 */
    @inject(OpenSetViewSignal)
    private openSetViewSignal: OpenSetViewSignal;

    /**展示提示 */
    @inject(ShowTipsSignal)
    private showTipsSignal: ShowTipsSignal;

    constructor() {
        super();
    }

    protected constructFromXML(xml: any): void {
        super.constructFromXML(xml);
        this.init();
        this.addEventListener();
        // this.playFullScreenGoldAni();
        // this.playFullScreenBoomAni();
    }

    /**
     * 顶级页面调用
     */
    show() {
    }

    /**
     * 顶级页面调用
     */
    hide() {
    }

    public init() {
        this.initMenuBtn();
        this.initFishInAni();
    }

    initMenuBtn() {
        this.m_menuView.m_c1.selectedIndex = 0;
        if(!ConnectService.instance._getMetaValue('recordUrl')) {
            let item = this.m_menuView.m_menuBtnListView.m_menuBtnList.getChild('reportBtn');
            item && this.m_menuView.m_menuBtnListView.m_menuBtnList.removeChildToPool(item);
        }
    }

    /**
     * 初始化鱼登场的spine动画
     */
    private fishInVideoPlayer: VideoPlayerView;
    initFishInAni() {
        this.fishInVideoPlayer = new VideoPlayerView();
        let params: VideoPlayerViewParams = new VideoPlayerViewParams();
        params.url = 'res/spine/FishInAni/juesedengchang.sk';
        params.type = VideoType.Skeleton;
        params.screenMode = ScreenMode.None;
        this.fishInVideoPlayer.init(params);
        this.fishInVideoPlayer.x = 0;
        this.fishInVideoPlayer.y = 0;
        this.fishInVideoPlayer.visible = false;
        this.fishInVideoPlayer.touchable = false;
    }

    addEventListener() {
        this.m_menuView.m_menuBtn.on(Laya.Event.CLICK, this, this.onShowMenuBtnClick);
        this.m_menuView.m_menuBtnListView.m_menuBtnList.on(fairygui.Events.CLICK_ITEM, this, this.onMenuItemClick);
        this.showTipsSignal.on(this, this.onShowTips);
    }

    removeEventListener() {
        this.m_menuView.m_menuBtn.off(Laya.Event.CLICK, this, this.onShowMenuBtnClick);
        this.m_menuView.m_menuBtnListView.m_menuBtnList.off(fairygui.Events.CLICK_ITEM, this, this.onMenuItemClick);
        this.showTipsSignal.off(this, this.onShowTips);
    }

    private onShowTips(index: number) {
        this.playTips(index);
    }

    /**
     * 菜单界面收缩展开
     */
    private onShowMenuBtnClick(e: Laya.Event) {
        e.stopPropagation();
        this.m_menuView.m_c1.selectedIndex = 1 - this.m_menuView.m_c1.selectedIndex;
    }

    private onMenuItemClick(btn: FUIsettingBtn) {
        let name = btn.name;
        switch (name) {
            case 'setBtn':
                this.openSetViewSignal.dispatch();
                break;
            case 'helpBtn':
                this.openHelpViewSignal.dispatch();
                break;
            case 'reportBtn':
                this.openReportSignal.dispatch();
                break;
            case 'returnBtn':
                this.exitRoomSignal.dispatch();
                break;
            default:
                break;
        }
    }

    /**
     * 鱼潮来袭动画
     */
    playFishBoomAni() {
        this.m_t0.play();
    }

    /**
     * 播放提示语句
     * @param index 1-余额不足
     */
    playTips(index: number) {
        if(this.m_tipsView.m_t0.playing) return;
        this.m_tipsView.m_tipsLoader.url = `ui://roomScene/tips${index}`;
        this.m_tipsView.m_t0.play(Laya.Handler.create(this, () => {
            this.m_tipsView.m_tipsLoader.url = '';
        }), 1);
    }

    //待播的入场动画
    private waitForPlay: string[] = [];
    /**
     * 播放鱼的入场动画
     * @param aniIndex 0-海盗船 1-黄金鲨鱼 2-美人鱼
     */
    playFishInAni(aniIndex: number) {
        let actName: string[] = ['1', '2', '3'];
        this.waitForPlay.push(actName[aniIndex]);
        if(!this.fishVideoPlayerIsPlaying) {
            this.playFishVideoplayer(this.waitForPlay[0])
        }
    }
    
    /**
     * 真正处理播放鱼入场动画的逻辑
     */
    private fishVideoPlayerIsPlaying: boolean = false;
    private playFishVideoplayer(actName: string) {
        if(!this.fishInVideoPlayer.parent) {
            this.addChild(this.fishInVideoPlayer);
        }
        this.fishInVideoPlayer.visible = true;
        this.fishVideoPlayerIsPlaying = true;
        this.waitForPlay.splice(0, 1);
        this.fishInVideoPlayer.play(actName, false, Laya.Handler.create(this, () => {
            this.fishVideoPlayerIsPlaying = false;
            this.fishInVideoPlayer.visible = false;
            //播放下一个动画
            if(this.waitForPlay.length >= 1) {
                this.playFishVideoplayer(this.waitForPlay[0]);
            }
            else {
                this.fishInVideoPlayer.removeFromParent();
            }
        }));
    }
}