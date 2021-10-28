/**
 * 发射子弹的信号,携带子弹基础信息
 */
import * as protocol from '../../../protocol/protocols/protocols';
export default class FireBulletSignal extends riggerIOC.Signal<protocol.ShellInfo> {
    constructor() {
        super();
    }
}