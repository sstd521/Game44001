import AbstractBullet from "./AbstractBullet";
import { Direction, bulletState } from "../interface/Ibullet";
import BulletUtils from "../utils/BulletUtils";
import inject = riggerIOC.inject;
import FightServer from "../../../moduleContexts/fightModule/servers/fightServer";
import BulletManager from "../../../moduleContexts/roomModule/models/BulletManager";
import NetUtils from "../../net/netUtils";
import FUInet from "../../../fui/roomScene/FUInet";
import PlayerModel from "../../../moduleContexts/playerModule/models/PlayerModel";
import FishManager from "../../../moduleContexts/roomModule/models/FishManager";
import AbstractFish from "../../fish/fishScript/AbstractFish";
import PlayerManager from "../../../moduleContexts/roomModule/models/PlayerManager";
import { NetView } from "../../net/NetView";
export default class NormalBullet extends AbstractBullet {

    @inject(FightServer)
    private fightServer: FightServer;

    @inject(PlayerModel)
    private playerModel: PlayerModel;

    /**y轴单位向量,垂直向上 */
    private yNormalVector: Laya.Vector2 = new Laya.Vector2(0, -1);
    private normalDirectionVector: Laya.Vector2 = new Laya.Vector2(0, 0);
    constructor() {
        super();
    }

    onAwake() {
        super.onAwake();
    }

    onEnable(): void {
        super.onEnable();
        this.setBoxColider();
        this.owner[`$owner`].visible = false;
        this.speed = 40;
        this.owner[`$owner`].x = this.startPoint.x;
        this.owner[`$owner`].y = this.startPoint.y;
        let directionVector = new Laya.Vector2(this.fireClickPoint.x - this.startPoint.x, this.fireClickPoint.y - this.startPoint.y);
        Laya.Vector2.normalize(directionVector, this.normalDirectionVector); //单位化方向向量
        this.updateBulletDirection(this.normalDirectionVector); //更新子弹x,y轴的方向
    }

    onDisable(): void {
        super.onDisable();
    }

    recover() {
        super.recover();
        BulletUtils.recoverBullet(this.owner[`$owner`]);
    }

    onResize() {
        super.onResize();
        this.setBoxColider();
    }

    setBoxColider() {
        this.boxColider.width = (this.owner[`$owner`].m_bulletLoader as fairygui.GLoader).content[`width`] * this.owner[`$owner`].parent.scaleX;
        this.boxColider.height = 20;
        this.boxColider.x = (this.owner[`$owner`].m_bulletLoader as fairygui.GLoader).width / 2 - (this.owner[`$owner`].m_bulletLoader as fairygui.GLoader).content[`width`] / 2;
        this.boxColider.y = 0;
        this.boxColider.resetShape(true);
    }

    /**
     * 开始碰撞(目前存在子弹与子弹之间会发生碰撞的问题)
     * @param other 
     * @param self 
     * @param contact 
     */
    onTriggerEnter(other: any, self: any, contact: any): void {
        if (other.label == 'fish') {
            let fish = other.owner.getComponent(AbstractFish) as AbstractFish;
            let fishId = fish.fishId;
            let fishTypeId = fish.fishTypeId;
            if (this.state == bulletState.lock) {
                if (fishId == this.lockFishId) {
                    fish.playHitAni(); //播放鱼受击动画,应放在鱼的碰撞函数.（碰撞待优化）
                    if (this.ownerId == this.playerModel.playerSelfInfo.userId) {
                        this.fightServer.shellReq(this.bulletId, fishId, fishTypeId, []);   //上报击中
                    }
                    //加网
                    let net = NetUtils.getNet() as NetView;
                    net.init(this.bulletLv);
                    net.x = this.owner[`$owner`].x + this.owner[`$owner`].pivotX - net.width / 2;
                    net.y = this.owner[`$owner`].y - net.height / 2;
                    this.owner[`$owner`].parent.addChild(net);
                    net.sortingOrder = 999;
                    net.m_t0.play(Laya.Handler.create(this, () => {
                        NetUtils.recoverNet(net);
                    }));

                    //回收子弹
                    this.reset();
                    this.recover();
                }
            }
            else {
                fish.playHitAni(); //播放鱼受击动画,应放在鱼的碰撞函数.（碰撞待优化）
                if (this.ownerId == this.playerModel.playerSelfInfo.userId) {
                    this.fightServer.shellReq(this.bulletId, fishId, fishTypeId, []);   //上报击中
                }
                //加网
                let net = NetUtils.getNet() as NetView;
                net.init(this.bulletLv);
                net.x = this.owner[`$owner`].x + this.owner[`$owner`].pivotX - net.width / 2;
                net.y = this.owner[`$owner`].y - net.height / 2;
                this.owner[`$owner`].parent.addChild(net);
                net.sortingOrder = 999;
                net.m_t0.play(Laya.Handler.create(this, () => {
                    NetUtils.recoverNet(net);
                }));

                //回收子弹
                this.reset();
                this.recover();
            }
        }
    }

    /**
     * 碰撞结束
     * @param other 
     * @param self 
     * @param contact 
     */
    onTriggerExit(other: any, self: any, contact: any): void {
    }


    onStart() {
        super.onStart();
    }

    onUpdate() {
        super.onUpdate();
    }

    /**
     * 锁定状态
     */
    lockMove() {
        let borderDirection: Direction = this.checkOutOfWall(); //是否触碰边界
        if (borderDirection) {
            //通知服务器子弹出屏幕
            this.fightServer.shellReq(this.bulletId, 0, 0, []);
            //回收子弹
            // console.log(`deleteBulletId===${this.bulletId}`);
            // console.log(`outOfWall==${this.bulletId}`)
            this.reset();
            this.recover();
            return;
        }
        // console.log(`lockData==${this.lockFishId},,bulletId===${this.bulletId}`);
        let fish = FishManager.instance.getFishgObjectById(this.lockFishId);
        let bulletPoint: Laya.Point = new Laya.Point(this.owner[`$owner`].x, this.owner[`$owner`].y);
        if (fish) {
            let targetPoint: Laya.Point = new Laya.Point(fish.x, fish.y);
            let directionVector: Laya.Vector2 = new Laya.Vector2(targetPoint.x - bulletPoint.x, targetPoint.y - bulletPoint.y);
            Laya.Vector2.normalize(directionVector, this.normalDirectionVector);
            // console.log(`ddddd`);
        }
        // console.log(`fishId==${fish?fish.data:'null'},,,fish==${fish},,,bulletId==${this.bulletId},,vector2===(${this.normalDirectionVector.x},${this.normalDirectionVector.y})`);
        this.updateBulletDirection(this.normalDirectionVector); //更新子弹x,y轴方向
        this.frameMoveVector = new Laya.Vector2(this.normalDirectionVector.x * this.speed, this.normalDirectionVector.y * this.speed); //更新每帧移动的向量
    }

    /**
     * 不锁定
     */
    unLockMove() {
        this.owner[`$owner`].visible = true;
        let borderDirection: Direction = this.checkOutOfWall(); //是否触碰边界
        switch (borderDirection) {
            case Direction.up:
            case Direction.bottom:
                this.normalDirectionVector = new Laya.Vector2(this.normalDirectionVector.x, -this.normalDirectionVector.y);
                break;
            case Direction.left:
            case Direction.right:
                this.normalDirectionVector = new Laya.Vector2(-this.normalDirectionVector.x, this.normalDirectionVector.y);
                break;
            default:
                break;
        }
        this.updateBulletDirection(this.normalDirectionVector); //更新子弹x,y轴方向
        // let moveTime: number = rigger.service.TimeService.instance.serverTime - this.fireTime;
        // let time = moveTime / 20;
        this.frameMoveVector = new Laya.Vector2(this.normalDirectionVector.x * this.speed, this.normalDirectionVector.y * this.speed); //更新每帧移动的向量
    }

    get frameMoveVector(): Laya.Vector2 {
        return this._frameMoveVector;
    }
    set frameMoveVector(value: Laya.Vector2) {
        this._frameMoveVector = value;

        //坐标
        this.owner[`$owner`].x += this._frameMoveVector.x;
        this.owner[`$owner`].y += this._frameMoveVector.y;

        if (this.owner[`$owner`].x <= 0) this.owner[`$owner`].x = 0;
        if (this.owner[`$owner`].x >= 1334) this.owner[`$owner`].x = 1334;

        if (this.owner[`$owner`].y <= 0) this.owner[`$owner`].y = 0;
        if (this.owner[`$owner`].y >= 750) this.owner[`$owner`].y = 750;

        //角度
        let dot = Laya.Vector2.dot(this.yNormalVector, this.normalDirectionVector);
        let radian = Math.acos(dot);
        let rotation = 180 / Math.PI * radian;
        if (this.bulletXDirection != Direction.none) {
            if (this.bulletXDirection == Direction.left) {
                rotation = 360 - rotation;
            }
        }
        this.owner[`$owner`].rotation = rotation;
    }
    private _frameMoveVector: Laya.Vector2 = new Laya.Vector2(0, 0);

    /**
     * 触碰边界时，返回边界方向
     */
    checkOutOfWall(): Direction {
        if (this.owner[`$owner`].x <= 0) {
            //触碰左边界
            return Direction.left;
        }
        else if (this.owner[`$owner`].y <= 0) {
            //触碰上边界
            return Direction.up;
        }
        else if (this.owner[`$owner`].x >= 1334) {
            //触碰右边界
            return Direction.right;
        }
        else if (this.owner[`$owner`].y >= 750) {
            //触碰下边界
            return Direction.bottom;
        }
        else {
            //未触碰边界
            return null;
        }
    }

    /**
     * 更新子弹在x,y轴上的方向
     * @param normalVector 子弹方向的单位向量
     */
    updateBulletDirection(normalVector: Laya.Vector2) {
        let dx = normalVector.x;
        let dy = normalVector.y;
        if (dx > 0) this.bulletXDirection = Direction.right;
        else if (dx < 0) this.bulletXDirection = Direction.left;
        else this.bulletXDirection = Direction.none;

        if (dy > 0) this.bulletYDirection = Direction.bottom;
        else if (dy < 0) this.bulletYDirection = Direction.up;
        else this.bulletYDirection = Direction.none;
    }
}