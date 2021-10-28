/**
 * 房间服务
 */
import * as protocolSignals from '../../../protocol/signals/signals';
import * as protocol from '../../../protocol/protocols/protocols';
import inject = riggerIOC.inject;
import ShowRoomSignal from '../signals/ShowRoomSignal';
import RoomModel from '../models/RoomModel';
import PlayerExitRoomSignal from '../signals/PlayerExitRoomSIgnal';
import PlayerManager from '../models/PlayerManager';
import NewPlayerSignal from '../signals/NewPlayerSignal';
import RoomInfoInitSignal from '../signals/RoomInfoInitSignal';
import PlayerModel from '../../playerModule/models/PlayerModel';
import BalanceUpdateSignal from '../signals/BalanceUpdateSignal';
import BatteryLvUpdateSignal from '../signals/BatteryLvUpdateSignal';
export default class RoomServer extends riggerIOC.Server {
    //房间信息
    @inject(protocolSignals.HuntingRoomInfoRespSignal)
    private huntingRoomInfoRespSignal: protocolSignals.HuntingRoomInfoRespSignal;

    /**房间信息初始化完毕 */
    @inject(RoomInfoInitSignal)
    private roomInfoInitSignal: RoomInfoInitSignal;
    
    //显示房间界面
    @inject(ShowRoomSignal)
    private showRoomSignal: ShowRoomSignal;
    
    //房间数据
    @inject(RoomModel)
    private roomModel: RoomModel;

    @inject(PlayerModel)
    private playerModel: PlayerModel;

    //玩家退出房间
    @inject(protocolSignals.HuntingExitRoomRespSignal)
    private huntingExitRoomRespSignal: protocolSignals.HuntingExitRoomRespSignal;

    @inject(PlayerExitRoomSignal)
    private playerExitRoomSignal: PlayerExitRoomSignal;

    @inject(protocolSignals.HuntingEnterRoomRespSignal)
    private huntingEnterRoomRespSignal: protocolSignals.HuntingEnterRoomRespSignal;

    /**新玩家加入房间 */
    @inject(NewPlayerSignal)
    private newPlayerSignal: NewPlayerSignal;

    /**玩家房间数据广播 */
    @inject(protocolSignals.UpdatePlayerRespSignal)
    private updatePlayerRespSignal: protocolSignals.UpdatePlayerRespSignal;

    /**玩家余额更新,带玩家id */
    @inject(BalanceUpdateSignal)
    private balanceUpdateSignal: BalanceUpdateSignal;

    /**玩家炮台等级更新,带玩家id */
    @inject(BatteryLvUpdateSignal)
    private batteryLvUpdateSignal: BatteryLvUpdateSignal;

    constructor() {
        super();
        this.addProtocolListener();
    }

    dispose() {
        this.removeProtocolListener();
    }

    private addProtocolListener() {
        this.huntingRoomInfoRespSignal.on(this, this.onHuntingRoomInfoResp);
        this.huntingExitRoomRespSignal.on(this, this.onHuntingExitRoomResp);
        this.huntingEnterRoomRespSignal.on(this, this.onHuntingEnterRoomResp);
        this.updatePlayerRespSignal.on(this, this.onUpdatePlayerResp);
    }

    private removeProtocolListener() {
        this.huntingRoomInfoRespSignal.off(this, this.onHuntingRoomInfoResp);
        this.huntingExitRoomRespSignal.off(this, this.onHuntingExitRoomResp);
        this.huntingEnterRoomRespSignal.off(this, this.onHuntingEnterRoomResp);
        this.updatePlayerRespSignal.off(this, this.onUpdatePlayerResp);
    }

    /**
     * 房间信息回包
     * @param resp 
     */
    private onHuntingRoomInfoResp(resp: protocol.HuntingRoomInfoResp) {
        if(this._isFirstInRoom) {
            this.showRoomSignal.dispatch();
            this._isFirstInRoom = false;
        }
        //更新房间数据
        this.roomModel.initRoomModelInfo(resp);
        //派发房间数据初始化完毕
        this.roomInfoInitSignal.dispatch();
    }

    public get isFirstInRoom(): boolean {
        return this._isFirstInRoom;
    }
    private _isFirstInRoom: boolean = true;

    /**
     * 玩家房间数据更新
     * @param resp 
     */
    private onUpdatePlayerResp(resp: protocol.UpdatePlayerResp) {
        let id = resp.userId;
        let playerInfo = PlayerManager.instance.findPlayerInfoById(id);
        if(!playerInfo) return;
        if(resp.key == 1) {
            let change = resp.value - PlayerManager.instance.findPlayerInfoById(id).balance;
            PlayerManager.instance.findPlayerInfoById(id).balance = resp.value;
            if(id == this.playerModel.playerSelfInfo.userId) this.playerModel.playerSelfInfo.balance = resp.value;
            //派发玩家余额更新信号
            this.balanceUpdateSignal.dispatch([id, change]);        
        }
        else {
            PlayerManager.instance.findPlayerInfoById(id).batteryLv = resp.value;
            if(id == this.playerModel.playerSelfInfo.userId) this.playerModel.playerSelfInfo.battery_lv = resp.value;
            //派发玩家炮台等级更新信号
            this.batteryLvUpdateSignal.dispatch(id);
        }
    }

    /**
     * 玩家加入房间
     * @param resp 
     */
    private onHuntingEnterRoomResp(resp: protocol.HuntingEnterRoomResp) {
        PlayerManager.instance.playerInfo = PlayerManager.instance.playerInfo.concat(resp.playerInfo);
        //派发新玩家加入房间信号
        this.newPlayerSignal.dispatch(resp.playerInfo.userId);
    }

    /**
     * 玩家退出房间
     * @param resp userid
     */
    private onHuntingExitRoomResp(resp: protocol.HuntingExitRoomResp) {
        this.playerExitRoomSignal.dispatch(resp.userId);
    }


}