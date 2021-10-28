import UIWindow from "../../../utils/UIWindow";
import IDisconnectedView from "./IDisconnectedView";
import FUIDisconnectedView from "../../../fui/loginUi/FUIDisconnectedView";
import inject = riggerIOC.inject;
import OnClickReturnBtnSignal from "../signals/OnClickReturnBtnSignal";
/**
* name 
*/
export default class DisconnectedView extends UIWindow<FUIDisconnectedView> {
    public static getUrl(): string {
        return FUIDisconnectedView.URL;
    }
    /**
    * 返回大厅按钮的信号
    */
    @riggerIOC.inject(OnClickReturnBtnSignal)
    onClickReturnBtnSignal: OnClickReturnBtnSignal;
    constructor() {
        super();
        this.needMask = true;
    }

    onShown() {
        super.onShown();
        this.contentPane.m_okBtn.onClick(this, this.onClickOk);
    }

    onHide() {
        super.onHide();
        this.contentPane.m_okBtn.offClick(this, this.onClickOk);

    }

    onClickOk() {
        this.onClickReturnBtnSignal.dispatch();
    }


    layout(): void {
        super.layout();
        let disconnectedGroup: riggerLayout.Group = new riggerLayout.Group(this.contentPane);
        disconnectedGroup.name = "DisconnectedGroup";
        disconnectedGroup.horizontalCenter = 0;
        disconnectedGroup.verticalCenter = 0;
        disconnectedGroup.width = [riggerLayout.LayoutSpec.create(1, this.contentPane.width / this.contentPane.height, "60%"), RiggerLayoutHelper.createScreenP("60%")];
        disconnectedGroup.height = riggerLayout.LayoutSpec.create(this.contentPane.width / this.contentPane.height, -1, "60%");
        RiggerLayout.layer.addChild(disconnectedGroup);
    }
}