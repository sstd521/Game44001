/**
 * 余额不足
 */
export default class CoinLackSignal extends riggerIOC.Signal<number> {
    constructor() {
        super();
    }
}