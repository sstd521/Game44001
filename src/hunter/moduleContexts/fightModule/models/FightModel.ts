/**
 * 战斗
 */
export default class FightModel extends riggerIOC.Model {
    constructor() {
        super();
    }

    /**
     * 当前攻击模式
     */
    public get attactPattern(): AttactPattern {
        return this._attactPattern;
    }
    public set attactPattern(value: AttactPattern) {
        this._attactPattern = value;
    }
    private _attactPattern: AttactPattern = AttactPattern.normal;

    dispose() {
    }
}

/**
 * 攻击模式
 */
export enum AttactPattern {
    //锁定模式
    lock,

    //自动模式
    auto,

    //自由模式
    normal
}