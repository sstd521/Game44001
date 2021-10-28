import FUIcatchAllLineView from "../../../fui/roomScene/FUIcatchAllLineView";

export default class CatchAllAniView extends FUIcatchAllLineView {
    constructor() {
        super();
    };

    protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
    }
    
    /**
     * 闪电链动画
     * @param time 闪电时间 
     * @param length 闪电长度
     * @param cb 动画播放完回调
     */
    play(time: number = 500, length: number = 1530, cb?: Laya.Handler) {
        console.log(`play light`);
        Laya.Tween.to(this.m_n1, {width: length}, time, null, Laya.Handler.create(this, () => {
            console.log(`end light`);
            cb && cb.run();
            // this.dispose();
        }));    
    }

    dispose() {
        Laya.timer.once(200, this, () => {
            this.removeFromParent();
            super.dispose();
        });
    }
}