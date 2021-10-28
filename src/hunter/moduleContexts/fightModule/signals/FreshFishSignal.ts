/**
 * 刷新鱼的信号
 */
import * as protocol from '../../../protocol/protocols/protocols';
export default class FreshFishSignal extends riggerIOC.Signal<protocol.MonInfo[]> {
    constructor() {
        super();
    }
}