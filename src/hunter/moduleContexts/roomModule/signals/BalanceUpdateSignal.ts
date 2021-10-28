/**
 * 玩家余额更新,带参数玩家id
 */
export default class BalanceUpdateSignal extends riggerIOC.Signal<number[]> {
    constructor() {
        super();
    }
}