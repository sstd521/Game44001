export interface Ibullet {
    /**锁定的目标对象Id */
    lockFishId: number;

    /**发射时的点击点 */
    fireClickPoint: Laya.Point;

    /**出生点 */
    startPoint: Laya.Point;

    /**发射时间 */
    fireTime: number;

    /**状态 */
    state: bulletState;

    /**速度 */
    speed: number;

    /**炮弹id */
    bulletId: number

    /**炮弹x轴方向 */
    bulletXDirection: Direction;

     /**炮弹y轴方向 */
     bulletYDirection: Direction;

    /**拥有者Id */
    ownerId: number

}

/**
 * 子弹状态
 */
export enum bulletState {
    /**锁定模式 */
    lock = 1,
    /**自由射击 */
    unlock
}

/**
 * 上下左右
 */
export enum  Direction {
    up = 1,
    bottom,
    left,
    right,
    none
}