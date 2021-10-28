declare class RiggerLayoutHelper {
    constructor();
    /**
     * 创建一个以屏幕宽高比为条件的适配规范
     * @param minRatio
     * @param maxRatio
     * @param value
     * @param min
     * @param max
     */
    static createScreen(minRatio: number, maxRatio: number, value: string | number, min?: string | number, max?: string | number): riggerLayout.LayoutSpec;
    /**
     * 创建一个仅横屏生效的适配规范
     * @param value
     * @param min
     * @param max
     */
    static createScreenL(value: string | number, min?: string | number, max?: string | number): riggerLayout.LayoutSpec;
    /**
     * 创建一个仅竖屏生效的适配规范
     * @param value
     * @param min
     * @param max
     */
    static createScreenP(value: string | number, min?: string | number, max?: string | number): riggerLayout.LayoutSpec;
    /**
     * 获取屏幕的宽高比
     */
    static getScreenRatio(): number;
    private static isScreenFit;
}
