/**
 * 炮台等级更新,带参数玩家id
 */
export default class BatteryLvUpdateSignal extends riggerIOC.Signal<number> {
    constructor() {
        super();
    }
}