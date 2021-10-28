import * as protocol from '../../../protocol/protocols/protocols';
 /**
 * 鱼数据更新信号
 */
export default class FishInfoUpdateSignal extends riggerIOC.Signal<protocol.MonInfo[]> {
    constructor() {
        super();
    }
}