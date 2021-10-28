/** CloseParams*/
export class CloseParams {
    /**原界面UI的类名 */
    public OriginalPanel: any;
    /**原界面的层级 */
    public OriginalLayer: Laya.Node;
    /**打开原界面时是否使用CloseOther */
    public OriginalCloseOther: boolean;
    /**原界面的底部Tab索引 */
    public OriginalTab: number;
    /**原界面的FunEx参数 */
    public OriginalPanelFunEx: any;
    /**返回原界面时的额外处理 */
    public ReturnCallBack: Function;

    public CallBackTrigger(view: any) {
        if (this.ReturnCallBack == null) return;
        this.ReturnCallBack.apply(this.OriginalLayer, view);
    }


    /**
     * @param cls 原界面UI的类名
     * @param layer 原界面的层级
     * @param closeOther 是否关闭其他界面
     * @param mainViewTab 原界面在主界面下方的索引， 比如商城界面是在 主城Tab
     * @param funEx funEx参
     * @param returnCallBack 返回原界面后的CallBack
     */
    constructor(cls: any, layer: Laya.Node, closeOther?: boolean, mainViewTab?: number, funEx?: any, returnCallBack?: Function) {
        this.OriginalPanel = cls;
        this.OriginalLayer = layer;
        this.OriginalCloseOther = closeOther;
        this.OriginalTab = mainViewTab;
        this.OriginalPanelFunEx = funEx;
        this.ReturnCallBack = returnCallBack;
    }
}

/** UIParams*/
export class UIParams {
    /** UI的类名*/
    public className: any;
    /** ui的标签，如果有标签，则会使用回收池机制*/
    public isCache: boolean;
    /** 显示时是否要关闭同layer的其它ui*/
    public closeOther: boolean;
    /** UI所在layer*/
    public layer: Laya.Node;
    /** ui深度，如果未确定,则默认显示在最高层*/
    public depth: number;
    /** 功能参数（决定打开面板后，如何显示)*/
    public funEx: any;
    /** 关闭参数，UI关闭时需要执行的参数*/
    public closeParams: CloseParams;
    /** 此界面是否附着着炫光特效*/
    public attachingRewardEffect: boolean;

    constructor() {

    }
}

export class CommonButtonID {
    public static MAIN_MENU_BTN: string = "mainMenuBtn";
    public static HOME_BTN: string = "homeBtn";
    public static INFO_BTN: string = "infoBtn";
    public static HELP_BTN: string = "helpBtn";
    public static VOICE_BTN: string = "voiceBtn";
    public static TURBO_BTN: string = "turboBtn";
    public static GAME_RECORD_BTN: string = "gameRecordBtn";
    public static SETTING_BTN: string = "settingBtn";
    public static START_BTN: string = "startBtn";
    public static AUTO_GAME_BTN: string = "autoGameSettingBtn";
}

/**
* UIManager UI管理类，用于管理界面的显示，回收等
* 
* 
*/
import UIWindow from '../utils/UIWindow';
import AssetsUtils from '../utils/AssetsUtils';
import Utils from '../utils/Utils';
import MaskView from '../commonView/MaskView';
import AbstractLoadingView from '../moduleContexts/assetsModule/views/loading/AbstractLoadingView';
import IDisconnectedView from '../moduleContexts/loginModule/views/IDisconnectedView';
import GmView from '../commonView/gmCmdView/GmView';
import FUIGmView from '../fui/gmCmd/FUIGmView';
import FUIMaskView from '../fui/commonUI/FUIMaskView';
import { ScreenMode } from '../definitions/ScreenMode';
import DisconnectedView from '../moduleContexts/loginModule/views/DisconnectedView';
export default class UIManager {
    /**
     * 获取UIManager的唯一实例
     */
    public static get instance(): UIManager {
        if (!this._instance) {
            this._instance = new UIManager();
        }
        return this._instance;
    }
    private static _instance: UIManager;
    // private tipsView:TipsView;

    /**
     * 场景层位于最底层
     */
    public get sceneLayer(): fairygui.GComponent {
        return this._sceneLayer;
    }

    /*
    *获取普通UI显示层
    */
    public get uiLayer(): fairygui.GComponent {
        return this._uiLayer;
    }

    /**
     * 弹出层
     */
    public get popupLayer(): fairygui.GComponent {
        return this._popupLayer;
    }

    /**
     * 获取提示显示层(显示在最上层)
     */
    public get tipsLayer(): fairygui.GComponent {
        return this._tipsLayer;
    }

    /**
     * 黑色遮罩界面
     */
    public get maskView(): MaskView {
        if (!this._maskView) this._initMaskView();
        return this._maskView;
    }
    private _maskView: MaskView = null;

    /**
     * 变化后的屏幕模式，如果和上次的一样，则认为未发生变化，此时值为ScreenMode.None
     */
    public get changedScreenMode() {
        return this._changedScreenMode;
    }
    private _changedScreenMode: ScreenMode;
    /**
     * ui的URL到资源路径的映射
     */
    private _uiURLToRes: {} = {};

    public get shadowKeyBoardWindowNum(): number {
        return this._shadowKeyBoardWindowNum;
    }
    public set shadowKeyBoardWindowNum(v: number) {
        this._shadowKeyBoardWindowNum = Math.max(0, v);
    }
    private _shadowKeyBoardWindowNum: number = 0;

    @riggerIOC.inject(riggerIOC.MediationBinder)
    private mediationBinder: riggerIOC.MediationBinder;

    /**
     * 显示窗口，用此函数显示的界面必须继承UIWindow 
     * 调用此函数前请确保界面所在包已经初始化完成或界面支持动态加载(详情请参加fairygui手册)
     * 使用此函数显示窗口时，不需要再在onInit函数中设置contentPane属性
     * path:packageName/resName 或 ui://xxxx
     */
    public showWindow<T extends fairygui.GComponent>(cls: any = null, closeOther: boolean = true,
        layer: fairygui.GComponent = this.uiLayer, funEx?: any, closeParams?: CloseParams): UIWindow<T> {
        let bindInfo: riggerIOC.InjectionBindInfo = riggerIOC.InjectionBinder.instance.bind(cls);
        let rawPath: string = bindInfo.realClass.getUrl();
        if (!rawPath) throw new Error("invalid ui url");
        let path = this.getCachedUIPath(rawPath)
        // let ui:UIWindow<T> = Laya.Pool.getItemByClass(path, cls);
        let ui: UIWindow<T> = Laya.Pool.getItem(path);
        if (!ui) ui = bindInfo.getInstance<UIWindow<T>>();
        // 获取对应的Mediator
        let mediator: riggerIOC.Mediator = this.mediationBinder.createAndAttach(cls, ui);

        if (closeOther) {
            this._hideOtherWindow(layer);
        }

        // 将设置UI.contentPane的代码注入到UI的onInit回调中
        if (!ui.contentPane) {
            ui.injectOnInit(
                () => {
                    // UI.contentPane = <T>fairygui.UIPackage.createObject(packageName, uiName).asCom;
                    // fairygui.UIPackage
                    let needCache: boolean = false;
                    if (fairygui.utils.ToolSet.startsWith(rawPath, "ui://", false)) {
                        needCache = true;
                        ui.contentPane = <T>fairygui.UIPackage.createObjectFromURL(rawPath).asCom;
                    }
                    else {
                        let packageName: string = AssetsUtils.getUIPackageName(rawPath);
                        let uiName: string = AssetsUtils.getUIName(rawPath);
                        let obj = <T>fairygui.UIPackage.createObject(packageName, uiName);

                        ui.contentPane = <T>fairygui.UIPackage.createObject(packageName, uiName).asCom;
                    }

                    // console.log("name:" + UI.contentPane.packageItem.name);
                    ui.name = ui.contentPane.packageItem.owner.name + "/" + ui.contentPane.packageItem.name;
                    if (!path && needCache) {
                        this._uiURLToRes[rawPath] = ui.name;
                    }

                    mediator && mediator.onInit();

                }, funEx);

        }
        else {
            ui.funEx(funEx);
        }
        // ui.sortingOrder = layer;

        ui.injectOnShown(() => {
            mediator && mediator.onShown();
            mediator = null;

        })

        // 处理遮罩层
        this._showMaskView(layer, ui);

        // 显示
        ui.showOn(layer);
        // 居中
        // ui.center();

        return ui;
    }

    /**
     * 异步显示窗口, 使用此接口显示窗口时，不要求已经初始化完包
     * @param rawPath 
     * @param cls 
     * @param closeOther 
     * @param layer 
     * @param funEx 
     * @param closeParams 
     */
    public showWindowAsyn<T extends fairygui.GComponent>(packageName: string, rawPath: string, cls: any = null, closeOther: boolean = true,
        layer: fairygui.GComponent = this.uiLayer, funEx?: any, closeParams?: CloseParams): void {
        if (rigger.service.AssetsPackageService.instance.loadPackage(packageName, new rigger.RiggerHandler(this, this._onWindowReady, [rawPath, cls, closeOther, layer, funEx, closeParams]))) {
            this._onWindowReady(cls, closeOther, layer, funEx, closeParams);
        }
    }

    private _onWindowReady(cls: any = null, closeOther: boolean = true,
        layer: fairygui.GComponent = this.uiLayer, funEx?: any, closeParams?: CloseParams) {
        this.showWindow(cls, closeOther, layer, funEx, closeParams);
    }

    public showReconnectView() {
        console.log("网络中断,请重新连接....");
        this.showWindow(DisconnectedView, false, this.popupLayer);
        //  if (!UIManager.instance.getWindowByName(Common.FUICommonTipsView.URL, UIManager.instance.tipsLayer))  {
        //         UIManager.instance.showCommonTipsView($language(102028), Laya.Handler.create(this, function (): void {
        //             UIManager.instance.hideWindowByName(Common.FUICommonTipsView.URL, UIManager.instance.tipsLayer);
        //             // window.location.href = window.location.href;
        //             Common.Utils.returnToLobby();
        //         }));
        //     }
    }



    public showGMView() {
        if (this.getWindowByName(FUIGmView.URL, this._tipsLayer)) return;
        this.showWindow(GmView, false, this._tipsLayer);
    }

    /**
     * 显示加载界面
     */
    public showLoadingView() {
        // if(Application.instance.loadingModule)
        // {
        //     return this._showSpecialLoadingView();            
        // }
        // else
        // {
        //     this._showCommonLoadingView();            
        // }

        this._showCommonLoadingView();

    }

    // public showJPBalancePushView(push:protocol.JpBalancePush){
    //     UIManager.instance.showWindow(Common.FUIJPBalancePushView.URL, Common.JPBalancePushView, false, this._tipsLayer, push);
    // }

    /**
     * 显示子游戏自己的加载界面
     */
    // private _showSpecialLoadingView()
    // {
    //     let url:string = Application.instance.loadingModule.FUILoadingView.URL;
    //     let cls:any = Application.instance.loadingModule.LoadingView;
    //     this.showWindow(url, cls);
    // }

    /**
     * 显示公共的加载界面
     */
    private _showCommonLoadingView() {
        this.showWindow(AbstractLoadingView, true, UIManager.instance.sceneLayer);
    }

    /**
     * 隐藏加载界面
     */
    public hideLoadingView() {
        // let ui:FootballLoadingView = UIManager.instance.getWindowByName<FootballLoadingView>(Pro29Loading.FUILoadingView.URL);
        this.hideWindowByName(AssetsUtils.makeLoadingViewUrl());
    }


    /**
     * 扩展某UI项
     */
    public extendItem(url: string, cls: any) {
        fairygui.UIObjectFactory.setPackageItemExtension(url, cls);
    }

    /**
     * 从缓存池中获取UI界面，如果浮存池没有，则新建
     */
    public getItemFromPool(packageName: string, cls: any) {
        // 载入包
        if (!packageName) {
            return;
        }


        // 扩展自定义类
    }


    // private _pooledMap:{};

    /**
     * 清除所有面板
     */
    public static dispose() {
        if (!UIManager._instance) {
            return;
        }
        UIManager._doDispose();

    }

    /**
     * 获取缓存的UI路径
     */
    public getCachedUIPath(url: string): string {
        if (fairygui.utils.ToolSet.startsWith(url, "ui://", false)) {
            return this._uiURLToRes[url];
        }

        return url;
    }



    private static _doDispose() {
        // UITweenManager.dispose();
        // Laya.Pool
        UIManager._instance = null;
    }

    /**
     * 关闭指定名称的窗口
     */
    public hideWindowByName(name: string, layer: fairygui.GComponent = this.uiLayer) {
        let realName: string = this.getCachedUIPath(name);
        var panel: UIWindow<fairygui.GComponent> = this.getWindowByName(realName, layer);
        if (!panel) return;
        this.hideWindow(panel);
    }

    // 隐藏窗口
    public hideWindow(window: UIWindow<fairygui.GComponent>) {

        // 需要回收到缓存池
        // 在onHide中注入回收逻辑
        let root: fairygui.GComponent = <fairygui.GComponent>window.parent;
        window.injectOnHide(() => {
            // 获取对应的Mediator
            let mediator: riggerIOC.Mediator = this.mediationBinder.getAttachedMediatorInstance(window);
            mediator && mediator.onHide();
            // 从父显示列表中移除
            if (window.name) {
                window.removeFromParent();
                if (window.isCache) {
                    Laya.Pool.recover(window.name, window);
                }
                else {
                    mediator && mediator.dispose();
                    window.dispose();
                }

                this._hideMaskView(root, window);
            }
            mediator = null;
            window = null;

        });

        window.hide();
    }

    /**
     * 根据窗口名获取窗口，传layer为非NULL值，则只返回相应层级的layer;
     */
    public getWindowByName<T extends UIWindow<fairygui.GComponent>>(name: string, layer: fairygui.GComponent = this.uiLayer) {
        if (!layer) return null;

        let realName: string = this.getCachedUIPath(name);
        return <T>layer.getChild(realName);
    }


    /**
     * 关闭除指定面板外的其它面板(同一layer);
     */
    private _hideOtherWindow(layer: fairygui.GComponent, exception?: string) {
        let child: UIWindow<fairygui.GComponent>;
        // let root = layer;
        let i = layer.numChildren - 1;
        let ignoredNum: number = 0;
        for (; i >= 0;) {
            // console.log(`root children num:${root.numChildren}`);

            child = <UIWindow<fairygui.GComponent>>layer.getChildAt(i);
            if (!(child instanceof UIWindow)) continue;

            if ((!exception || exception != child.name) && child.parent === layer && !child.ignoreCloseOther) {
                this.hideWindow(child);
            }
            child.ignoreCloseOther && ++ignoredNum;
            i = layer.numChildren - ignoredNum - 1;

        }
    }


    /**
     * 初始化遮罩界面
     */
    private _initMaskView() {
        this._maskView = new MaskView();
        this._maskView.contentPane = <FUIMaskView>(fairygui.UIPackage.createObjectFromURL(FUIMaskView.URL).asCom);
    }

    private _showMaskView(layer: fairygui.GComponent, ui: UIWindow<fairygui.GComponent>) {
        if (!ui.needMask) return;
        this.maskView.enable(layer, ui);
    }

    private _hideMaskView(layer: fairygui.GComponent, ui: UIWindow<fairygui.GComponent>) {
        if (!ui.needMask) return;
        this.maskView.disable(layer, ui);
    }

    constructor() {
        this._initLayers();
        this._shadowKeyBoardWindowNum = 0;
        Laya.stage.on(Laya.Event.RESIZE, this, this._onResize);
        // fairygui.GRoot.inst.setSize(Laya.stage.width, Laya.stage.height);
        this._onResize();
    }

    private _initLayers() {
        this._sceneLayer = new fairygui.GComponent();
        this._sceneLayer.name = "sceneLayer";
        fairygui.GRoot.inst.addChild(this._sceneLayer);

        this._uiLayer = new fairygui.GComponent();
        this._uiLayer.name = "uiLayer";
        fairygui.GRoot.inst.addChild(this._uiLayer);

        this._popupLayer = new fairygui.GComponent();
        this._popupLayer.name = "popupLayer";
        fairygui.GRoot.inst.addChild(this._popupLayer);

        this._tipsLayer = new fairygui.GComponent();
        this._tipsLayer.name = "tipsLayer";
        fairygui.GRoot.inst.addChild(this._tipsLayer);
    }

    /**
     * 上次的屏幕模式
     */
    private _lastScreenMode: ScreenMode = ScreenMode.None;
    private _onResize() {
        let nowScreenMode: ScreenMode = Utils.getScreenMode();

        if (nowScreenMode !== this._lastScreenMode) {
            this._changedScreenMode = nowScreenMode;
            // PlayerManager.instance.sendUserScreenModeSetting();
        }
        else {
            this._changedScreenMode = ScreenMode.None
        }

        this._lastScreenMode = nowScreenMode;
    }

    /**
     * 游戏界面层
     */
    private _uiLayer: fairygui.GComponent = null;

    /**
     * 主界面层
     */
    //  private _mainViewLayer:fairygui.GRoot = null;

    /**
     * 弹出层
     */
    private _popupLayer: fairygui.GComponent = null;

    /**
     * 提示层
     */
    private _tipsLayer: fairygui.GComponent = null;

    /**
     * 场景层
     */
    private _sceneLayer: fairygui.GComponent = null;


}