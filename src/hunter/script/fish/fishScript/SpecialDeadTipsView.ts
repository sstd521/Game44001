import FUIFishDeadTipsView from "../../../fui/roomScene/FUIFishDeadTipsView";

export default class SpecialDeadTipsView extends FUIFishDeadTipsView {
    constructor() {
        super();
    };

    protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
    }

    init(ctrIdx: number, fishUrl: string, coin: number) {
        this.m_content.m_coinTxt.text = coin / 100 + '';
        this.m_content.m_c1.selectedIndex = ctrIdx;
        this.m_content.m_fishLoader.url = fishUrl;
    }
    
    play(cb?: Laya.Handler) {
        // console.log(`play light`);
        this.m_t0.play(Laya.Handler.create(this, () => {
            cb && cb.run();
        }), 1);
    }

    dispose() {
        Laya.timer.once(200, this, () => {
            this.removeFromParent();
            super.dispose();
        });
    }
}