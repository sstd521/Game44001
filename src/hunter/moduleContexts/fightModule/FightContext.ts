/**
* 战斗模块的上下文
*/
import ApplicationContext = riggerIOC.ApplicationContext
import FightServer from "./servers/fightServer";
import FightModel from "./models/FightModel";
import FreshFishSignal from "./signals/FreshFishSignal";
import BulletDestorySignal from "./signals/BulletDestorySignal";
import FireBulletSignal from "./signals/FireBulletSignal";
import AttactPatternChangedSignal from "./signals/AttackPatternChangedSignal";
import AttartPatternCommand from "./commands/AttartPatternCommand";
import FishInfoUpdateSignal from "./signals/FishInfoUpdateSignal";
export default class FightContext extends riggerIOC.ModuleContext {
	constructor(appContext: ApplicationContext) {
		super(appContext);
	}

	dispose(): void {
		this.dispose();
	}

	bindInjections(): void {
        this.injectionBinder.bind(FightServer).toValue(new FightServer());
		this.injectionBinder.bind(FightModel).toValue(new FightModel());
		this.injectionBinder.bind(FreshFishSignal).toSingleton();
		this.injectionBinder.bind(BulletDestorySignal).toSingleton();
		this.injectionBinder.bind(FireBulletSignal).toSingleton();
		this.injectionBinder.bind(AttactPatternChangedSignal).toSingleton();
		this.injectionBinder.bind(FishInfoUpdateSignal).toSingleton();
	}

	bindCommands(): void {
		this.commandBinder.bind(AttactPatternChangedSignal).to(AttartPatternCommand);
	}

	bindMediators(): void {

	}

	protected onStart(): void {
		this.done();
	}
}