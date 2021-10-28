import UIManager from "../../../manager/UIManager";
import TipView from "../../briefModule/views/TipView";

/**
 * 打开帮助弹窗命令
 */
export default class OpenHelpCommand extends riggerIOC.Command {
    constructor() {
        super();
    }

    execute() {
        UIManager.instance.showWindow(TipView, true, UIManager.instance.popupLayer, [2]);
        this.done();
    }
}