import UIManager from "../../../manager/UIManager";
import TipView from "../../briefModule/views/TipView";

/**
 * 打开设置弹窗命令
 */
export default class OpenSetCommand extends riggerIOC.Command {
    constructor() {
        super();
    }

    execute() {
        UIManager.instance.showWindow(TipView, true, UIManager.instance.popupLayer, [0]);
        this.done();
    }
}