/**
 * 自动捕鱼模式下,鱼被捕获的信号,携带参数鱼id,金币奖励
 */
export default class AutoHuntingFishHuntedSignal extends riggerIOC.Signal<number[]> {
    constructor() {
        super();
    }
}