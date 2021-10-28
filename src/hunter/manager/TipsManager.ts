enum TipState
{
    /**
     * 空闲状态
     */
    Idle = 1,

    /**
     * 普通旋转中
     */
    Rolling = 2,

    /**
     * 自动旋转中
     */
    RollingInAuto = 3,

    /**
     * 旋转结束且获得了奖励
     */    
    RollOverWithRewards = 4,

    /**
     * 正在进行直到（小游戏）旋转
     */
    RollingUntilBonusGame = 5,

    /**
     * 手动停止了自动旋转
     */
    ManualStopAutoRoll = 6,
    // TODO 自动游戏次数用尽后，等轮播结束后显示“自动游戏已停止”如何实现？

    // 自动游戏中奖线轮播完毕
    AutoGameShowLineOver = 7,

    // 获得免费游戏
    // RollingOverWithFreeGame = 8,

    // 获得奖励游戏
    // RollingOverWidthBonusGame = 9,

    // 启用快速模式
    EnableTurbo = 10,

    // 禁用快速模式
    DisableTurbo =  11,

    // 空白
    Blank = 12,

    /**
     * 再次触发了免费游戏
     */
    // RollingOverWithFreeGameAgain = 13,

    // 免费游戏次数
    // FreeGameTimes,

} 

 /**
 * 游戏的提示管理器（主界面底部信息栏处的提示)
 */
class TipsManager implements SimpleManagerTemplate 
{
    constructor() 
    {
        
    }

   

    // 原来的提示状态
    private _oldTipState:TipState;

    /**
     * 单例
     */
    public static get instance():TipsManager
    {
        if(!this._instance) this._instance = new TipsManager();
        return this._instance;
    }
    private static _instance:TipsManager = null;

    /**
     * 初始化接口
     */
    init()
    {
    }

    /**
     * 释放
     */
    dispose()
    {
    }
    


    

}