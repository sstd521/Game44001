import UIManager from "../../../manager/UIManager";
import LoginServer from "../servers/LoginServer";
import FUIServerListView from "../../../fui/loginUi/FUIServerListView";
import NetworkChannelNames from "../../../definitions/NetworkChannelNames";
/**
* name 
*/
///<reference path="../servers/LoginServer.ts" />
export default class ConnectGameServerCommand extends riggerIOC.Command {
	@riggerIOC.inject(LoginServer)
	private server: LoginServer;

	constructor() {
		super();
	}

	execute() {
		this.server.connectGameServer();
		rigger.service.NetworkService.instance.onConnect(NetworkChannelNames.GameChannel, this, this.onGameServerConnected);
	}

	private onGameServerConnected() {
		console.log("connected");
		Laya.timer.clearAll(this);
		UIManager.instance.hideWindowByName(FUIServerListView.URL);
		this.done();
	}

}