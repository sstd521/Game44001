/**
 * 离开房间的命令
 */
import * as protocol from '../../../protocol/protocols/protocols';
import * as protocolSignals from '../../../protocol/signals/signals';
import NetworkChannelNames from '../../../definitions/NetworkChannelNames';
import CommandCodes from '../../../protocol/CommandCodes';
import UIManager from '../../../manager/UIManager';
import EntryView from '../../entryModule/views/EntryView';
import inject = riggerIOC.inject;
import RoomModel from '../models/RoomModel';
import SoundController from '../../soundModule/SoundController';
import SceneNames from '../../../definitions/SceneName';
export default class ExitRoomCommand extends riggerIOC.Command {
    @inject(RoomModel)
    private roomModel: RoomModel;

    @inject(SoundController)
    private soundController: SoundController;

    constructor() {
        super();
    }

    execute() {
        let req: protocol.HuntingExitRoomReq = new protocol.HuntingExitRoomReq();
        rigger.service.NetworkService.instance.send(NetworkChannelNames.GameChannel, CommandCodes.PPHuntingExitRoomReq, req);

        //显示大厅界面. <暂定>
        this.soundController.enterScene(SceneNames.LobbyScene, SceneNames.RoomScene);
        UIManager.instance.showWindow(EntryView, true, UIManager.instance.sceneLayer);
        this.done();
    }
}