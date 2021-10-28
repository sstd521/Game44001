import FUIHelpItem from "../../../fui/briefUI/FUIHelpItem";

export default class HelpItem extends FUIHelpItem {
    constructor() {
        super();
    }

    static getInstance(idx: number) {
        let item = FUIHelpItem.createInstance();
        item.m_c1.selectedIndex = idx;
        return item;
    }
}