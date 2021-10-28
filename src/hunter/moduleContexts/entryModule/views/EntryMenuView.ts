import FUIMenuView from "../../../fui/entry/FUIMenuView";
import UIManager from "../../../manager/UIManager";
import UIWindow from "../../../utils/UIWindow";
import TipView from "../../briefModule/views/TipView";
import ConnectService from "../../../gameServices/connectService/ConnectService";
import Utils from "../../../utils/Utils";
import inject = riggerIOC.inject;
import openReportSignal from "../signals/openReportSignal";
import OpenHelpViewSignal from "../signals/OpenHelpViewSignal";
import OpenSetViewSignal from "../signals/OpenSetViewSignal";
import OnClickReturnBtnSignal from "../../loginModule/signals/OnClickReturnBtnSignal";
import FUIMenuBtn from "../../../fui/entry/FUIMenuBtn";
import FUImenuBtn from "../../../fui/roomScene/FUImenuBtn";
export default class InfoView extends FUIMenuView {
    /**打开报表 */
    @inject(openReportSignal)
    private openReportSignal: openReportSignal;

    /**打开帮助 */
    @inject(OpenHelpViewSignal)
    private openHelpViewSignal: OpenHelpViewSignal;

    /**打开设置 */
    @inject(OpenSetViewSignal)
    private openSetViewSignal: OpenSetViewSignal;

    @inject(OnClickReturnBtnSignal)
    private onClickReturnBtnSignal: OnClickReturnBtnSignal;

    protected constructFromXML(xml: any): void {
        super.constructFromXML(xml);
        this.init();
        this.addEventListener();
    }

    private init() {
        this.m_settingBtnList.itemRenderer = Laya.Handler.create(this, this.onRender, null, false);
        this.m_settingBtnList.numItems = this.menuBtnName.length;

        let recordBtn = this.m_settingBtnList.getChild('bydr_dt_btn_baobiao');
        let lobbyBtn = this.m_settingBtnList.getChild('bydr_dt_btn_dt');
        if(!ConnectService.instance._getMetaValue('recordUrl')) recordBtn && this.m_settingBtnList.removeChild(recordBtn);
        if(Laya.Browser.onPC || !ConnectService.instance.lobbyUrl) lobbyBtn && this.m_settingBtnList.removeChild(lobbyBtn);
    }

    private addEventListener() {
        this.m_settingBtnList.on(fairygui.Events.CLICK_ITEM, this, this.onClickItem);
    }

    private removeEventListener() {
        this.m_settingBtnList.off(fairygui.Events.CLICK_ITEM, this, this.onClickItem);
    }

    private menuBtnName: string[] = ['bydr_dt_btn_shezhi', 'bydr_dt_btn_paihang', 'bydr_dt_btn_bangzhu', 'bydr_dt_btn_baobiao',
                                     'bydr_dt_btn_dt'];
    private onRender(idx: number, item: FUIMenuBtn) {
        if(item) {
            item.m_n10.url = 'ui://entry/' + this.menuBtnName[idx];
            item.name = this.menuBtnName[idx];
        }
    }

    private onClickItem(item: FUImenuBtn) {
        let name = item.name;
        if(!name) return;
        switch(name) {
            case 'bydr_dt_btn_shezhi':
            this.openSetViewSignal.dispatch();
                break;
            case 'bydr_dt_btn_paihang':
                UIManager.instance.showWindow(TipView, true, UIManager.instance.popupLayer, [1]);
                break;
            case 'bydr_dt_btn_bangzhu':
                this.openHelpViewSignal.dispatch();
                break;
            case 'bydr_dt_btn_baobiao':
                this.openReportSignal.dispatch();
                break;
            case 'bydr_dt_btn_dt':
                this.onClickReturnBtnSignal.dispatch();
                break;
            default :
                break;
        }
    }

    public dispose() {
        super.dispose();
        this.removeEventListener();
    }
}
