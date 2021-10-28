import FishUtils from "../utils/FishUtils";
import * as protocol from '../../../protocol/protocols/protocols';
import AbstractFish from "./AbstractFish";
import FUIBullet from "../../../fui/roomScene/FUIBullet";
import NormalBullet from "../../bullet/bulletScript/NormalBullet";
import inject = riggerIOC.inject;
import FightServer from "../../../moduleContexts/fightModule/servers/fightServer";
import DataMon from "../../../data/tpls/DataMon";
import { fishTypeEnum } from "../../enum/FishEnum";
import PlayerModel from "../../../moduleContexts/playerModule/models/PlayerModel";
import FilterUtils from "../utils/FilterUtils";
export default class NormalFish extends AbstractFish {
    @inject(FightServer)
    private fightServer: FightServer;

    @inject(PlayerModel)
    private playerModel: PlayerModel;

    constructor() {
        super();
    }

    onAwake() {
        super.onAwake();
    }

    onEnable(): void {
        this.crashZone = [];
        this.crashZone = DataMon.getData(this.fishTypeId).crashZone;
        //美人鱼,冰霜美人鱼需用多个碰撞矩形
        if(this.crashZone && this.crashZone.length > 2) {
            for(let i = 0; i < Math.floor(this.crashZone.length / 2); i++) {
                let boxColider: Laya.BoxCollider = this.owner.addComponent(Laya.BoxCollider);
                boxColider.height = 1;
                boxColider.width = 1;
                boxColider.isSensor = true;
                boxColider.label = '';
                boxColider.enabled = true;
                this.boxCliders.push(boxColider);
            }
        }
        else {
            if(this.boxCliders) {
                for(let j = 0; j < this.boxCliders.length; j++) {
                    this.boxCliders[j].destroy();
                    this.boxCliders.splice(j, 1);
                }
            }
        }
        super.onEnable();
    }

    onUpdate(): void {
        super.onUpdate();
    }

    onTriggerEnter(other: any, self: any, contact: any): void {

    }

    onTriggerExit(other: any, self: any, contact: any): void {
    }

    onDisable(): void {
        super.onDisable();
        if(this.boxCliders) {
            for(let i = 0; i < this.boxCliders.length; i++) {
                this.boxCliders[i] && (this.boxCliders[i].enabled = false);
            }
        }
    }

    onResize() {
        super.onResize();
        if(this.boxCliders && this.boxCliders.length > 0) {
            this.setBoxColiders(); //多个
        }
        else {
            this.setBoxColider(); //单个
        }
    }

    /**
     * 鱼实例化之后，手动调用
     * @param fishInfo 
     */
    init(fishInfo: protocol.MonInfo) {
        super.init(fishInfo);
        let buffType = DataMon.getData(this.fishTypeId).buffType;
        if(buffType == fishTypeEnum.boom) {
            this.owner[`$owner`].m_aimSignLoader.x += 50;
        }
    }

    /**碰撞矩形 */
    private crashZone: number[] = [];
    /**
     * 设置鱼的ui
     */
    setFishLoader() {
        let type: number;
        let buffUrl: string = '';
        switch(DataMon.getData(this.fishTypeId).buffType) {
            case fishTypeEnum.catchAll:
                buffUrl = `ui://roomScene/catchAll`;
                break;
            case fishTypeEnum.jackPot:
                buffUrl = `ui://roomScene/jackPot`;
                break;
            default:
                break;
        }

        let filter: Laya.ColorFilter;
        switch(DataMon.getData(this.fishTypeId).fishType) {
            case 18:
                this.owner[`$owner`].m_specalAniLoader.url = `ui://roomScene/fishSpecalAni_18&19`;
                this.owner[`$owner`].m_specalAniLoader.scaleX = -Math.abs(this.owner[`$owner`].m_specalAniLoader.scaleX);
                filter = FilterUtils.getColorMatrix("#DEFEFF");
                break;
            case 19:
                this.owner[`$owner`].m_specalAniLoader.url = `ui://roomScene/fishSpecalAni_18&19`;
                this.owner[`$owner`].m_specalAniLoader.scaleX = -Math.abs(this.owner[`$owner`].m_specalAniLoader.scaleX);
                filter = FilterUtils.getColorMatrix("#FFF691");
                break;
            case 20:
                this.owner[`$owner`].m_specalAniLoader.url = `ui://roomScene/fishSpecalAni_20`;
                this.owner[`$owner`].m_specalAniLoader.scaleX = -Math.abs(this.owner[`$owner`].m_specalAniLoader.scaleX);
                break;
            default:
                this.owner[`$owner`].m_specalAniLoader.url = '';
                this.owner[`$owner`].m_specalAniLoader.scaleX = Math.abs(this.owner[`$owner`].m_specalAniLoader.scaleX);
                break;
        }

        filter && (this.owner[`$owner`].m_specalAniLoader.filters = [filter]);
        this.owner[`$owner`].m_buffLoader.url = buffUrl;
        this.owner[`$owner`].m_fishLoader.url = `ui://roomScene/fish_${this.uiId}_swining`;
        this.owner[`$owner`].m_fishLoader.filters = null;
        (this.owner[`$owner`].m_fishLoader as fairygui.GLoader).playing = true;

        //鱼的点击区域
        let width: number = (this.owner[`$owner`].m_fishLoader as fairygui.GLoader).content[`width`];
        let height: number = (this.owner[`$owner`].m_fishLoader as fairygui.GLoader).content[`height`];
        if(this.crashZone.length > 0) {
            if(this.fishTypeId != 26 && this.fishTypeId != 150) {
                //美人鱼除外, 暂定
                if(this.fishTypeId == 151) {
                    //冰霜美人鱼,多个区域拼接
                    width = this.crashZone[2];
                    height = this.crashZone[1];
                }
                else {
                    //其他
                    width = this.crashZone[0];
                    height = this.crashZone[1];
                }
            }
        }

        this.owner[`$owner`].m_fishLoader.width = width;
        this.owner[`$owner`].m_fishLoader.height = height;
        (this.owner[`$owner`].m_fishLoader.content as fairygui.GMovieClip).setPlaySettings(0, -1, -1);

        //设置碰撞区域
        if(this.boxCliders && this.boxCliders.length > 0) {
            //多个
            for(let i = 0; i < this.boxCliders.length; i++) {
                this.boxCliders[i].label = 'fish';
            }
            this.setBoxColiders();
        }
        else {
            //单个
            this.boxColider.label = 'fish';
            this.setBoxColider();
        }
    }

    /**
     * 处理单个碰撞区域,碰撞盒未参与适配,需手动适配,逻辑待修改
     */
    setBoxColider() {
        //按原图尺寸设置碰撞区域
        let width: number = (this.owner[`$owner`].m_fishLoader as fairygui.GLoader).content[`width`] * Math.abs(this.owner[`$owner`].parent.parent.scaleX) * 0.6;
        let height: number = (this.owner[`$owner`].m_fishLoader as fairygui.GLoader).content[`height`] * Math.abs(this.owner[`$owner`].parent.parent.scaleY) * 0.6;
        let offsetX: number = - Math.floor(width / 2 - this.owner[`$owner`].width * Math.abs(this.owner[`$owner`].parent.parent.scaleX) / 2);
        let offsetY: number = - Math.floor(height / 2 - this.owner[`$owner`].height * Math.abs(this.owner[`$owner`].parent.parent.scaleY) / 2);

        //按特定大小设置碰撞区域
        if(this.crashZone.length > 0) {
            width = this.crashZone[0] * Math.abs(this.owner[`$owner`].parent.parent.scaleX);
            height = this.crashZone[1] * Math.abs(this.owner[`$owner`].parent.parent.scaleY);
            offsetX = - Math.floor(width / 2 - this.owner[`$owner`].width * Math.abs(this.owner[`$owner`].parent.parent.scaleX) / 2);
            offsetY = - Math.floor(height / 2 - this.owner[`$owner`].height * Math.abs(this.owner[`$owner`].parent.parent.scaleY) / 2);
            if(this.fishTypeId) {
                switch(this.fishTypeId) {
                    case 150: //全屏炸弹
                        offsetX = 0;
                        break;
                    case 21: //海鳗
                        offsetX = - Math.floor(width / 2 - this.owner[`$owner`].width * Math.abs(this.owner[`$owner`].parent.parent.scaleX));
                        break;
                    default:
                        break;
                }
            }
        }
        
        this.boxColider.width = width;
        this.boxColider.height = height;
        this.boxColider.x = offsetX;
        this.boxColider.y = offsetY;
        this.boxColider.resetShape(true);
        this.boxColider.refresh()
    }

    //多个碰撞矩形
    private boxCliders: Laya.BoxCollider[] = [];
    /**
     * 多个碰撞区域, 目前按鱼类型,特殊处理. 
     */
    setBoxColiders() {
        if(!this.boxCliders) return;
        if(!this.fishTypeId) return;
        switch(this.fishTypeId) {
            case 26: //美人鱼
                this.boxCliders[0].width = this.crashZone[0] * Math.abs(this.owner[`$owner`].parent.parent.scaleX);
                this.boxCliders[0].height = this.crashZone[1] * Math.abs(this.owner[`$owner`].parent.parent.scaleY);
                this.boxCliders[0].x = Math.floor(this.owner[`$owner`].width * Math.abs(this.owner[`$owner`].parent.parent.scaleX) * 2);
                this.boxCliders[0].y = -Math.floor(this.boxCliders[0].height - this.owner[`$owner`].height * Math.abs(this.owner[`$owner`].parent.parent.scaleX))
                this.boxCliders[0].refresh();

                this.boxCliders[1].width = this.crashZone[2] * Math.abs(this.owner[`$owner`].parent.parent.scaleX);
                this.boxCliders[1].height = this.crashZone[3] * Math.abs(this.owner[`$owner`].parent.parent.scaleY);
                this.boxCliders[1].x = -Math.floor(this.boxCliders[1].width / 2 - this.owner[`$owner`].width * Math.abs(this.owner[`$owner`].parent.parent.scaleX) / 2);
                this.boxCliders[1].y = 0;
                this.boxCliders[1].refresh();
                break;
            case 151: //冰霜美人鱼
                this.boxCliders[0].width = this.crashZone[0] * Math.abs(this.owner[`$owner`].parent.parent.scaleX);
                this.boxCliders[0].height = this.crashZone[1] * Math.abs(this.owner[`$owner`].parent.parent.scaleY);
                this.boxCliders[0].x = -Math.floor(this.boxCliders[0].width / 2 - this.owner[`$owner`].width * Math.abs(this.owner[`$owner`].parent.parent.scaleX) / 2);
                this.boxCliders[0].y = 0;
                this.boxCliders[0].refresh();

                this.boxCliders[1].width = this.crashZone[2] * Math.abs(this.owner[`$owner`].parent.parent.scaleX);
                this.boxCliders[1].height = this.crashZone[3] * Math.abs(this.owner[`$owner`].parent.parent.scaleY);
                this.boxCliders[1].x = -Math.floor(this.boxCliders[1].width / 2 - this.owner[`$owner`].width * Math.abs(this.owner[`$owner`].parent.parent.scaleX) / 2);
                this.boxCliders[1].y = Math.floor(this.boxCliders[1].height + this.owner[`$owner`].height * Math.abs(this.owner[`$owner`].parent.parent.scaleY) / 2);
                this.boxCliders[1].refresh();
                break;
            default:
                break;
        }
        this.boxColider.label = '';
        this.boxColider.width = 1;
        this.boxColider.height = 1;
    }

    /**停止多个碰撞矩形的碰撞检测 */
    stopTrigger() {
        if(this.boxCliders && this.boxCliders.length > 0) {
            for(let i = 0; i < this.boxCliders.length; i++) {
                this.boxCliders[i].label = '';
            }
        }
    }

    frozenFish() {
        (this.owner[`$owner`].m_fishLoader as fairygui.GLoader).playing = false;
    }

    unFrozenFish() {
        (this.owner[`$owner`].m_fishLoader as fairygui.GLoader).playing = true;
    }

    /**翻转鱼视图 */
    skewXFish(skewX: number) {
        this.owner[`$owner`].m_fishLoader.skewX = skewX;
    }

    /**
     * 检测鱼是否游出屏幕
     */
    checkOutOfWall(): boolean {
        let isOutOfWall: boolean = true;
        let fishHeight;
        let fishWidth;
        let type = DataMon.getData(this.fishTypeId).fishType;
        if(type == 26 || type == 27) {
            fishHeight = (this.owner[`$owner`].m_buffLoader as fairygui.GLoader).content[`height`];
            fishWidth = (this.owner[`$owner`].m_buffLoader as fairygui.GLoader).content[`width`];
        }
        else {
            fishHeight = (this.owner[`$owner`].m_fishLoader as fairygui.GLoader).content[`height`];
            fishWidth = (this.owner[`$owner`].m_fishLoader as fairygui.GLoader).content[`width`];
        }
        if(this.owner['$owner'].x < -fishWidth / 1.5) {
            //左边界
        }
        else if(this.owner['$owner'].y < -fishHeight / 2) {
            //上边界
        }
        else if(this.owner['$owner'].x > 1334 + fishWidth / 2.8) {
            //右边界
        }
        else if(this.owner['$owner'].y > 750 + fishHeight / 2) {
            //下边界
        }
        else {
            isOutOfWall = false;
        }
        return isOutOfWall;
    }

    /**
     * 受击动画
     */
    playHitAni() {
        Laya.timer.clear(this, this.removeHitAni);
        let corlor = DataMon.getData(this.fishTypeId).impactColor;
        let redFilter: Laya.ColorFilter = FilterUtils.getColorMatrix(corlor);
        this.owner[`$owner`].m_fishLoader.filters = [redFilter];
        Laya.timer.once(300, this, this.removeHitAni);
    }

    removeHitAni() {
        this.owner[`$owner`].m_fishLoader.filters = null;
    }

    reset() {
        this.owner[`$owner`].m_fishLoader.filters = null;
        if(this.boxCliders) {
            for(let i = 0; i < this.boxCliders.length; i++) {
                this.boxCliders[i].destroy();
            }
            this.boxCliders = [];
        }
        this.owner[`$owner`].m_aimSignLoader.x = 0;
        this.owner[`$owner`].m_aimSignLoader.y = 0;
        super.reset();
    }

    /**
     * 鱼的回收处理
     */
    recover() {
        this.coliderActive = false;
        (this.owner[`$owner`].m_fishLoader as fairygui.GLoader).playing = true;
        if ([21, 22].indexOf(this.uiId) == -1) {
            this.owner[`$owner`].m_fishLoader.url = `ui://roomScene/fish_${this.uiId}_dead`;
            (this.owner[`$owner`].m_fishLoader.content as fairygui.GMovieClip).setPlaySettings(0, -1, 3, -1, Laya.Handler.create(this, () => {
                Laya.Tween.to(this.owner[`$owner`], { alpha: 0 }, 500, null, Laya.Handler.create(this, () => {
                    FishUtils.recoverFish(this.owner[`$owner`]);
                }))
            }));
        }
        else  {
            Laya.Tween.to(this.owner[`$owner`], { alpha: 0 }, 500, null, Laya.Handler.create(this, () => {
                FishUtils.recoverFish(this.owner[`$owner`]);
            }))
        }
        this.reset();
    }
}