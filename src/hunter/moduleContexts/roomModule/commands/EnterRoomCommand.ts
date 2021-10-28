/**
 * 请求进入房间
 */
import * as protocol from '../../../protocol/protocols/protocols';
import * as protocolSignals from '../../../protocol/signals/signals';
import NetworkChannelNames from '../../../definitions/NetworkChannelNames';
import CommandCodes from '../../../protocol/CommandCodes';
import inject = riggerIOC.inject;
import PlayerModel from '../../playerModule/models/PlayerModel';
import UIManager from '../../../manager/UIManager';
import RoomView from '../views/RoomView';
import RoomModel from '../models/RoomModel';
import DataHuntingRoom from '../../../data/tpls/DataHuntingRoom';
import SoundController from '../../soundModule/SoundController';
import SceneNames from '../../../definitions/SceneName';
export default class EnterRoomCommand extends riggerIOC.Command {
    @inject(PlayerModel)
    private playerModel: PlayerModel;

    @inject(RoomModel)
    private roomModel: RoomModel;

    @inject(SoundController)
    private soundController: SoundController;

    constructor() {
        super();
    }

    execute(id: number) {
        if(!id) {
            console.log(`房间id错误`);
            return;
        }
        //请求进入房间前，需客服端自行判断余额是否满足下限
        let limt: number = DataHuntingRoom.getData(id).balanceLimit;
        if(this.playerModel.playerSelfInfo.balance >= limt) {
            this.roomModel.reset(); //清空房间旧数据
            this.roomModel.roomType = id;
            let req: protocol.HuntingEnterRoomReq = new protocol.HuntingEnterRoomReq();
            req.roomTypeId = id;
            rigger.service.NetworkService.instance.send(NetworkChannelNames.GameChannel, CommandCodes.PPHuntingEnterRoomReq, req);
            
            //显示房间界面. <动态加载>
            UIManager.instance.showWindow(RoomView, true, UIManager.instance.sceneLayer); 
        }
        this.done();
    }
}