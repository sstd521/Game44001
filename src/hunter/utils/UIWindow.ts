import UIManager, { UIParams } from "../manager/UIManager";
import AbstractLoadingView from "../moduleContexts/assetsModule/views/loading/AbstractLoadingView";
import DynamicSource from "../definitions/DynamicSource";
import { ScreenMode } from "../definitions/ScreenMode";
import MyApplication from "../MyApplication";

export enum uiFlag {
    /** 没有动效 */
    normal,
    /** 普通窗口，弹窗 */
    ordinary,
    /** 旋转动效，背景 */
    rotate
}

/**
 * UIWindow 当屏幕尺寸发生变化时需要应用的适配模式
 */
export enum FitScreenMode {
    None = 0,   // 不处理
    FullScreen = 1, // 全屏处理，即将该窗口的UI设置为fairy.Groot.inst的宽高，一般用于背景或需要全屏定位的UI
    Center = 2, // 重置到屏幕中间
}

/**
 * 用户自定义窗口类和fairyGUI窗口类的一个中间层
 * 当用UIManager.showWindow()显示窗口时，不需要再在onInit回调中设置contentPane;
 */
export default class UIWindow<T extends fairygui.GComponent> extends fairygui.Window implements riggerIOC.View{
    isCache: boolean = true;
    uiParams: UIParams;
    uiFlag: uiFlag;

    /**
     * 是否需要遮罩层
     */
    needMask: boolean = false;

    /**
     * 是否忽略“关闭其它窗口”，为真时，则如果显示窗口时设置了关闭其它窗口，则对本窗口不起作用
     */
    ignoreCloseOther: boolean = false;

    /**
     * 获取界面资源的地址
     */
    public static getUrl():string{
        throw new Error("you must rewrite getUrl");
    }

    /**
     * 当屏幕尺寸发生变化时，窗口需要应用的适配模式
     */
    // protected fitScreenMode:FitScreenMode = FitScreenMode.Center;

    /**
     * 窗口弹出时是，键盘是否可用
     */
    protected isKeyboardAvailable:boolean = true;
    

    // contentView:T;
    /**
     * 重写contentPane属性
     */
    contentPane: T;

    constructor() {
        super();
        Laya.stage.on(Laya.Event.RESIZE, this, this._onResize);
        this._sourceNum = this._totalSourceNum = 0;

        // 配置动态资源
        this.configUISource && this.configUISource();
        // 显示资源加载界面
        this._showLoadingView();
    }

    /**
     * 析构函数
     */
    dispose() {
        Laya.stage.off(Laya.Event.RESIZE, this, this.onResize)
        
        this.removeLayout();
        // com.yigewaixingren.utils.LayoutSprite.instance.off(Layout.event.LAYOUT_RESIZE_AGO, this, this.beforeLayout);
        // com.yigewaixingren.utils.LayoutSprite.instance.off(Layout.event.LAYOUT_RESIZE_END, this, this.afterLayout);

        super.dispose();
        
    }
    
    /**
     * 给外部代码提供注入onInit回调代码的方法，当调用此函数后，界面会先调用外部注入的代码，再调用本界面自己的onInit
     */
    public injectOnInit(fun: (T) => void, ex:any): void {
        let old: () => void = this.onInit;
        this.onInit = () => {

            // 先执行外部注入的函数
            fun.apply(this, null);
            // 再执行原来的函数
            old.apply(this, null);
            // 初始化音效
            this.initSound();
            // 执行layout
            this.layout();
            // com.yigewaixingren.utils.LayoutSprite.instance.on(Layout.event.LAYOUT_RESIZE_AGO, this, this.beforeLayout);
            // com.yigewaixingren.utils.LayoutSprite.instance.on(Layout.event.LAYOUT_RESIZE_END, this, this.afterLayout);
            // com.yigewaixingren.utils.LayoutSprite.instance.resize();
            // 还原
            this.onInit = old;
            this.funEx(ex);    
            fun = null;        
        };
    }

    public injectOnShown(fun:() => void){
        let old = this.onShown;
        this.onShown = () =>{
            fun.apply(this, null);
            old.apply(this, null);
            fun = null;
            this.onShown = old;
            old = null;
        }
    }

    /**
    * 给外部代码提供注入onHide回调代码的方法，当调用此函数后，界面会先调用外部注入的代码，再调用本函数自己的onHide
    */
    public injectOnHide(fun: () => void): void {
        let old = this.onHide;
        this.onHide = () => {
            old.apply(this, null);            
            fun.apply(this, null);
            fun = null;            
            this.onHide = old;
            old = null;
        }
    }

    /**
     * 添加需要动态加载的资源
     */
    public addUISource(source:DynamicSource)
    {
        // 
        if(!source) return;
        if(source.loaded) return;
        source.onLoaded(this, this._onSingleSourceLoaded, [source.packageName]);

        // 更新需加载资源数量
        if(!this._packageSourceNumMap) this._packageSourceNumMap = {};
        let oldNum:number = this._packageSourceNumMap[source.packageName] | 0;
        this._packageSourceNumMap[source.packageName] = oldNum + 1;
        ++this._sourceNum;
        ++this._totalSourceNum;

        super.addUISource(source);
    }

    public showOn(parent:fairygui.GComponent)
    {
        parent.addChild(this);
        this.parent = parent;
        // this.onShown();
    }

    public hide()
    {
        if(this.isShowing) this.doHideAnimation();
    }

    public hideImmediately()
    {
        super.hideImmediately();
        if(this.parent instanceof fairygui.GRoot) return;
        this.removeFromParent();
    }

    /**
     * 配置界面需要动态加载的资源
     * 如果没有可不实现此函数
     */
    protected configUISource?():void;


    /**
     * 
     */
    funEx(p: any): void {
    }

    public onInit() {
    }

    /**
     * 当屏幕尺寸发生变化时的回调
     */
    protected onResize(changedScreenMode: ScreenMode) {
    }

    // private _oldIsKeyBoardAvailable:boolean;
    /**
     * 显示时的回调
     */
    public onShown()
    {
        // console.log("onshown");
        // this._oldIsKeyBoardAvailable = SpinManager.instance.spaceKeyAvailable;
        // SpinManager.instance.spaceKeyAvailable = this.isKeyboardAvailable;
        if(!this.isKeyboardAvailable) ++UIManager.instance.shadowKeyBoardWindowNum;

        super.onShown();
        
    }

    /**
     * 窗口隐藏时的回调
     */
    public onHide()
    {
        if(!this.isKeyboardAvailable) --UIManager.instance.shadowKeyBoardWindowNum;
        // if(!Common.Utils.isNullOrUndefined(this._oldIsKeyBoardAvailable)) SpinManager.instance.spaceKeyAvailable = this._oldIsKeyBoardAvailable;
        super.onHide();
    }

    /**
     * 布局之前
     */
    protected beforeLayout(): void {
        // console.log("before layout");
        
        // Layout.windowsWidth;
        // Layout.windowsHeight;
    }
    
    /**
     * 布局之后
     */
    protected afterLayout(): void {
        // Layout.windowsWidth;
        // Layout.windowsHeight;
    }

    /**
     * 布局
     */
    protected layout() {
    }

    /**
     * 移除布局
     */
    protected removeLayout()
    {

    }

    /**
     * 初始化音效
     */
    protected initSound() {

    }

    private _onResize() {
        // let now:ScreenMode = Utils.getScreenMode(Laya.Browser.wi)
        this.onResize(UIManager.instance.changedScreenMode);
    }

    /**
     * 需要动态加载的资源数量
     */
    private _sourceNum:number = 0;

    /**
     * 各包资源数量映射
     */
    private _packageSourceNumMap:{};
    

    private _totalSourceNum:number = 0;


    /**
     * 单个资源加载完成了
     */
    private _onSingleSourceLoaded(packageName):void
    {
        // 更新包对应的资源数量        
        --this._sourceNum;
        let newNum;
        packageName && (newNum = --this._packageSourceNumMap[packageName]);
        if(packageName && newNum <= 0)
        {
            // 当前包所有资源加载完了，再重新添加次包，避免无法加载界面的问题
            rigger.service.AssetsPackageService.instance.initPackage(packageName);
        }

        if(this._sourceNum <= 0){
            this._packageSourceNumMap = null;
        }

        // 更新进度条显示
        this._updateLoadingProgress();
        
    }

    /**
     * 加载界面
     */
    public static _loadingView:AbstractLoadingView<fairygui.GComponent> = null;

    /**
     * 显示资源加载界面
     */
    private _showLoadingView(){
        if(this._sourceNum <= 0) return;
        if(UIWindow._loadingView) return;
        if(!MyApplication.instance.inGameLoadingCls) return;
        // 获取注册的资源加载界面信息
        UIWindow._loadingView = <AbstractLoadingView<fairygui.GComponent>>UIManager.instance.showWindow(MyApplication.instance.inGameLoadingCls, false, UIManager.instance.tipsLayer, MyApplication.instance.inGameLoadingArgs);

        UIWindow._loadingView.onComplete(this, this._hideLoadingView);
    }

    /**
     * 隐藏加载界面
     */
    private _hideLoadingView(){
        if(!UIWindow._loadingView) return;
        UIManager.instance.hideWindow(UIWindow._loadingView);
        UIWindow._loadingView = null;
    }

    private _updateLoadingProgress(){
        if(!UIWindow._loadingView) return;
        UIWindow._loadingView.setProgress((this._totalSourceNum - this._sourceNum) / this._totalSourceNum * 100);
    }
}
