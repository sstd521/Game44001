import UIManager from "../../../manager/UIManager";
import * as protocol from '../../../protocol/protocols/protocols';
import * as protocolSignals from '../../../protocol/signals/signals';
import NetworkChannelNames from "../../../definitions/NetworkChannelNames";
import CommandCodes from "../../../protocol/CommandCodes";
/**
 * 显示房间界面
 */
export default class ShowRoomCommand extends riggerIOC.Command {
    constructor() {
        super();
    }

    execute() {
        // UIManager.instance.showWindow(roomView)
    }
}