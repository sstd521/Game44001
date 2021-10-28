/**
* 登陆服务器
*/
import inject = riggerIOC.inject;
import LoginRespSignal = protocolSignals.LoginRespSignal;
import ConnectService from "../../../gameServices/connectService/ConnectService";
import LoginSuccessSignal from "../signals/LoginsuccessSignal";
import CommandCodes from "../../../protocol/CommandCodes";
import * as protocol from "../../../protocol/protocols/protocols";
import * as protocolSignals from "../../../protocol/signals/signals";
import CoinLackSignal from "../../roomModule/signals/CoinLackSignal";
import ShowTipsSignal from "../../roomModule/signals/ShowTipsSignal";
export default class LoginServer extends riggerIOC.Server {
	@inject(LoginSuccessSignal)
	private loginSuccessSignal: LoginSuccessSignal;

	@inject(protocolSignals.LoginRespSignal)
	private loginRespSignal: LoginRespSignal;

	@inject(protocolSignals.ErrRespSignal)
	private errRespSignal: protocolSignals.ErrRespSignal;

	@inject(ShowTipsSignal)
	private showTipsSignal: ShowTipsSignal;

	/**余额不足 */
	@inject(CoinLackSignal)
	private coinLackSignal: CoinLackSignal;

	constructor() {
		super();
		this.loginRespSignal.once(this, this.onLoginResp);
		this.errRespSignal.on(this, this.onErrResp);
		// EventServiceUtil.addProtocolListener(CommandCodes.PPLoginResp, this, this.onLoginResp);
	}

	/**
	  * 连接游戏服
	  */
	connectGameServer() {
		// 连接游戏服
		ConnectService.instance.connectGameServer();
	}

	/**
	  * 登陆游戏服
	  */
	loginGameServer() {
		ConnectService.instance.loginGameServer();
	}

	/**
	  * 登陆成功
	  * @param resp 
	  */
	private onLoginResp(resp: protocol.LoginResp) {
		// 派发成功信息			
		this.loginSuccessSignal.dispatch(resp);
	}

	// 发送准备完成协议
	public sendhuntReadyReq() {
		// let req: protocol.huntReadyReq = new protocol.huntReadyReq();
		// rigger.service.NetworkService.instance.send(NetworkChannelNames.GameChannel, CommandCodes.PPhuntReadyReq, req);
	}

	/**
	 * 错误码
	 * @param resp 
	 */
	private onErrResp(resp: protocol.ErrResp) {
		let cmd = resp.cmd;
		let code = resp.errCode ? resp.errCode : null;
		let msg = resp.errMsg ? resp.errMsg : null;
		if(code == 40010) return;
		if(code == 40003) this.coinLackSignal.dispatch();
		if(code == 40011) this.showTipsSignal.dispatch(2);
		console.log(`Err====cmd==${cmd},,,code==${code},,,msg===${msg}`);
	}

	dispose() {
		this.loginRespSignal = null;
		this.loginSuccessSignal = null;
	}
}