import inject = riggerIOC.inject;
import UIWindow from "../../../utils/UIWindow";
import FUITipView from "../../../fui/briefUI/FUITipView";
import UIManager from "../../../manager/UIManager";
import { ScreenMode } from "../../../definitions/ScreenMode";
import BriefServer from "../servers/BriefServer";

export default class TipView extends UIWindow<FUITipView> {
        @inject(BriefServer)
        private briefServer: BriefServer;

        constructor() {
                super();
                this.needMask = false;
                this.isCache = true;
        }

        public static getUrl(): string {
                return FUITipView.URL;
        }

        onInit() {
                super.onInit();
        }

        onShown(): void {
                super.onShown();
                this.addEvent();
                this.onResize(UIManager.instance.changedScreenMode);
        }

        funEx(index: number = 0) {
                this.contentPane.m_context.m_c1.selectedIndex = index;
                if (index == 1) {
                        // 排行榜
                        // this.briefServer.rankReq(1);
                }
        }

        /**添加绑定 */
        private addEvent(): void {
                this.contentPane.m_context.m_closeBtn.onClick(this, this.closer);
        }

        /**移除绑定 */
        private removeEvent(): void {
                this.contentPane.m_context.m_closeBtn.offClick(this, this.closer);
        }

        onHide(): void {
                super.onHide();
                this.removeEvent();
        }

        closer() {
                UIManager.instance.hideWindow(this);
        }

        layout() {
                let contextGroup: riggerLayout.Group = new riggerLayout.Group(this.contentPane.m_context);
                contextGroup.name = 'contextGroup';
                contextGroup.height = RiggerLayoutHelper.createScreenL("100%");
                contextGroup.width = RiggerLayoutHelper.createScreenP("110%");
                contextGroup.horizontalCenter = 0;
                contextGroup.verticalCenter = 0;
                RiggerLayout.layer.addChild(contextGroup);
        }

        /**移除适配 */
        protected removeLayout() {
                RiggerLayout.layer.remove(this.contentPane.m_context);
        }

        onResize(changedScreenMode: ScreenMode) {

        }

        dispose() {
                // super.dispose();
        }
}