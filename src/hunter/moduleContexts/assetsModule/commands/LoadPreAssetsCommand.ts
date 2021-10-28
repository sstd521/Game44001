/**
* name 
*/
///<reference path = "../signals/AssetsLoadingProgressChangeSignal.ts" />
///<reference path = "../signals/AssetsLoadingCompleteSignal.ts" />

import TouchMoveFullScreen from '../../../utils/TouchMoveFullScreen';
import UIManager from '../../../manager/UIManager';
import AssetsUtils from '../../../utils/AssetsUtils';
import AssetsLoadingProgressChangeSignal from '../signals/AssetsLoadingProgressChangeSignal';
import AssetsLoadingCompleteSignal from '../signals/AssetsLoadingCompleteSignal';
import inject = riggerIOC.inject;
import Utils from '../../../utils/Utils';
	export default class LoadPreAssetsCommand extends riggerIOC.Command {
	constructor() {
		super();
	}

	@inject(AssetsLoadingProgressChangeSignal)
	private assetsLoadingProgressSignal: AssetsLoadingProgressChangeSignal;

	@inject(AssetsLoadingCompleteSignal)
	private loadingCompleteSignal: AssetsLoadingCompleteSignal;

	execute() {
		// --销毁动态载入文本提示
		eval("preloadTipDestroy()");
		
		// 显示加载界面
		UIManager.instance.showLoadingView();
		
		// 加载需要预加载的资源
		AssetsUtils.loadPreloadingAssets(rigger.RiggerHandler.create(this, this.onPreloadingAssetsComplete), rigger.RiggerHandler.create(this, this.onPreloadingAssetsProgress, null, false));
		
		if(Utils.isInLobby()) {
            document.location.href = "jplobby://cmd=ready";
        }
		
		// 全屏提示 ("上滑全屏"功能有文字提示，需预加载完语言包配置后才调用，所以移动到初始化加载界面显示时再启用)
		TouchMoveFullScreen.instance().alreadyInGame();
	}

	private onPreloadingAssetsComplete() {
		this.loadingCompleteSignal.once(this, this.onLoadingComplete);
		this.assetsLoadingProgressSignal.dispatch(1 * 100);
	}

	private onPreloadingAssetsProgress(v: number) {
		this.assetsLoadingProgressSignal.dispatch(v * 90);
	}

	private onLoadingComplete() {
		this.done();
	}
}