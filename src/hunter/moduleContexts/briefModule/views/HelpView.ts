import FUIHelpView from "../../../fui/briefUI/FUIhelpView";
import HelpItem from "./HelpItem";
import FUIHelpYuPanel from "../../../fui/briefUI/FUIHelpYuPanel";
import { FishTypeHelpView } from "./FishTypeHelpView";

export default class HelpView extends FUIHelpView {
    constructor() {
        super();
    }

    protected constructFromXML(xml: any): void {
        super.constructFromXML(xml);
        this.init();
    }

    private init() {
        this.addEventListener();
        this.initList();
    }

    /**生成列表 */
    initList(){
        for (var i = 0, len = 3; i < len; i++) {
            var item = HelpItem.getInstance(i);
            this.m_list.addChild(item);
        }
    }

    /**添加监听 */
    addEventListener() {
        for (var i = 0, len = 3; i < len; i++) {
            this["m_top" + i].onClick(this, this.onClick, [i]);
        }
    }

    onClick(index: number = 0) {
        this.m_c1.selectedIndex = index;
    }

    /**移除监听 */
    removeEventListener() {
        for (var i = 0, len = 3; i < len; i++) {
            this["m_top" + i].offClick(this, this.onClick, [i]);
        }
    }


}