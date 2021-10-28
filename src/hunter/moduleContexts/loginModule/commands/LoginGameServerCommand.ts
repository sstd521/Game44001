/**
* name 
*/
import inject = riggerIOC.inject;
import TimeService = rigger.service.TimeService;
import LoginModel from "../models/LoginModel";
import LoginServer from "../servers/LoginServer";
import MyApplication, { GameState } from "../../../MyApplication";
import UIManager from "../../../manager/UIManager";
import GmBtnView from "../../../commonView/gmCmdView/GmBtnView";
import LoginSuccessSignal from "../signals/LoginsuccessSignal";
import * as protocol from "../../../protocol/protocols/protocols";
import PlayerModel from "../../playerModule/models/PlayerModel";
export default class LoginGameServerCommand extends riggerIOC.Command {
	@inject(LoginModel)
	private model: LoginModel;

	@inject(LoginServer)
	private server: LoginServer;

	@inject(LoginSuccessSignal)
	private loginSuccessSignal: LoginSuccessSignal;

	@inject(PlayerModel)
	private playerModel: PlayerModel;


	constructor() {
		super();
		// this.EnterRoomRespSignal.once(this, this.onEnterRoomResp);
	}

	execute() {
		if (this.model.initiallizied) {
			// 重新登陆
			this.server.loginGameServer();
			this.loginSuccessSignal.once(this, this.onLoginSuccess);
		}
		else {
			console.log("game server connected");
			MyApplication.instance.nowGameState = GameState.ConnectedGameServer;
			this.server.loginGameServer();
			this.loginSuccessSignal.once(this, this.onLoginSuccess);
			this.model.initiallizied = true;
		}
	}

	/**
	  * 登陆成功
	  * @param resp 
	  */
	private onLoginSuccess(resp: protocol.LoginResp) {
		console.log("login success");

		this.model.loginInfo = resp;
		this.playerModel.init();

		MyApplication.instance.nowGameState = GameState.LoginedGameServer;

		if (resp.gm == 1) {
			// UIManager.instance.showWindow(GmBtnView, false, UIManager.instance.tipsLayer);
		}

		// 启动心跳
		rigger.service.HeartBeatService.instance.startHeartBeat();
		MyApplication.instance.nowGameState = GameState.EnteredGame;
		// 设置服务器时间
		TimeService.instance.setServerTime(resp.serverSec*1000);

		// console.log(`loginTime===${resp.serverSec}`);
		this.done();
	}

}