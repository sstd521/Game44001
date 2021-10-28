/**
 * 请求进入房间信号,带房间id
 */
export default class EnterRoomSignal extends riggerIOC.Signal<number> {
    constructor() {
        super();
    }
}