/**
* 
*/
///<reference path = "AbstractLoadingView.ts" />
///<reference path = "LoadingView.ts" />
///<reference path = "../../signals/AssetsLoadingProgressChangeSignal.ts" />
///<reference path = "../../signals/AssetsLoadingCompleteSignal.ts" />
import AbstractLoadingView from './AbstractLoadingView';
import AssetsLoadingProgressChangeSignal from '../../signals/AssetsLoadingProgressChangeSignal';
import AssetsLoadingCompleteSignal from '../../signals/AssetsLoadingCompleteSignal';
export default class LoadingViewMediator extends riggerIOC.Mediator {
	@riggerIOC.inject(AbstractLoadingView)
	private view: AbstractLoadingView<fairygui.GComponent>;

	@riggerIOC.inject(AssetsLoadingProgressChangeSignal)
	private progressSignal: AssetsLoadingProgressChangeSignal;

	@riggerIOC.inject(AssetsLoadingCompleteSignal)
	private loadCompleteSignal: AssetsLoadingCompleteSignal;

	constructor() {
		super();
	}

	onInit(): void {
		this.progressSignal.on(this, this.onProgressUpdate);
		this.view.onComplete(this, this.onCompleteHandler);
	}

	onShown(): void {
	}

	onHide(): void {
	}

	dispose(): void {
		this.view = null;
		this.progressSignal.dispose();
		this.progressSignal = null;
		this.loadCompleteSignal.dispose();
		this.loadCompleteSignal = null;
	}



	private onProgressUpdate(v: number) {
		this.view.setProgress(v);
	}

	private onCompleteHandler() {
		this.loadCompleteSignal.dispatch();
	}
}