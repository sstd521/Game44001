/**
* name 
*/
import MyApplication from '../../../MyApplication';
export default class InitAssetsVersionCommand extends riggerIOC.Command{
		constructor(){
			super();
		}

		execute(){
			let app:rigger.BaseApplication = MyApplication.instance;
			let assetsService:rigger.service.AssetsService = app.getRunningService<rigger.service.AssetsService>(rigger.service.AssetsService.serviceName);
			let mainLoginService:MainLogicService = app.getRunningService<MainLogicService>(MainLogicService.serviceName);
			
			let config: MainLogicServiceConfig = mainLoginService.getConfig<MainLogicServiceConfig>();
			if(config.resVersionAvailable == true) {
				// 初始化资源版本
				Laya.ResourceVersion.enable('version.json', Laya.Handler.create(this, () => {
					assetsService.initVersion(rigger.RiggerHandler.create(this, this.onAssetsVersionInit));
				}));
			}
			else {
				console.log("AssetsManager:res version switch is off, so disable res version");
				this.onAssetsVersionInit();
			}
		}

		onAssetsVersionInit(){
			this.done();
		}
	}