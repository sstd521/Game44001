/**
 * 子弹击中或出屏幕的信号,携带触发事件的相关信息
 */
import * as protocol from '../../../protocol/protocols/protocols';
export default class BulletDestorySignal extends riggerIOC.Signal<protocol.ShellResp> {
    constructor() {
        super();
    }
}