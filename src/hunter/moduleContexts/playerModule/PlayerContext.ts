/**
* 玩家模块的上下文
*/
import ApplicationContext = riggerIOC.ApplicationContext
import PlayerServer from "./servers/PlayerServer";
import PlayerModel from "./models/PlayerModel";
import PlayerInfoUpdateSignal from "./signals/PlayerInfoUpdateSignal";
import inject = riggerIOC.inject;
export default class PlayerContext extends riggerIOC.ModuleContext {
	constructor(appContext: ApplicationContext) {
		super(appContext);
	}

	dispose(): void {
		this.dispose();
	}

	bindInjections(): void {
        this.injectionBinder.bind(PlayerModel).toValue(new PlayerModel());
        this.injectionBinder.bind(PlayerServer).toValue(new PlayerServer());
        this.injectionBinder.bind(PlayerInfoUpdateSignal).toSingleton();
	}

	bindCommands(): void {

	}

	bindMediators(): void {

	}

	protected onStart(): void {
		this.done();
	}
}