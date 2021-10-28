/**
 * 房间内玩家列表信息
 */
import * as protocol from '../../../protocol/protocols/protocols';
import * as protocolSignals from '../../../protocol/signals/signals';
import inject = riggerIOC.inject;
import PlayerModel from '../../playerModule/models/PlayerModel';
export default class PlayerManager {
    /**自己的本地数据 */
    @inject(PlayerModel)
    private playerModel: PlayerModel;

    public static get instance(): PlayerManager {
        if(!this._instance) {
            this._instance = new PlayerManager();
        }
        return this._instance;
    }
    private static _instance: PlayerManager;
    constructor() {
    }

    get playerInfo(): protocol.PlayerInfo[] {
        return this._playerInfo;
    }

    set playerInfo(value: protocol.PlayerInfo[]) {
        this._playerInfo = value;
        this.updatePlayerSelfInfo();
    }
    private _playerInfo: protocol.PlayerInfo[] = [];

    /**
     * 更新玩家自身信息
     */
    private updatePlayerSelfInfo() {
        if(!this.playerInfo) return;
        for(let i = 0; i < this.playerInfo.length; i++) {
            if(this.playerInfo[i].userId == this.playerModel.playerSelfInfo.userId) {
                this.playerModel.playerSelfInfo.balance = this.playerInfo[i].balance;
                this.playerModel.playerSelfInfo.pos = this.playerInfo[i].pos;
                this.playerModel.playerSelfInfo.battery_lv = this.playerInfo[i].batteryLv;
            }
        }
    }

    /**
     * 通过Id返回玩家信息
     * @param id 
     */
    public findPlayerInfoById(id: number): protocol.PlayerInfo {
        for(let i = 0; i < this._playerInfo.length; i++) {
            if(this._playerInfo[i].userId == id) {
                return this._playerInfo[i];
            }
        }
        return null;
    }

    /**
     * 删除指定玩家信息
     * @param id 
     */
    public deletePlayerInfoById(id: number) {
        for(let i = 0; i < this._playerInfo.length; i++) {
            if(this._playerInfo[i].userId == id) {
                this._playerInfo.splice(i, 1);
            }
        }
    }

    reset() {
        this._playerInfo = [];
    }
}