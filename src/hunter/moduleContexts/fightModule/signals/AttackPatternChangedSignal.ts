import { AttactPattern } from "../models/FightModel";
/**
 * 攻击模式改变的信号
 */
export default class AttactPatternChangedSignal extends riggerIOC.Signal<AttactPattern> {
    constructor() {
        super();
    }
}