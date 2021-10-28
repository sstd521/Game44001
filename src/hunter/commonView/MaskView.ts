/**
 * MaskView
 */
import UIWindow from '../utils/UIWindow';
import Utils from '../utils/Utils';
import FUIMaskView from '../fui/commonUI/FUIMaskView';
export default class MaskView extends UIWindow<FUIMaskView> {
    constructor() {
        super();
        this._views = [];
        this.ignoreCloseOther = true;
    }

    private _views: UIWindow<fairygui.GComponent>[] = [];
    private _clickEvents: {}[] = [];

    onInit() {
        super.onInit();
        this.bringToFontOnClick = false;
        this.layout();
        super.onClick(this, this._onClick);
    }

    dispose() {
        super.offClick(this, this._onClick);
        this._clickEvents = [];
        super.dispose();
    }

    public onShown() {

    }

    /**
     * 激活
     */
    public enable(layer: fairygui.GComponent, ui: UIWindow<fairygui.GComponent>) {
        if (!ui.needMask) return;

        this.sortingOrder = ui.sortingOrder;
        this._views.push(ui);
        layer.addChild(this);
    }

    public disable(layer: fairygui.GComponent, ui: UIWindow<fairygui.GComponent>) {
        if (!ui.needMask) return;

        // 检查该UI是否在列表中
        let index: number = this._views.length - 1;
        if (ui === this._views[index] || (index = this._views.indexOf(ui)) >= 0) {
            Utils.removeAtFromArray(this._views, index);
            this._recover();
        }

    }

    public onClick(thisObj: any, listener: Function, args?: Array<any>) {
        // super.onClick(thisObj, listener, args);
        this._clickEvents.push({ thisObj: thisObj, listener: listener, args: args });
    }

    public offClick(thisObj: any, listener: Function) {
        let index: number = Utils.findIndexFromArray(this._clickEvents, (e, idx, arr) => {
            return e["thisObj"] === thisObj && e["listener"] === listener;
        });
        if (index >= 0) {
            // console.log("find off click target");
            Utils.removeAtFromArray(this._clickEvents, index);
        }
    }

    layout() {
        let maskGroup: riggerLayout.Group = new riggerLayout.Group(this.contentPane);
        maskGroup.width = '100%';
        maskGroup.height = '100%';
        maskGroup.horizontalCenter = 0;
        maskGroup.verticalCenter = 0;
        RiggerLayout.layer.addChild(maskGroup);
    }

    removeLayout() {
        RiggerLayout.layer.remove(this.contentPane);
    }

    

    private _recover() {
        let len: number = this._views.length;
        if (len <= 0) return this.hide();

        let ui: UIWindow<fairygui.GComponent> = this._views[len - 1];
        if (!ui.parent) {
            Utils.removeFromArray(this._views, ui);
            return this._recover();
        }

        this.sortingOrder = ui.sortingOrder;
        let root: fairygui.GComponent = <fairygui.GComponent>ui.parent;
        root.addChild(this);
        this.parent.setChildIndex(this, ui.parent.getChildIndex(ui));

    }

    private _onClick() {
        // console.log("clicked");
        // 获取需要响应点击事件的对象
        if (!this.parent) return;
        let selfIndex: number = this.parent.getChildIndex(this);
        if (selfIndex < 0) return;
        // 获取其上一层的对象，遮罩层上一层的对象就是要响应点击的对象
        let obj = this.parent.getChildAt(selfIndex + 1);
        if (!obj) return;
        // 检查此对象是否注册了点击事件
        let startIndex = 0,
            eventIndex: number = Utils.findIndexFromArray(this._clickEvents, (e, idx, arr) => {
                return e["thisObj"] === obj;
            }, startIndex),
            eventObj: {},
            caller: any,
            listener: Function,
            args: Array<any>;

        while (startIndex < this._clickEvents.length && eventIndex >= 0) {
            eventObj = this._clickEvents[eventIndex];
            caller = eventObj["thisObj"];
            listener = eventObj["listener"];
            args = eventObj["args"];
            if (caller && listener) {
                // console.log("apply mask click handler");

                listener.apply(caller, args);
            }

            // 查找下一个
            startIndex = eventIndex + 1;
            eventIndex = Utils.findIndexFromArray(this._clickEvents, (e, idx, arr) => {
                return e["thisObj"] === obj;
            }, startIndex);

        }
    }
}