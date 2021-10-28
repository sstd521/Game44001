import UIWindow from "../../../utils/UIWindow";
import FUIGuideView from "../../../fui/roomScene/FUIGuideView";
import UIManager from "../../../manager/UIManager";
import Utils from "../../../utils/Utils";

export default class GuideView extends UIWindow<FUIGuideView> {
    constructor() {
        super();
        this.isCache = false;
        this.needMask = true;
    }

    static getUrl(): string {
        return FUIGuideView.URL;
    }

    onInit() {
        super.onInit();
        Utils.IS_SHOW_GUID_VIEW = false;
    }

    onShown() {
        super.onShown();
        this.addEventListener();
        Laya.KeyBoardManager.enabled = false;
    }

    onHide() {
        super.onHide();
        this.removeEventListener();
        Laya.KeyBoardManager.enabled = true;        
    }

    addEventListener() {
        this.contentPane.on(Laya.Event.CLICK, this, this.onGuideClick);
    }

    removeEventListener() {
        this.contentPane.off(Laya.Event.CLICK, this, this.onGuideClick);
    }

    layout() {
        let guideGroup: riggerLayout.Group = new riggerLayout.Group(this.contentPane);
        guideGroup.horizontalCenter = 0;
        guideGroup.verticalCenter = 0;
        guideGroup.width = '100%';
        guideGroup.height = '100%';
        RiggerLayout.layer.addChild(guideGroup);
    }

    removeLayout() {
        RiggerLayout.layer.remove(this.contentPane);
    }

    private onGuideClick() {
        UIManager.instance.hideWindow(this);
    }
}