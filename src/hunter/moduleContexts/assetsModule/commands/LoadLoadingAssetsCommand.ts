/**
* name 
*/
import AssetsUtils from '../../../utils/AssetsUtils';
export default class LoadLoadingAssetsCommand extends riggerIOC.Command {
	constructor() {
		super();
	}

	execute() {
		// 加载初始资源
		AssetsUtils.loadInitialAssets(this, this.onLoadingAssetsLoad);
	}

	onLoadingAssetsLoad() {

		this.done();
	}
}