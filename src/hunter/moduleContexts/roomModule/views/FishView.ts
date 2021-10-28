import inject = riggerIOC.inject;
import * as protocol from '../../../protocol/protocols/protocols';
import FUIFishContent from "../../../fui/roomScene/FUIFishContent";
import FishUtils from '../../../script/fish/utils/FishUtils';
import FUINormalFish from '../../../fui/roomScene/FUINormalFish';
import AbstractFish from '../../../script/fish/fishScript/AbstractFish';
import PlayerModel from '../../playerModule/models/PlayerModel';
import { fishTypeEnum } from '../../../script/enum/FishEnum';
import FUITriStarFish from '../../../fui/roomScene/FUITriStarFish';
import FUIFourFish from '../../../fui/roomScene/FUIFourFish';
import DataMon from '../../../data/tpls/DataMon';
import { FullScreenGoldAniView } from './FullScreenGoldAniView';
export default class FishView extends FUIFishContent {
    @inject(PlayerModel)
    private playerModel: PlayerModel;

    constructor() {
        super();
    }

    protected constructFromXML(xml: any): void {
        super.constructFromXML(xml);
        this.init();
    }

    public init() {
        this.isFrozen = false;
        this.m_fullScreenBoomAniLoader.playing = false;
        // Laya.timer.loop(4000, this, this.playAniTest);
        // this.playFullScreenFrozenAni(1000*1000);
    }

    private testAniIdx = 0;
    playAniTest() {
        let aniName = ['playFullScreenGoldAni', 'playFullScreenBoomAni', 'playFullScreenFrozenAni'];
        // if(this.testAniIdx == 2) this[`${aniName[this.testAniIdx]}`](3000);
        // else this[`${aniName[this.testAniIdx]}`]();
        // this.testAniIdx += 1;
        // if(this.testAniIdx > 2) this.testAniIdx = 0;
        this.playFullScreenGoldAni();
    }

    /**
     * 添加新鱼
     * @param fishInfo
     */
    public addFish(fishInfo: protocol.MonInfo): FUINormalFish {
        let buffType = DataMon.getData(fishInfo.monTypeId).buffType;
        // console.log(`time==${rigger.service.TimeService.instance.serverTime},,,,fishTime==${fishInfo.createTime}`);
        let fish: any;
        switch(buffType) {
            case fishTypeEnum.triStar:
                fish = FishUtils.getTriStarFish() as FUITriStarFish; //大三元
                break;
            case fishTypeEnum.four:
                fish = FishUtils.getFourFish() as FUIFourFish; //大四喜
                break;
            default:
                fish = FishUtils.getNormalFish() as FUINormalFish; //其他类型
                break;
        }
        (fish.displayObject.getComponent(AbstractFish) as AbstractFish).init(fishInfo);
        fish.alpha = 0;
        this.addChild(fish);
        this.adjustBatteryZindex(fish.sortingOrder);
        return fish;
    }

    /**
     * 调整层级
     * @param zIndex 
     */
    adjustBatteryZindex(zIndex: number) {
        this.m_fullScreenFrozenAniLoader.sortingOrder = zIndex + 1;
        this.m_fullScreenBoomAniLoader.sortingOrder = zIndex + 2;
        this.m_fullScreenGoldAniView.sortingOrder = zIndex + 3;
    }

    public isFrozen: boolean = false;
    /**
     * 全屏冰冻动画,因为层级关系,固从tipView移入该页面
     * @param time 冰冻时间
     */
    playFullScreenFrozenAni(time: number) {
        if(this.isFrozen) return;
        this.isFrozen = true;
        Laya.timer.once(time, this, () => {
            this.m_fullScreenFrozenAniLoader.url = ``;
            this.isFrozen = false;
        });
        this.m_fullScreenFrozenAniLoader.url = `ui://roomScene/fullScreenFrozenAni`;
        this.m_fullScreenFrozenAniLoader.playing = true;
        if(this.m_fullScreenFrozenAniLoader.content instanceof fairygui.display.MovieClip) {
            this.m_fullScreenFrozenAniLoader.content.setPlaySettings(0, -1, 1, -1, Laya.Handler.create(this, () => {
                this.m_fullScreenFrozenAniLoader.playing = false;
                this.m_fullScreenFrozenAniLoader.frame = 8;
            }));
        }
    }

    /**
     * 全屏金币动画
     */
    playFullScreenGoldAni() {
        (this.m_fullScreenGoldAniView as FullScreenGoldAniView).playGoldAni();
    }

    /**
     * 全屏爆炸动画
     */
    playFullScreenBoomAni() {
        if(this.m_fullScreenBoomAniLoader.playing) return;
        this.m_fullScreenBoomAniLoader.url = `ui://roomScene/fullScreenBoomAni`;
        this.m_fullScreenBoomAniLoader.playing = true;
        if(this.m_fullScreenBoomAniLoader.content instanceof fairygui.display.MovieClip) {
            this.m_fullScreenBoomAniLoader.content.setPlaySettings(0, -1, 1, -1, Laya.Handler.create(this, () => {
                this.m_fullScreenBoomAniLoader.playing = false;
                this.m_fullScreenBoomAniLoader.url = '';
            }));
        }
    }
}