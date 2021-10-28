/**
* 房间模块的上下文
*/
import ApplicationContext = riggerIOC.ApplicationContext
import EnterRoomSignal from "./signals/EnterRoomSignal";
import EnterRoomCommand from "./commands/EnterRoomCommand";
import ShowRoomSignal from "./signals/ShowRoomSignal";
import ShowRoomCommand from "./commands/ShowRoomCommand";
import RoomModel from "./models/RoomModel";
import RoomServer from "./servers/RoomServer";
import * as protocol from '../../protocol/protocols/protocols';
import * as protocolSignals from '../../protocol/signals/signals';
import NetworkChannelNames from "../../definitions/NetworkChannelNames";
import CommandCodes from "../../protocol/CommandCodes";
import ExitRoomSignal from "./signals/ExitRoomSignal";
import PlayerExitRoomSignal from "./signals/PlayerExitRoomSIgnal";
import ExitRoomCommand from "./commands/ExitRoomCommand";
import RoomView from "./views/RoomView";
import RoomViewMediator from "./views/RoomViewMediator";
import NewPlayerSignal from "./signals/NewPlayerSignal";
import RoomInfoInitSignal from "./signals/RoomInfoInitSignal";
import BalanceUpdateSignal from "./signals/BalanceUpdateSignal";
import BatteryLvUpdateSignal from "./signals/BatteryLvUpdateSignal";
import AutoHuntingView from "./views/AutoHuntingView";
import AutoHuntingViewMediator from "./views/AutoHuntingViewMediator";
import AutoHuntingSignal from "./signals/AutoHuntingSignal";
import AutoHuntingFishHuntedSignal from "./signals/AutoHuntingFishHuntedSignal";
import CoinLackSignal from "./signals/CoinLackSignal";
import RoomViewLoadSignal from "./signals/RoomViewLoadSignal";
import RoomViewLoadCommand from "./commands/RoomViewLoadCommand";
import ShowTipsSignal from "./signals/ShowTipsSignal";
export default class RoomContext extends riggerIOC.ModuleContext {
	constructor(appContext: ApplicationContext) {
		super(appContext);
	}

	dispose(): void {
		this.dispose();
	}

	bindInjections(): void {
		this.injectionBinder.bind(RoomModel).toValue(new RoomModel());
		this.injectionBinder.bind(RoomServer).toValue(new RoomServer());
		this.injectionBinder.bind(EnterRoomSignal).toSingleton();
		this.injectionBinder.bind(ShowRoomSignal).toSingleton();
		this.injectionBinder.bind(ExitRoomSignal).toSingleton();
		this.injectionBinder.bind(PlayerExitRoomSignal).toSingleton();
		this.injectionBinder.bind(NewPlayerSignal).toSingleton();
		this.injectionBinder.bind(RoomInfoInitSignal).toSingleton();
		this.injectionBinder.bind(BalanceUpdateSignal).toSingleton();
		this.injectionBinder.bind(BatteryLvUpdateSignal).toSingleton();
		this.injectionBinder.bind(AutoHuntingSignal).toSingleton();
		this.injectionBinder.bind(AutoHuntingFishHuntedSignal).toSingleton();
		this.injectionBinder.bind(CoinLackSignal).toSingleton();
		this.injectionBinder.bind(RoomViewLoadSignal).toSingleton();
		this.injectionBinder.bind(ShowTipsSignal).toSingleton();
	}

	bindCommands(): void {
		// 请求进入房间的命令
		this.commandBinder.bind(EnterRoomSignal).to(EnterRoomCommand);
		//显示房间界面的命令
		this.commandBinder.bind(ShowRoomSignal).to(ShowRoomCommand);
		//房间资源初始化完毕的命令
		this.commandBinder.bind(RoomViewLoadSignal).to(RoomViewLoadCommand);
		//退出房间的命令
		this.commandBinder.bind(ExitRoomSignal).to(ExitRoomCommand);
	}

	bindMediators(): void {
		this.mediationBinder.bind(RoomView).to(RoomViewMediator);
		this.mediationBinder.bind(AutoHuntingView).to(AutoHuntingViewMediator);
	}

	protected onStart(): void {

		this.done();
	}
}