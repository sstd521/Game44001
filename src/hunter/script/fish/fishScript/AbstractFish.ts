import { IFishBaseInfo } from "../interface/IFishBaseInfo";
import * as protocol from '../../../protocol/protocols/protocols';
import Brizecurve from "../../brizecurve/Brizecurve";
import BrizecurveUtils from "../../brizecurve/BrizecurveUtils";
import FishUtils from "../utils/FishUtils";
import FishManager from "../../../moduleContexts/roomModule/models/FishManager";
import DataMon from "../../../data/tpls/DataMon";
import inject = riggerIOC.inject;
import PlayerModel from "../../../moduleContexts/playerModule/models/PlayerModel";
export default abstract class AbstractFish extends Laya.Script implements IFishBaseInfo {

    @inject(PlayerModel)
    private absPlayerModel: PlayerModel;

    //鱼id
    public fishId: number;

    //鱼类型
    public fishTypeId: number;

    //倍率
    public ratio: number;

    //鱼的出生时间
    public creatTime: number;

    //鱼路径id
    public pathId: number;

    //冰冻信息
    public frozenList: protocol.Frozen[];

    //该鱼的路径曲线
    public brizecurveInfo: Brizecurve = new Brizecurve();

    //路径x的偏移
    public offsetX: number = 0;

    //路径y的偏移
    public offsetY: number = 0;

    //uiId
    public uiId: number;

    public boxColider: Laya.BoxCollider = null;
    public rigidBody: Laya.RigidBody = null;

    private _runUpTime: number = 0;
    private eachMsOffsetTime: number = 0;
    private oldMsOffsetTime: number = 0;

    constructor() { super(); }

    onAwake() {
        //添加碰撞盒
        this.boxColider = this.owner.addComponent(Laya.BoxCollider);
        this.boxColider.height = 1;
        this.boxColider.width = 1;
        this.boxColider.isSensor = true;
        this.boxColider.label = '';

        // //添加刚体
        this.rigidBody = this.owner.addComponent(Laya.RigidBody);
        this.rigidBody.type = 'static';
        this.rigidBody.group = -2;
        this.rigidBody.allowSleep = true;
        this.rigidBody.bullet = true;
    }

    onEnable() {
        this.setFishLoader(); //初始化鱼的ui
        this.initPath(); //初始化鱼的路径
        this.startMove();
        this.boxColider && (this.boxColider.enabled = true);
        this.rigidBody && (this.rigidBody.enabled = true);
        Laya.stage.on(Laya.Event.RESIZE, this, this.onResize);
    }

    onDisable() {
        this.boxColider && (this.boxColider.enabled = false);
        this.rigidBody && (this.rigidBody.enabled = false);
        // this.reset();
    }

    onUpdate() {
    }

    onResize() {
        
    }



    public reset() {
        Laya.timer.clearAll(this);
        this.fishId = null;
        this.uiId = null;
        this.fishTypeId = null;
        this.creatTime = null;
        this.pathId = null;
        this.frozenList = null;
        this.ratio = null;
        this.brizecurveInfo = new Brizecurve();
        this.offsetX = 0;
        this.offsetY = 0;
        this._t = 0;
        this._runUpTime = 0;
        this.eachMsOffsetTime = 0;
        this.oldMsOffsetTime = 0;
        this.coliderActive = true;
        this.isSkew = false;
        this.isLock = false;
    }

    /**
     * 初始化鱼的基础信息
     * @param fishInfo 
     */
    public init(fishInfo: protocol.MonInfo) {
        this.isLock = false;
        this.fishId = fishInfo.monId;
        this.creatTime = fishInfo.createTime;
        this.fishTypeId = fishInfo.monTypeId;
        this.uiId = DataMon.getData(this.fishTypeId).uiId;
        if([-1].indexOf(this.uiId) != -1) this.uiId = 1;
        // console.log(`fish==${this.fishType},,fishType==${DataMon.getData(this.fishType).type},,,uiId==${this.uiId}`);
        this.pathId = fishInfo.pathId;

        if (fishInfo.frozenList) this.frozenList = fishInfo.frozenList;
        if (fishInfo.offsetX) this.offsetX = fishInfo.offsetX;
        if (fishInfo.offsetY) this.offsetY = fishInfo.offsetY;
    }

    public abstract setFishLoader(): void; //设置鱼的ui
    public abstract recover(): void; //鱼的回收处理

    /**
     * 初始化路径
     */
    public initPath() {
        if (!this.pathId) return;
        this.brizecurveInfo.init(this.pathId);

        //初始化鱼的位置
        let startPoint = this.brizecurveInfo.getPointByT(0);
        this.owner[`$owner`].x = startPoint.x;
        this.owner[`$owner`].y = startPoint.y;
        this.owner[`$owner`].alpha = 1;
    }

    /**
     * 游动
     */
    public startMove() {
        let pathEffect = this.brizecurveInfo.pathEffect;
        if (!pathEffect) return;
        let startPoint = this.brizecurveInfo.getPointByT(0);
        this.owner[`$owner`].x = startPoint.x;
        this.owner[`$owner`].y = startPoint.y;
        Laya.timer.frameLoop(1, this, () => {
            if (rigger.service.TimeService.instance.serverTime > this.creatTime) {
                if(this.checkOutOfWall() && this.t > 0.5) {
                    //游出屏幕
                    Laya.timer.clearAll(this);
                    FishManager.instance.deleteFishInfoById(this.fishId); //删除该鱼对应的数据信息
                    this.recover();
                    return;
                }
                let currentMoveTime: number = this.currentTime();
                if(this._runUpTime > 0) {
                    //需要加速退场
                    currentMoveTime += this.eachMsOffsetTime * Laya.timer.delta + this.oldMsOffsetTime;
                    this.oldMsOffsetTime += this.eachMsOffsetTime * Laya.timer.delta;
                }
                if (this.t < 1) {
                    this.t = BrizecurveUtils.getPercentByTime(pathEffect, currentMoveTime);
                }
                else {
                    Laya.timer.clearAll(this);
                    FishManager.instance.deleteFishInfoById(this.fishId); //删除该鱼对应的数据信息
                    this.recover();
                }
            }
        });
    }

    /**
     * 剩余路径ms内跑完,加速鱼的游动,用于鱼潮出现时,加速屏幕鱼的消失。
     */
    get runUpTime(): number {
        return this._runUpTime;
    }
    set runUpTime(value: number) {
        if(value >= this.brizecurveInfo.totalTime) return;
        this._runUpTime = value;
        if(value <= 0) return;

        let currentTime = this.currentTime() <= 0 ? 0 : this.currentTime();
        let realLeftTime: number = this.brizecurveInfo.totalTime - currentTime;
        if(realLeftTime <= this._runUpTime) {
            this.eachMsOffsetTime = 0;
        }
        else {
            this.eachMsOffsetTime = Math.floor((realLeftTime - this._runUpTime) / this._runUpTime);
        }
    }

    /**
     * 返回当前游动时间
     */
    private currentTime(): number {
        this.unFrozenFish();
        let currentTime: number = 0;
        let serverTime: number = rigger.service.TimeService.instance.serverTime;
        if (this.frozenList && this.frozenList.length > 0) {
            if (serverTime < this.frozenList[0].startTime + this.frozenList[0].time) {
                //冰冻期间
                currentTime = this.frozenList[0].startTime - this.creatTime;
                this.frozenFish();
            }
            else {
                currentTime = serverTime - this.frozenList[0].time - this.creatTime;
            }
        }
        else {
            currentTime = serverTime - this.creatTime;
        }
        return currentTime;
    }

    /**冰冻鱼 */
    abstract frozenFish(): void;
    /**解除冰冻 */
    abstract unFrozenFish(): void;

    get t(): number {
        return this._t;
    }
    set t(value: number) {
        this._t = value;
        if (value == 0) return;

        //坐标
        let currentPoint: Laya.Point = this.brizecurveInfo.getPointByT(this._t);
        this.owner[`$owner`].x = currentPoint.x + this.offsetX;
        if([3, 4].indexOf(this.absPlayerModel.playerSelfInfo.pos) != -1) {
            this.owner[`$owner`].y = 750 - (currentPoint.y + this.offsetY);
        }
        else {
            this.owner[`$owner`].y = currentPoint.y + this.offsetY;
        }
        //角度
        let lastPoint: Laya.Point = this.brizecurveInfo.getPointByT(this._t - 0.001);
        let dx = currentPoint.x - lastPoint.x;
        let dy = currentPoint.y - lastPoint.y;
        let k = dy / dx;
        let radian = Math.atan(k);
        let rotation = 180 / Math.PI * radian;
        if (dy < 0) {
            if (dx < 0) {
                rotation = 180 + Math.abs(rotation);
            }
        }
        else if(dy > 0) {
            if (dx < 0) {
                rotation = 180 - Math.abs(rotation);
            }
        }
        else {
            if(dx < 0) {
                rotation = 180;
            }
        }

        //鱼视图的翻转(暂支持一个方向,若一条路径存在两个方向,则转折点处会发生瞬间翻转的效果)
        if (!this.isSkew) {
            if (rotation >= 90 && rotation <= 270) {
                this.skewXFish(180);
            }
            else {
                this.skewXFish(0);
            }
            this.isSkew = true;
        }

        //真实座位[3,4]玩家的鱼视图需进行y的翻转
        if([3, 4].indexOf(this.absPlayerModel.playerSelfInfo.pos) != -1) {
            if(rotation >= 0 && rotation <= 90 || rotation >= 180 && rotation <= 270) {
                rotation = rotation - 2 * Math.abs(180 / Math.PI * radian);
            }
            else {
                rotation = rotation + 2 * Math.abs(180 / Math.PI * radian);
            }
        }

        this.owner[`$owner`].rotation = rotation;
        this.boxColider.refresh();
    }
    private _t: number = 0;

    private isSkew: boolean = false;

    /**翻转鱼视图 */
    abstract skewXFish(skewX: number): void;

    /**
     * 检测鱼是否游出屏幕
     */
    abstract checkOutOfWall(): boolean;

    /**受击动画 */
    abstract playHitAni(): void;

    /**
     * 碰撞是否开启
     */
    set coliderActive(value: boolean) {
        this._coliderActive = value;
        if(!value) {
            if(this.boxColider) {
                //阻止碰撞
                this.boxColider.label = '';
                this.stopTrigger && this.stopTrigger();
            }
        }
    }
    private _coliderActive: boolean = true;

    /**停止多个碰撞矩形的碰撞检测 */
    stopTrigger?(): void;

    /**
     * 是否锁定
     */
    get isLock(): boolean {return this._isLock;}
    set isLock(v: boolean) {
        this._isLock = v;
        if(v) this.owner[`$owner`].m_aimSignLoader.url = `ui://roomScene/aimSign`;
        else this.owner[`$owner`].m_aimSignLoader.url = ``;
    }
    private _isLock: boolean;

    /**
     * 死亡的特殊处理,暂用于一网打尽
     */
    beforeDeadInCatchAll() {
        this.coliderActive = false;
        this.isLock = false;
        this.frozenFish();
        Laya.timer.clearAll(this);
        FishManager.instance.deleteFishInfoById(this.fishId); //删除该鱼对应的数据信息,防止在闪电链住之前被其他玩家锁定浪费子弹
    }

    /**返回鱼中心的坐标,坐标系为fishView */
    getCenterPoint(): Laya.Point {
        let point: Laya.Point = new Laya.Point(this.owner[`$owner`].m_fishLoader.x, this.owner[`$owner`].m_fishLoader.y);
        let globalPoint = this.owner[`$owner`].localToGlobal(point.x, point.y);
        let localPoint = this.owner[`$owner`].parent.globalToLocal(globalPoint.x, globalPoint.y);
        return new Laya.Point(Math.floor(localPoint.x), Math.floor(localPoint.y));
    }
}