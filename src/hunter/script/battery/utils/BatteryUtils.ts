import FUIAimLineView from "../../../fui/roomScene/FUIAimLineView";

export default class BatteryUtils {
    constructor() {
    }

    public static aimLineSignal: string = 'AIM_LINE_SIGNAL';

    public static getAimLineView(): FUIAimLineView {
       return rigger.service.PoolService.instance.getItemByClass(BatteryUtils.aimLineSignal, BatteryUtils.createAimLineView);
    }

    public static recoverAimLineView(view: FUIAimLineView) {
        view.m_mask.width = 0;
        view.removeFromParent();
        rigger.service.PoolService.instance.recover(BatteryUtils.aimLineSignal, view);
    }

    private static createAimLineView(): FUIAimLineView {
        let aimLineView: FUIAimLineView = FUIAimLineView.createInstance();
        aimLineView.touchable = false;
        return aimLineView;
    }
}