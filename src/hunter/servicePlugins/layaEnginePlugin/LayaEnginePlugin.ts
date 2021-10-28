import MyApplication from "../../MyApplication";
import Utils from "../../utils/Utils";
import ConnectService from "../../gameServices/connectService/ConnectService";
import DynamicLoadingView from "../../moduleContexts/assetsModule/views/loading/DynamicLoadingView";
import { ScreenMode } from "../../definitions/ScreenMode";

/**
* 引擎启动插件 
*/
@rigger.utils.DecoratorUtil.register
export default class LayaEnginePlugin extends rigger.AbsServicePlugin {
	static pluginName:string = "LayaEnginePlugin";
	
	constructor() {
		super();
	}

    /**
	 * @description 当主逻辑服务启动引擎时的回调，可以使用插件进行扩展，扩展后，原方法将被替换
	 * @extends rigger.utils.DecoratorUtil.makeExtendable(true)
	 * @param {MainLogicServiceConfig} config 主逻辑服务的配置
	 * @param {any} startupArgs
	 * @returns @type void
	 */
	protected onStartEngine(config: MainLogicServiceConfig, startupArgs?: any): void {
        let app: MyApplication = MyApplication.instance;
        let mainLogicService: MainLogicService = app.getRunningService<MainLogicService>(MainLogicService.serviceName);
        let cfg: MainLogicServiceConfig = mainLogicService.getConfig<MainLogicServiceConfig>();
		fairygui.UIConfig.defaultFont = cfg.defaultFont;
		if (2 === cfg.renderMode) {
			Laya.init(cfg.width, cfg.height, cfg.webGL ? Laya.WebGL : null);
		}
		else {
			Laya3D.init(cfg.width, cfg.height);
		}
		Laya["Physics"] && Laya["Physics"].enable();
		// Laya["PhysicsDebugDraw"] && Laya["PhysicsDebugDraw"].enable(1);
		// Laya.enableDebugPanel();
		Laya.Stat.show(0, 0);
		// Laya.WorkerLoader.workerPath = 'libs/laya/worker.js';
		// Laya.WorkerLoader.enable = true;

		Laya.Mouse.cursor = `url('mouse.png') 35 35,auto`;
		Laya.URL.rootPath = Laya.URL.basePath = "";
		Laya.stage.frameRate = cfg.frameRate;
		Laya.stage.scaleMode = cfg.scaleMode + "";
		Laya.stage.bgColor = cfg.backgroundColor;
		Laya.stage.screenMode = cfg.screenMode + "";

		Laya.stage.alignH = Laya.Stage.ALIGN_CENTER;
		Laya.stage.alignV = Laya.Stage.ALIGN_TOP;

		//Laya2.1.0 beta, 自行修复资源基础路径bug(等官方)
		// let location=Laya.Browser.window.location;
		// let pathName=location.pathname;
		// pathName=pathName.charAt(2)==':' ? pathName.substring(1):pathName;
		// Laya.URL.basePath = Laya.URL.getPath(location.protocol=="file:" ? pathName :location.protocol+"//"+location.host+location.pathname);

		// Common.TouchMoveFullScreen.instance().alreadyInGame();
		fairygui.GRoot.inst["needCheckPopups"] = true;
		Laya.stage.addChild(fairygui.GRoot.inst.displayObject);

		//初始化新的布局/适配
		let superLayer: riggerLayout.LayoutLayer = new riggerLayout.LayoutLayer(new LayaTopContainer(Laya.stage));
		RiggerLayout.addDefaultLayer(superLayer);
		riggerLayout.GlobalSettings.realLayoutItemClass = LayaLayoutItem;

		//添加原生事件,用于报表页面的跳转
		document.body.addEventListener("mouseup", this.onMouseup.bind(this));
		document.body.addEventListener("touchend", this.onTouchend.bind(this));

		//注册房间加载界面
		MyApplication.instance.registerInGameLoadingView(DynamicLoadingView);


		// Laya.timer.loop(300, this, () => {
		// 	if(!(Laya.stage.width == Laya.Browser.clientWidth && Laya.stage.height == Laya.Browser.clientHeight)) {
		// 		Laya.stage.scaleMode = Laya.Stage.SCALE_FULL;
		// 		console.log(`fix the scaleMode`);
		// 	}
		// });
		return;
	}

	private onMouseup() {
		if(Utils.IS_SHOW_LOG) {
			 let website: string = ConnectService.instance._getMetaValue("recordUrl");
			 window.open(website, "_blank");
			 Utils.IS_SHOW_LOG = false;
		}

	 }

	 private onTouchend() {
		 if(Utils.IS_SHOW_LOG) {
			 let website: string = ConnectService.instance._getMetaValue("recordUrl");
			 window.open(website, "_blank");
			 Utils.IS_SHOW_LOG = false;
		}
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