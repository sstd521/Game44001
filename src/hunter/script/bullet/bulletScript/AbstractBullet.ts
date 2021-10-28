import { Ibullet, bulletState, Direction } from "../interface/Ibullet";
import PlayerManager from "../../../moduleContexts/roomModule/models/PlayerManager";
import FishManager from "../../../moduleContexts/roomModule/models/FishManager";

export default abstract class AbstractBullet extends Laya.Script implements Ibullet {
    /**锁定的目标对象Id */
    public lockFishId: number;

    /**发射时的点击点 */
    public fireClickPoint: Laya.Point = new Laya.Point();

    /**出生点 */
    public startPoint: Laya.Point = new Laya.Point();

    /**发射时间 */
    public fireTime: number;
    
    /**状态 */
    public state: bulletState;

    /**速度 */
    public speed: number;

    /**炮弹id */
    public bulletId: number;

    /**炮弹X轴方向 */
    public bulletXDirection: Direction;

     /**炮弹Y轴方向 */
     public bulletYDirection: Direction;

     /**炮弹等级 */
     public bulletLv: number;

    /**拥有者Id */
    public ownerId: number

    public boxColider: Laya.BoxCollider = null;
    private rigidBody:Laya.RigidBody = null;

    constructor() {
        super();
    }

    onAwake() {
        //添加碰撞盒
        this.boxColider = this.owner.addComponent(Laya.BoxCollider);
        this.boxColider.height = 110;
        this.boxColider.width = 49;
        this.boxColider.isSensor = true;
        this.boxColider.label = 'bullet';

        // //添加刚体
        this.rigidBody = this.owner.addComponent(Laya.RigidBody);
        // this.rigidBody.type = 'static';
        this.rigidBody.group = -1;
        this.rigidBody.allowSleep = true;
        this.rigidBody.bullet = true;
    }

    onEnable(): void {
        this.boxColider && (this.boxColider.enabled = true);
        this.rigidBody && (this.rigidBody.enabled = true);
        Laya.stage.on(Laya.Event.RESIZE, this, this.onResize);
    }

    onDisable(): void {
        this.boxColider && (this.boxColider.enabled = false);
        this.rigidBody && (this.rigidBody.enabled = false);
        this.reset();
    }

    onResize() {
        
    }

    onStart() {
    }

    onUpdate(): void {
        if (this.state == bulletState.lock) {
            this.lockMove();
        }
        else {
            this.unLockMove();
        }
        this.owner[`$owner`].visible = true;
    }
    /**锁定模式下的移动 */
    abstract lockMove(): void;

    /**无目标移动 */
    abstract unLockMove(): void;

    /**
     * 子弹实例化之后,需先手动调用init初始化子弹基础信息
     * @param ownerId 
     * @param fireClickPoint 
     * @param lockTarget 
     */
    init(ownerId: number, bulletId: number, fireTime: number, startPoint: Laya.Point, bulletLv: number, fireClickPoint: Laya.Point, lockFishId: number) {
        this.ownerId = ownerId;
        this.bulletId = bulletId;
        this.fireTime = fireTime;
        this.fireClickPoint = fireClickPoint;
        this.startPoint = startPoint;
        this.bulletLv = bulletLv;
        this.state = lockFishId ? bulletState.lock : bulletState.unlock;
        this.lockFishId = lockFishId ? lockFishId : null;
    }

    reset() {
        this.ownerId = null;
        this.bulletId = null;
        this.fireClickPoint = null;
        this.startPoint = null;
        this.state = null;
        this.lockFishId = null;
        this.fireTime = null;
    }

    recover() {
    }
}