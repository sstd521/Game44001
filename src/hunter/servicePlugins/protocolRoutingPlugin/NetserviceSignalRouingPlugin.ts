import DecoratorUtil from "../../utils/DecoratorUtil";

/**
* name 
*/
@rigger.utils.DecoratorUtil.register
export default class NetserviceSignalRouingPlugin extends rigger.AbsServicePlugin {
	static pluginName: string = "NetserviceSignalRouingPlugin";

	constructor() {
		super();
	}

	protected route(channelName: string | number, pkg: rigger.service.INetworkPackage): void {
		// let evtService:EventService = EventService.instance;
		let code = pkg.innerData[0];
		let signal = DecoratorUtil.getProtocolResponseSignal(code);
		signal.dispatch(pkg.innerData[1]);
		// console.log(code);
		// if(code == 19) console.log(pkg.innerData[1]);
		// evtService.dispatchEvent(pkg.innerData[0], NetworkService.serviceName, pkg.innerData[1], channelName);

	}

	/**
	  * 插件开始时的回调 
	  * @param resultHandler 
	  * @param startupArgs 
	  */
	protected onStart(resultHandler: rigger.RiggerHandler, startupArgs: any[]): void {
		resultHandler.success();
	}

	/**
	  * 插件停止时的回调 
	  * @param resultHandler 
	  */
	protected onStop(resultHandler: rigger.RiggerHandler): void {
		resultHandler.success();
	}

	/**
	  * 插件重启时的回调
	  * @param resultHandler 
	  */
	protected onRestart(resultHandler: rigger.RiggerHandler): void {
		resultHandler.success();
	}
}