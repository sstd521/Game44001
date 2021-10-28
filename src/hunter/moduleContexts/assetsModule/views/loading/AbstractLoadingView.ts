/**
 * 加载界面的抽象类，子游戏的加载界面如果没有特殊需求，应该继承本抽象类
 * 进度有效范围:0 - 100
 */
import UIWindow from '../../../../utils/UIWindow';
import ILoadingView from './ILoadingView';
export default abstract class AbstractLoadingView<T extends fairygui.GComponent> extends UIWindow<T> implements ILoadingView {


    constructor() {
        super();
        if (!this._selfCompleteHandler) this._selfCompleteHandler = Laya.Handler.create(this, this._onComplete, null, false);
    }

    onInit() {
        // this.isCache = false;
        this.progress = 0;
        this._realProgress = 0;

    }

    onShown() {
        super.onShown();
        Laya.stage.on(Laya.Event.FOCUS, this, this._onFocus);

        // Laya.timer.loop(this._tweenInterval, this, this._onLoop);
    }

    onHide() {
        Laya.stage.off(Laya.Event.FOCUS, this, this._onFocus);

        super.onHide();

        // Laya.timer.clear(this, this._onLoop);
    }

    private _tweenInterval: number = 500;


    // private _onLoop(){
    //     this._onFocus();
    // }

    /**
     * 进度完成（包括动画/动效播放）时的外部回调
     */
    private _outCompleteHandler: Laya.Handler = null;

    /**
     * 回调完成(内部)
     */
    private _selfCompleteHandler: Laya.Handler = null;

    /**
     * 获取进度值,通过重写本接口实现进度值的真实更新
     */
    protected abstract get progress(): number;

    /**
     * 获取进度值,通过重写本接口实现进度值的真实更新
     */
    protected abstract set progress(v: number);

    private _realProgress: number = 0;
    private _tween: Laya.Tween;
    /**
     * 设置进度 
     */
    setProgress(progress: number) {
        this._realProgress = progress;
        // if(progress >= 100){
        //     this.progress = 100;
        //     this._onComplete();
        //     // Laya.timer.callLater(this, this._onComplete);
        //     return;
        // }
        if (this._tween) this._tween.recover();
        this._tween = Laya.Tween.to(this, { progress: progress }, this._tweenInterval, Laya.Ease.linearNone, this._selfCompleteHandler);
        // if(!this._tween) return this._tween = Laya.Tween.to(this, {progress:progress}, this._tweenInterval, Laya.Ease.linearNone, this._selfCompleteHandler);
        // this._tween.to(this, {progress:progress}, this._tweenInterval, Laya.Ease.linearNone, this._selfCompleteHandler);
        // this.progress = progress;
    }

    /**
     * 注册当加载完成时的回调句柄
     * @param thisObj 
     * @param func 
     * @param args 
     */
    public onComplete(thisObj: any, func: Function, args?: any[]) {
        this._outCompleteHandler && this._outCompleteHandler.recover();
        this._outCompleteHandler = Laya.Handler.create(thisObj, func, args);
    }

    /**
     * 获取进度
     */
    getProgress(): number {
        return this.progress;
    }

    dispose() {
        if (this._outCompleteHandler) {
            this._outCompleteHandler.recover();
            this._outCompleteHandler = null;
        }
        // Laya.stage.off(Laya.Event.FOCUS, this, this._onFocus);
    }

    private _onFocus() {
        this.setProgress(this._realProgress);
    }

    private _onComplete() {
        if (this.progress >= 100) this._outCompleteHandler && this._outCompleteHandler.run();
    }

}