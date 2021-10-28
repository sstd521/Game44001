import OnClickReturnBtnSignal from "../signals/OnClickReturnBtnSignal";

/**
* 断线（重连）提示面板
*/
export default abstract class IDisconnectedView extends riggerIOC.View {
	/**
	  * 返回大厅按钮的信号
	  */
	public onClickReturnBtnSignal: OnClickReturnBtnSignal;
	constructor() {
		super();
	}
}