import SoundController from "../../soundModule/SoundController";
import inject = riggerIOC.inject;
import SceneNames from "../../../definitions/SceneName";
import * as protocol from '../../../protocol/protocols/protocols';
import * as protocolSignals from '../../../protocol/signals/signals';
import NetworkChannelNames from "../../../definitions/NetworkChannelNames";
import CommandCodes from "../../../protocol/CommandCodes";
export default class RoomViewLoadCommand extends riggerIOC.Command {
    @inject(SoundController)
    private soundController: SoundController;

    constructor() {
        super();
    }

    /**
     * 通知服务器,房间资源加载完成,准备接收数据
     */
    execute() {
        let req: protocol.HuntingEnterRoomOkReq = new protocol.HuntingEnterRoomOkReq();
        rigger.service.NetworkService.instance.send(NetworkChannelNames.GameChannel, CommandCodes.PPHuntingEnterRoomOkReq, req);

        //隐藏房间加载界面,播放房间背景音乐
        this.soundController.enterScene(SceneNames.RoomScene, SceneNames.LobbyScene);
    }
} 