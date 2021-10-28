/**
* name 
*/
import * as protocolSignals from "../../protocol/signals/signals";
import * as protocol from "../../protocol/protocols/protocols";
import inject = riggerIOC.inject;
import ErrRespSignal = protocolSignals.ErrRespSignal;
import ConnectGameServerCommand from "./commands/ConnectGameServerCommand";
import LoginGameServerCommand from "./commands/LoginGameServerCommand";
import OnClickReturnBtnSignal from "./signals/OnClickReturnBtnSignal";
import OnClickGameReportBtnSignal from "./signals/OnClickGameReportBtnSignal";
import LoginSuccessCommand from "./commands/LoginSuccessCommand";
import LoginSuccessSignal from "./signals/LoginsuccessSignal";
import ReturnToLobbyCommand from "./commands/ReturnToLobbyCommand";
import GameReportCommand from "./commands/GameReportCommand";
import ConnectGameServerSignal from "./signals/ConnectGameServerSignal";
import IDisconnectedView from "./views/IDisconnectedView";
import LoginServer from "./servers/LoginServer";
import LoginModel from "./models/LoginModel";
import DisconnectedView from "./views/DisconnectedView";
export default class LoginContext extends riggerIOC.ModuleContext {
	@inject(ConnectGameServerSignal)
	private connectGameServerSignal: ConnectGameServerSignal;

	@inject(LoginSuccessSignal)
	private LoginSuccessSignal: LoginSuccessSignal;

	constructor(appContext: riggerIOC.ApplicationContext) {
		super(appContext);
	}

	dispose() {
		super.dispose();
		this.connectGameServerSignal.dispose();
		this.connectGameServerSignal = null;
	}

	bindInjections(): void {
		this.injectionBinder.bind(LoginModel).toSingleton();
		this.injectionBinder.bind(LoginServer).toSingleton();

		this.injectionBinder.bind(LoginSuccessSignal).toSingleton();
		// this.injectionBinder.bind(IDisconnectedView).to(DisconnectedView);
		this.injectionBinder.bind(DisconnectedView).toSingleton();
		this.injectionBinder.bind(OnClickGameReportBtnSignal).toSingleton();
	}

	bindCommands(): void {
		// 连接，登陆游戏服的流程
		this.commandBinder.bind(ConnectGameServerSignal)
			.inSequence()
			.once()
			// 连接游戏服
			.to(ConnectGameServerCommand)
			// 登陆游戏服
			.to(LoginGameServerCommand)
			// 事了拂衣去
			.toValue(this.doneCommand);

		// 返回大厅的命令
		this.commandBinder.bind(OnClickReturnBtnSignal).to(ReturnToLobbyCommand);
		this.commandBinder.bind(OnClickGameReportBtnSignal).to(GameReportCommand);
		this.commandBinder.bind(LoginSuccessSignal).to(LoginSuccessCommand);
	}

	bindMediators(): void {

	}

	onStart(): void {
		this.connectGameServerSignal.dispatch();
	}
}