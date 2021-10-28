/**
* 资源模块
*/
///<reference path="signals/StartLoadAssetsSignal.ts" />
///<reference path="signals/AssetsLoadingCompleteSignal.ts" />
///<reference path="signals/AssetsLoadingProgressChangeSignal.ts" />
import inject = riggerIOC.inject;
import StartLoadAssetsSignal from "./signals/StartLoadAssetsSignal";
import AssetsLoadingCompleteSignal from "./signals/AssetsLoadingCompleteSignal";
import AssetsLoadingProgressChangeSignal from "./signals/AssetsLoadingProgressChangeSignal";
import AbstractLoadingView from "./views/loading/AbstractLoadingView";
import LoadingView from "./views/loading/LoadingView";
import InitAssetsVersionCommand from "./commands/InitAssetsVersionCommand";
import LoadLoadingAssetsCommand from "./commands/LoadLoadingAssetsCommand";
import LoadPreAssetsCommand from "./commands/LoadPreAssetsCommand";
import LoadingViewMediator from "./views/loading/LoadingViewMediator";
export default class AssetsContext extends riggerIOC.ModuleContext {
	@inject(StartLoadAssetsSignal)
	private startLoadAssetsSignal: StartLoadAssetsSignal;

	constructor(app: riggerIOC.ApplicationContext) {
		super(app);
	}

	/**
	  * 绑定注入
	  */
	bindInjections(): void {
		console.log("bind inject in assets context");
		// 绑定信号
		this.injectionBinder.bind(AssetsLoadingCompleteSignal).toSingleton();
		this.injectionBinder.bind(AssetsLoadingProgressChangeSignal).toSingleton();
		this.injectionBinder.bind(AbstractLoadingView).to(LoadingView);
	}

	bindCommands(): void {
		// console.log("bind commands");
		console.log("bind commands in assets context");

		// 加载资源的命令序列
		this.commandBinder
			.bind(StartLoadAssetsSignal)
			// 按顺序执行
			.inSequence()
			// 一次后失效
			.once()
			// 初始化资源版本
			.to(InitAssetsVersionCommand)
			// 加载初始资源
			.to(LoadLoadingAssetsCommand)
			// 加载预加载资源
			.to(LoadPreAssetsCommand)
			// 搞定收工
			.toValue(this.doneCommand);
	}

	bindMediators(): void {
		console.log("bind mediators in assets context");
		this.mediationBinder.bind(AbstractLoadingView).to(LoadingViewMediator);
	}

	onStart() {
		console.log("start assets context");
		this.startLoadAssetsSignal.dispatch();
	}
}