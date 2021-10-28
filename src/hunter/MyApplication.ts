export default class MyApplication extends rigger.BaseApplication {
    constructor() {
        super();
    }

    /**
     * 应用的单例
     */
    public static get instance(): MyApplication {
        if (!MyApplication.mInstance) MyApplication.mInstance = new MyApplication();
        return MyApplication.mInstance;
    }
    protected static mInstance: MyApplication;

    public static initlized: boolean = false;


    /**
     * 设置游戏帧率
     */
    public set frameRate(rate: "slow" | "fast" | "mouse") {
        Laya.stage.frameRate = rate;
    }

    public get frameRate(): "slow" | "fast" | "mouse" {
        return <"slow" | "fast" | "mouse">Laya.stage.frameRate;
    }

    /**
    * 游戏背景颜色
    */
    public set backgroundColor(color: string) {
        Laya.stage.bgColor = color;
    }


    // public set scaleMode(mode:"noscale" | "exactfit" | "showall" | "noborder" | "full" | "fixedwidth" | "fixedheight")
    /**
     * 设置游戏的缩放模式
     */
    public set scaleMode(mode: string) {
        Laya.stage.scaleMode = mode;
    }

    /**
     * 游戏的设计宽度
     */
    public get designWidth(): number {
        return Laya.stage.designWidth;
    }

    /**
     * 游戏的设计高度
     */
    public get designHeight(): number {
        return Laya.stage.designHeight;
    }

    /**
     * 游戏的实际宽度
     */
    public get width(): number {
        return Laya.Browser.width;
    }

    /**
     * 游戏的实际高度
     */
    public get height(): number {
        return Laya.Browser.height;
    }

    public defaultVolumn = 0.5;

    public set nowGameState(state: GameState) {
        this.mNowGameState = state;
    }
    public get nowGameState(): GameState {
        return this.mNowGameState;
    }
    private mNowGameState: GameState = GameState.None;

    /**
     * 游戏内加载界面类
     */
    public get inGameLoadingCls(): any {
        return this._inGameLoadingViewCls;
    }
    private _inGameLoadingViewCls: any;

    /**
     * 游戏内加载界面参数
     */
    public get inGameLoadingArgs(): any {
        return this._inGameLoadingArgs;
    }
    private _inGameLoadingArgs: any;
    public registerInGameLoadingView(cls: any, args?: any) {
        this._inGameLoadingViewCls = cls;
        this._inGameLoadingArgs = args;
    }

    onAllServicesReady(resultHandler: rigger.RiggerHandler): void {
        console.log(`app start ok`);
        resultHandler.success();
    }

    // private applyConfig(){
    //     let cfg:rigger.config.MyApplicationConfig = this.getConfig<rigger.config.MyApplicationConfig>();

    // }

    //==============
}

/*
* 应用
*/
export enum GameState {
    None = 0,
    ConnectingGameServer = 1,
    ConnectedGameServer = 2,
    LoginedGameServer = 3,
    EnteredGame = 4,
    Closed = 5,    // 游戏连接意外关闭了
    // ReconnectingGameServer = 12, // 重连中
}