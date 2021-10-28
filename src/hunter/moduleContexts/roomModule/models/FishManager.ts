/**
 * 鱼信息
 */
import * as protocol from '../../../protocol/protocols/protocols';
import * as protocolSignals from '../../../protocol/signals/signals';
export default class FishManager {
    public static get instance(): FishManager {
        if(!this._instance) {
            this._instance = new FishManager();
        }
        return this._instance;
    }
    private static _instance: FishManager;

    constructor() {
    }

    /**
     * 鱼信息
     */
    get fishInfo(): protocol.MonInfo[] {
        return this._fishInfo;
    }
    set fishInfo(value: protocol.MonInfo[]) {
        this._fishInfo = value;
    }
    private _fishInfo: protocol.MonInfo[] = [];

    /**
     * 根据id返回鱼信息
     * @param id 
     */
    getFishInfoById(id: number): protocol.MonInfo {
        for(let i = 0; i < this._fishInfo.length; i++) {
            if(this._fishInfo[i].monId == id) {
                return this._fishInfo[i];
            }
        }
        return null;
    }

    /**
     * 鱼的实例集合
     */
    get fishgObjectGroup(): fairygui.GObject[] {
        return this._fishgObjectGroup;
    }
    private _fishgObjectGroup: fairygui.GObject[] = [];

    /**
     * 根据鱼id获取对应的组件
     * @param id 
     */
    getFishgObjectById(id: number): fairygui.GObject {
        for(let i = 0; i < this._fishgObjectGroup.length; i++) {
            if(this._fishgObjectGroup[i].data == id) {
                return this._fishgObjectGroup[i];
            }
        }
        return null;
    }

    /**
     * 获取已经创建实例的鱼的id列表
     */
    fishCreatedIdList(): number[] {
        let idList: number[] =[];
        for(let i = 0; i < this._fishgObjectGroup.length; i++) {
            idList.push(this._fishgObjectGroup[i].data as number);
        }
        return idList;
    }
 
    /**
     * 根据鱼id删除存储的数据、组件
     * @param id 
     */
    deleteFishInfoById(id: number) {
        for(let i = 0; i < this._fishInfo.length; i++) {
            if(this._fishInfo[i].monId == id) {
                this._fishInfo.splice(i, 1);
                break;
            }
        }

        for(let j = 0; j < this._fishgObjectGroup.length; j++) {
            if(this._fishgObjectGroup[j].data == id) {
                this._fishgObjectGroup.splice(j, 1);
                break;
            }
        }
    }

    reset() {
        this._fishInfo = [];
        this._fishgObjectGroup = [];
    }
}