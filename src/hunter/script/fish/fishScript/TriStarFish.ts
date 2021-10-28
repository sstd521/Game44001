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
export default class TriStarFish extends AbstractFish {

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
    }

    onResize() {
        super.onResize();
        this.setBoxColider();
    }

    /**
     * 鱼实例化之后，手动调用
     * @param fishInfo 
     */
    init(fishInfo: protocol.MonInfo) {
        super.init(fishInfo);
    }

    /**
     * 设置鱼的ui
     */
    setFishLoader() {
        this.owner[`$owner`].m_buffLoader.url = '';
        this.owner[`$owner`].m_fishLoader.url = `ui://roomScene/triStar`;
        this.owner[`$owner`].filters = null;
        this.owner[`$owner`].m_fishLoader.width = (this.owner[`$owner`].m_fishLoader as fairygui.GLoader).content[`width`];
        this.owner[`$owner`].m_fishLoader.height = (this.owner[`$owner`].m_fishLoader as fairygui.GLoader).content[`height`];

        //组合鱼赋值
        let combination: number[] = DataMon.getData(this.fishTypeId).combination;
        for(let i = 0; i < combination.length; i++) {
            // (this.owner[`$owner`][`m_triStarFish${i+1}Loader`] as fairygui.GLoader).playing = true;
            this.owner[`$owner`][`m_triStarFish${i+1}Loader`].url = `ui://roomScene/fish_${DataMon.getData(combination[i]).uiId}_swining`;
            (this.owner[`$owner`][`m_triStarFish${i+1}Loader`].content as fairygui.GMovieClip).setPlaySettings(0, -1, -1);
            // if([3, 4].indexOf(this.playerModel.playerSelfInfo.pos) != -1) {
            //     this.owner[`$owner`][`m_triStarFish${i+1}Loader`].scaleY = - Math.abs(this.owner[`$owner`][`m_triStarFish${i+1}Loader`].scaleY);
            // }
            // else {
            //     this.owner[`$owner`][`m_triStarFish${i+1}Loader`].scaleY = Math.abs(this.owner[`$owner`][`m_triStarFish${i+1}Loader`].scaleY);
            // }
        }

        //设置碰撞区域,暂定一个矩形
        this.boxColider.label = 'fish';
        this.setBoxColider();
    }

    setBoxColider() {
        //碰撞盒未参与适配,需手动适配,逻辑待修改
        this.boxColider.width = (this.owner[`$owner`].m_fishLoader as fairygui.GLoader).content[`width`] * Math.abs(this.owner[`$owner`].parent.parent.scaleX);
        this.boxColider.height = (this.owner[`$owner`].m_fishLoader as fairygui.GLoader).content[`height`] * Math.abs(this.owner[`$owner`].parent.parent.scaleY);
        this.boxColider.x = - Math.floor(this.boxColider.width / 2 - this.owner[`$owner`].width / 2);
        this.boxColider.y = - Math.floor(this.boxColider.height / 2 - this.owner[`$owner`].height / 2);
        this.boxColider.resetShape(true);
    }

    frozenFish() {
        for(let i = 0; i < 3; i++) {
            (this.owner[`$owner`][`m_triStarFish${i+1}Loader`] as fairygui.GLoader).playing = false;
        }
    }

    unFrozenFish() {
        for(let i = 0; i < 3; i++) {
            (this.owner[`$owner`][`m_triStarFish${i+1}Loader`] as fairygui.GLoader).playing = true;
        }
    }

    /**翻转鱼视图 */
    skewXFish(skewX: number) {
        for(let i = 0; i < 3; i++) {
            (this.owner[`$owner`][`m_triStarFish${i+1}Loader`] as fairygui.GLoader).skewX = skewX;
        }
    }

    /**
     * 检测鱼是否游出屏幕
     */
    checkOutOfWall(): boolean {
        let isOutOfWall: boolean = true;
        let fishHeight = (this.owner[`$owner`].m_fishLoader as fairygui.GLoader).content[`height`];
        let fishWidth = (this.owner[`$owner`].m_fishLoader as fairygui.GLoader).content[`width`];
        if(this.owner['$owner'].x < -fishWidth / 2) {
            //左边界
        }
        else if(this.owner['$owner'].y < -fishHeight / 2) {
            //上边界
        }
        else if(this.owner['$owner'].x > 1334 + fishWidth / 2) {
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
        this.owner[`$owner`].filters = [redFilter];
        Laya.timer.once(300, this, this.removeHitAni);
    }

    removeHitAni() {
        this.owner[`$owner`].filters = null;
    }

    reset() {
        this.owner[`$owner`].filters = null;
        super.reset();
    }

    /**
     * 鱼的回收处理
     */
    recover() {
        let combination: number[] = DataMon.getData(this.fishTypeId).combination;
        this.coliderActive = false;
        let j: number = 0;
        for(let i = 0; i < combination.length; i++) {
            (this.owner[`$owner`][`m_triStarFish${i+1}Loader`] as fairygui.GLoader).playing = true;
            this.owner[`$owner`][`m_triStarFish${i+1}Loader`].url = `ui://roomScene/fish_${DataMon.getData(combination[i]).uiId}_dead`;

            (this.owner[`$owner`][`m_triStarFish${i+1}Loader`].content as fairygui.GMovieClip).setPlaySettings(0, -1, 3, -1, Laya.Handler.create(this, () => {
                j += 1;
                if(j >= combination.length) {
                    Laya.Tween.to(this.owner[`$owner`], { alpha: 0 }, 500, null, Laya.Handler.create(this, () => {
                        FishUtils.recoverFish(this.owner[`$owner`]);
                    }))
                }
            }));
        }
        this.reset();
    }
}