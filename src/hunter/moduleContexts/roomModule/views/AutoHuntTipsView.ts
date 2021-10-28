import UIWindow from "../../../utils/UIWindow";
import FUIAutoHuntingView from "../../../fui/roomScene/FUIAutoHuntingView";
import FUIAutoFireFishItem from "../../../fui/roomScene/FUIAutoFireFishItem";
import UIManager from "../../../manager/UIManager";
import DataMon from "../../../data/tpls/DataMon";
import inject = riggerIOC.inject;
import * as protocol from '../../../protocol/protocols/protocols';
import * as protocolSignals from '../../../protocol/signals/signals';
import FUIAutoHuntTipsView from "../../../fui/roomScene/FUIAutoHuntTipsView";
import AttactPatternChangedSignal from "../../fightModule/signals/AttackPatternChangedSignal";
import { AttactPattern } from "../../fightModule/models/FightModel";
export default class AutoHuntTipsView extends UIWindow<FUIAutoHuntTipsView> {
    /**战斗模式改变 */
    @inject(AttactPatternChangedSignal)
    private attactPatternChangedSignal: AttactPatternChangedSignal;

    constructor() {
        super();
        this.needMask = true;
        this.isCache = true;
    }

    static getUrl(): string {
        return FUIAutoHuntTipsView.URL;
    }

    onInit() {
        super.onInit();
    }

    onShown() {
        super.onShown();
        this.addEventListener();
        this.addProtocolListener();
        Laya.KeyBoardManager.enabled = false;
    }

    onHide() {
        super.onHide();
        this.removerEventListener();
        this.removerProtocolListener();
        Laya.KeyBoardManager.enabled = true;
    }

    dispose() {
        super.dispose();
    }


    layout() {
        let autoHuntGroup: riggerLayout.Group = new riggerLayout.Group(this.contentPane);
        autoHuntGroup.horizontalCenter = 0;
        autoHuntGroup.verticalCenter = 0;
        autoHuntGroup.width = riggerLayout.LayoutSpec.create(1, this.contentPane.width / this.contentPane.height, "60%");
        autoHuntGroup.height = riggerLayout.LayoutSpec.create(this.contentPane.width / this.contentPane.height, -1, "60%");
        RiggerLayout.layer.addChild(autoHuntGroup);
    }

    removeLayout() {
        RiggerLayout.layer.remove(this.contentPane);
    }

    funEx() {
    }

    addEventListener() {
        this.contentPane.on(Laya.Event.CLICK, this, this.onTipsClick);
    }

    removerEventListener() {
        this.contentPane.off(Laya.Event.CLICK, this, this.onTipsClick);
    }

    addProtocolListener() {
    }

    removerProtocolListener() {
    }

    private onTipsClick(e: Laya.Event) {
        let name = e.target.parent['$owner'].name
        if(!name) return;
        switch(name) {
            case 'enterBtn':
                this.attactPatternChangedSignal.dispatch(AttactPattern.normal);
                this.closeWindow();
                break;
            case 'cancelBtn':
            case 'closeBtn':
                this.closeWindow();
                break;
            default:
                break;
        }
    }

    closeWindow() {
        UIManager.instance.hideWindow(this);
    }
}