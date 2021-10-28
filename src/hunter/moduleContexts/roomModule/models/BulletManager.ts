/**
 * 子弹信息
 */
import * as protocol from '../../../protocol/protocols/protocols';
import * as protocolSignal from '../../../protocol/signals/signals';
export default class BulletManager {
    public static get instance(): BulletManager {
        if(!this._instance) {
            this._instance = new BulletManager();
        }
        return this._instance;
    }
    private static _instance: BulletManager;
    constructor() {
    }

    /**子弹信息 */
    get bulletInfo(): protocol.ShellInfo[] {
        return this._bulletInfo;
    }

    set bulletInfo(value: protocol.ShellInfo[]) {
        this._bulletInfo = value;
    }
    
    private _bulletInfo: protocol.ShellInfo[] = [];

    /**
     * 子弹的实例集合
     */
    get bullethgObjectGroup(): fairygui.GObject[] {
        return this._bullethgObjectGroup;
    }
    private _bullethgObjectGroup: fairygui.GObject[] = [];

    /**
     * 获取子弹信息
     * @param id 
     */
    getBulletInfoById(id: number): protocol.ShellInfo {
        for(let i = 0; i < this._bulletInfo.length; i++) {
            if(this._bulletInfo[i].shellId == id) {
                return this._bulletInfo[i];
            }
        }
        return null;
    }

    /**
     * 根据子弹id获取对应的组件
     * @param id 
     */
    getBullethgObjectById(id: number): fairygui.GObject {
        for(let i = 0; i < this._bullethgObjectGroup.length; i++) {
            if(this._bullethgObjectGroup[i].data == id) {
                return this._bullethgObjectGroup[i];
            }
        }
        return null;
    }

    /**
     * 返回指定玩家的所有子弹实例集合
     * @param ownerId 
     */
    findBulletObjectByOwnerId(ownerId: number): fairygui.GObject[] {
        let bullet: fairygui.GObject[] = [];
        for(let i = 0; i < this.bulletInfo.length; i++) {
            if(this.bulletInfo[i].userId == ownerId) {
                let obj = this.getBullethgObjectById(this.bulletInfo[i].shellId);
                obj && bullet.push(obj);
            }
        }
        return bullet;
    }

    /**
     * 删除指定id子弹
     * @param id 
     */
     public deleteBulletById(id: number) {
         for(let i = 0; i < this._bulletInfo.length; i++) {
             if(this._bulletInfo[i].shellId == id) {
                 this._bulletInfo.splice(i, 1);
                 break;
             }
         }

         for(let j = 0; j < this._bullethgObjectGroup.length; j++) {
            if(this._bullethgObjectGroup[j].data == id) {
                this._bullethgObjectGroup.splice(j, 1);
                break;
            }
        }
     }

     reset() {
        this._bulletInfo = [];
        this._bullethgObjectGroup = [];
     }
}