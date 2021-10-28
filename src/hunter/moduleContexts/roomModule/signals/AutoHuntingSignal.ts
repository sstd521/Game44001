/**
 * 自动捕鱼的信号,带参数 鱼id列表
 */
export default class AutoHuntingSignal extends riggerIOC.Signal<number[]> {
    constructor() {
        super();
    }
}