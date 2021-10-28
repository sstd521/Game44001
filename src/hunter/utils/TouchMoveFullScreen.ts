import Utils from './Utils';
import UIManager from '../manager/UIManager';
import { ScreenMode } from '../definitions/ScreenMode';
export default class TouchMoveFullScreen {
    static _inst: TouchMoveFullScreen;
    static instance(): TouchMoveFullScreen {
        if (this._inst == null) {
            this._inst = new TouchMoveFullScreen();
        }
        return this._inst;
    }

    private _maskDiv: HTMLDivElement;
    private _layaContainer: HTMLDivElement;
    private _layaCanvas: HTMLCanvasElement;

    static IS_SHOW_MASK_DIV: boolean = true;

    private _portraitConentHeigth: number = -1;
    private _horizontalConentHeigth: number = -1;
    private _isFull: boolean = false;
    private _touchStatus: boolean = false;
    private _isFocus: number = -1;
    private _isblur: number = -1;


    private constructor() {
        /**
         * 图片预加载
         */
        // if(document.images)
        // {
        //     let img1 = new Image();
        //     img1.src = "res/arrow.png";
        // }
        // Laya.loader.load("arrow.png", Laya.Handler.create(this, this._oninit));
    }

    /**
     * 置顶加载界面
     */
    // public topLoadingView()
    // {
    //     Laya.timer.frameLoop(1, this, this._makeTop);   
    // }

    // private _makeTop()
    // {
    //     // document.body.scrollTop = document.documentElement.scrollTop = 0;   
    //     // window.scrollTo(0, 0);
    //     document.getElementById("layaContainer").scrollTop = 0;       
    // }

    /**
     * 全屏遮罩
     */
    public alreadyInGame() {
        // Laya.timer.clear(this, this._makeTop);
        if (!Laya.Browser.onMobile) return;
        Laya.loader.load("arrow.png", Laya.Handler.create(this, this._oninit));
    }

    private _oninit() {
        let userAgent: string = navigator.userAgent.toLowerCase();
        let onFirefox: boolean = userAgent.indexOf("firefox") != -1;
        let onHuaWei: boolean = userAgent.indexOf("huawei") != -1;
        let onUcbrowser: boolean = userAgent.indexOf("ucbrowser") != -1 || userAgent.indexOf("ucweb") != -1;
        let onQHBrowser: boolean = userAgent.indexOf("qhbrowser") != -1 || userAgent.indexOf("qihoobrowser") != -1;
        let onOpera: boolean = userAgent.indexOf("opera") != -1;
        let isAppleWebkit: boolean = userAgent.indexOf("applewebkit") != -1;
        let isAdrChrome: boolean = userAgent.indexOf("chrome") != -1;
        let onQQ: boolean = userAgent.indexOf("qq") != -1;
        let isCompanyBrowser: boolean = userAgent.indexOf("browser_type/android_app") != -1;
        let onSamSung: boolean = userAgent.indexOf("samsungbrowser") != -1;
        let onXiaoMi: boolean = userAgent.indexOf("miuibrowse") != -1;

        // alert(userAgent);

        if (Laya.Browser.onMQQBrowser || Laya.Browser.onWeiXin || onFirefox || onUcbrowser || onOpera || onQHBrowser || onQQ || onSamSung || onXiaoMi) return;
        if (Laya.Browser.onPC || !navigator.userAgent) return;
        if (isCompanyBrowser) return;
        // if(onHuaWei) return;
        if (window.navigator["standalone"]) {
            if (document.getElementById("maskDiv")) {
                document.getElementById("maskDiv").style.visibility = "hidden";
                return;
            }
            else return;
        }
        /**
         * 全屏处理
         * ios: safari\chrome
         * Andriod: chrome  （安卓端qq浏览器通过meta标签强制全屏）
         */
        if (Laya.Browser.onSafari || (isAppleWebkit && Laya.Browser.onIOS) || (Laya.Browser.onAndroid && isAdrChrome)) {
            this._layaContainer = Laya.Browser.getElementById("layaContainer");
            this._layaCanvas = Laya.Browser.getElementById("layaCanvas");

            // let manifest = Laya.loader.getRes("manifest.json");
            // let dir:string = manifest && Application.instance.config.resVersionAvailable ? manifest["res/arrow.png"]: "";
            // alert("dir:" + dir);
            // console.log("arrow png dir:" + `<br /><img src="${dir}/res/arrow.png" /><br />向上滑动可全屏游戏`);

            this._maskDiv = document.createElement("div");
            this._maskDiv.innerHTML = `<br /><img src="arrow.png" /><br />向上滑动可全屏游戏`;// "向上滑动可全屏游戏"
            this._maskDiv.setAttribute("style", "position:absolute; text-align:center; font-size:20px; color:#ffffff; left:0px; top:0px; background:rgba(0, 0, 0, 0.5);");
            this._maskDiv.setAttribute("id", "maskDiv");
            this._maskDiv.onselectstart = function () { return false; };
            this._layaContainer.appendChild(this._maskDiv);

            window.scroll(0, 0);

            if (Laya.Browser.onIOS) {
                document.body.onscroll = function (event) {
                    if (/*document.body.scrollTop<0 || */TouchMoveFullScreen.IS_SHOW_MASK_DIV == false) {
                        TouchMoveFullScreen.instance().delayScroll(100, 0, 0);
                    }
                }
            }
            /**
             * 触摸事件
             */
            document.addEventListener('touchstart', this._onTouchStart, false);
            document.addEventListener("touchmove", this._touchMoves, false);
            document.addEventListener("touchend", this._touchEnd);
            /**
             * 手势事件
             */
            // document.addEventListener('gesturestart', this._onGesture, false);
            // document.addEventListener('gesturechange', this._onGesture, false);
            // document.addEventListener('gestureend', this._onGesture, false);

            /**
             * 浏览器焦点事件
             */
            let screenModeNow: ScreenMode;
            // Laya.stage.on(Laya.Event.FOCUS,this,function(){
            //     console.log("before" + screenModeNow);

            //     console.log("now" + Common.this.getScreenMode());

            // });
            // Laya.stage.on(Laya.Event.BLUR,this,function(){
            //     screenModeNow = Common.this.getScreenMode();
            // });
            window.onfocus = function (e) {
                // Laya.timer.once(150, this, function(){
                // console.log("before" + screenModeNow);
                // console.log("now" + Common.this.getScreenMode());
                if (TouchMoveFullScreen.instance()._isFocus === -1) return;
                else if (TouchMoveFullScreen.instance()._isFocus === 0) TouchMoveFullScreen.instance()._isFocus = 1;
                // else if(Common.TouchMoveFullScreen.instance()._isFocus === 2) return;
                else if (TouchMoveFullScreen.instance()._isFocus === 1) return;
                // })

            }
            window.onblur = function (e) {
                TouchMoveFullScreen.instance()._isblur = 0;
                screenModeNow = TouchMoveFullScreen.instance().getScreenMode();
                if (TouchMoveFullScreen.instance()._isFocus === -1) TouchMoveFullScreen.instance()._isFocus = 0;
                else if (TouchMoveFullScreen.instance()._isFocus === 1) return;
                // Common.TouchMoveFullScreen.instance()._isFocus = 2;
                // else if(Common.TouchMoveFullScreen.instance()._isFocus === 2) return;
            }

            this._onResizeHandle();
            Laya.stage.on(laya.events.Event.RESIZE, this, this._onResizeHandle);

        }
    }

    // private _onGesture(event)
    // {
    //     switch(event.type)
    //     {
    //         case "gesturestart":
    //             console.log("start");
    //             event.type = null;
    //             event.stopPropagation();
    //             event.preventDefault();
    //             break;
    //         case "gesturechange":
    //             console.log("change");
    //             event.type = null;

    //             event.stopPropagation();
    //             event.preventDefault();
    //             break;
    //         case "gestureend":
    //             console.log("end");
    //             event.type = null;

    //             event.stopPropagation();
    //             event.preventDefault();
    //             break;
    // }
    //     }

    private _onTouchStart(event) {
        TouchMoveFullScreen.instance()._touchStatus = true;
        if (event.touches.length > 1) {
            event.stopPropagation();
            event.preventDefault();
        }
    }

    private _touchMoves(event) {
        TouchMoveFullScreen.instance()._touchStatus = true;
        if (event.touches.length > 1) {
            event.stopPropagation();
            event.preventDefault();
        }
    }

    private _touchEnd() {
        setTimeout(function () {
            let documentThis = TouchMoveFullScreen.instance();
            // console.log(documentThis._isblur);
            if (!Laya.Browser.onSafari) {
                if (documentThis.getScreenMode() === ScreenMode.Portrait) {
                    if ((documentThis._isFull === false && documentThis._portraitConentHeigth === -1) || (documentThis._isFocus === 1 && documentThis._isblur === 1 && documentThis._portraitConentHeigth === -1)) {
                        documentThis._portraitConentHeigth = document.documentElement.clientHeight;
                    }
                    if (documentThis._portraitConentHeigth != -1 && documentThis._portraitConentHeigth > document.documentElement.clientHeight) {
                        documentThis._portraitConentHeigth = document.documentElement.clientHeight;
                    }
                } else {
                    if ((documentThis._isFull === false && documentThis._horizontalConentHeigth === -1) || (documentThis._isFocus === 1 && documentThis._isblur === 1 && documentThis._horizontalConentHeigth === -1)) {
                        documentThis._horizontalConentHeigth = document.documentElement.clientHeight;
                    }
                    if (documentThis._horizontalConentHeigth != -1 && documentThis._horizontalConentHeigth > document.documentElement.clientHeight) {
                        documentThis._horizontalConentHeigth = document.documentElement.clientHeight;
                    }
                }

                if (documentThis.getScreenMode() === ScreenMode.Portrait) {
                    if (Laya.Browser.clientHeight > documentThis._portraitConentHeigth || (documentThis._isFull === true && documentThis._portraitConentHeigth === -1)) {
                        documentThis._showMaskDiv(false);
                        documentThis._isFull = true;
                        // document.body.scrollTop = document.documentElement.scrollTop = 0;
                        window.scroll(0, 0);
                    }
                    else {
                        documentThis._showMaskDiv(true);
                        documentThis._isFull = false;
                        // document.body.scrollTop = document.documentElement.scrollTop = 0;
                        window.scroll(0, 0);
                    }
                } else {
                    if (Laya.Browser.clientHeight > documentThis._horizontalConentHeigth || (documentThis._isFull === true && documentThis._horizontalConentHeigth === -1)) {
                        documentThis._showMaskDiv(false);
                        documentThis._isFull = true;
                        // document.body.scrollTop = document.documentElement.scrollTop = 0;
                        window.scroll(0, 0);
                    }
                    else {
                        documentThis._showMaskDiv(true);
                        documentThis._isFull = false;
                        // document.body.scrollTop = document.documentElement.scrollTop = 0;
                        window.scroll(0, 0);
                    }
                }
            }
            else {
                if (Laya.Browser.clientHeight > document.documentElement.clientHeight) {
                    documentThis._showMaskDiv(false);
                    documentThis._isFull = true;
                    // document.body.scrollTop = document.documentElement.scrollTop = 0;
                    window.scroll(0, 0);
                } else {
                    documentThis._showMaskDiv(true);
                    documentThis._isFull = false;
                    // document.body.scrollTop = document.documentElement.scrollTop = 0;
                    window.scroll(0, 0);
                }
                let top: number = Laya.Browser.clientHeight - document.documentElement.clientHeight;
                if (Laya.Browser.onSafari && documentThis.getScreenMode() === ScreenMode.Landscape && top >= 0) {
                    documentThis._showMaskDiv(false);
                    documentThis._isFull = true;
                    // document.body.scrollTop = document.documentElement.scrollTop = 0;
                    window.scroll(0, 0);
                }
            }
            TouchMoveFullScreen.instance()._touchStatus = false;
            TouchMoveFullScreen.instance()._isblur = -1;
        }, TouchMoveFullScreen.instance()._isAppleChrome() ? 750 : 250);
    }

    private _isAppleChrome(): boolean {
        return (this.getScreenMode() === ScreenMode.Portrait && this._portraitConentHeigth === -1 && !Laya.Browser.onSafari && !Laya.Browser.onAndroid) || (this.getScreenMode() === ScreenMode.Landscape && this._horizontalConentHeigth === -1 && !Laya.Browser.onSafari && !Laya.Browser.onAndroid);
    }

    private delayScroll(delay: number, x: number, y: number): void {
        Laya.timer.clear(this, this.onDelayScroll);
        Laya.timer.once(delay, this, this.onDelayScroll, [x, y]);
    }

    private onDelayScroll(x: number, y: number): void {
        window.scroll(x, y);
    }

    private onResize(screenMode: ScreenMode) {
        if (this._isblur === 0) this._isblur = 1;
        if (screenMode === ScreenMode.None) return;
        if (ScreenMode.Landscape === screenMode) {
            this._touchEnd();
        }
        else if (ScreenMode.Portrait === screenMode) {
            this._touchEnd();
        }
    }

    /**
     * 变化后的屏幕模式，如果和上次的一样，则认为未发生变化，此时值为ScreenMode.None
     */
    public get changedScreenMode() {
        return this._changedScreenMode;
    }
    private _changedScreenMode: ScreenMode;

    /**
     * 上次的屏幕模式
     */
    private _lastScreenMode: ScreenMode = ScreenMode.None;
    private _onResizeHandle(e: Event = null): void {
        let nowScreenMode: ScreenMode = this.getScreenMode();
        if (nowScreenMode !== this._lastScreenMode) {
            this._changedScreenMode = nowScreenMode;
        }
        else {
            this._changedScreenMode = ScreenMode.None
        }

        // this._lastScreenMode = nowScreenMode;
        this._lastScreenMode = UIManager.instance.changedScreenMode;
        let screenMode: ScreenMode = this.changedScreenMode;
        this.onResize(screenMode);
        // console.log(Common.this.getScreenMode());

        let screenH: number = this.getScreenMode() === ScreenMode.Portrait ? screen.height : screen.width;
        // if (Laya.Browser.onAndriod) {
        //     screenH = screen.height;
        // }
        this._maskDiv.style.width = Laya.Browser.clientWidth + "px";
        this._maskDiv.style.height = screenH + 1 + "px";
        this.delayScroll(300, 0, 0);

        this._layaCanvas.style.transform = "matrix(" + Laya.stage._canvasTransform.toString() + ")";
        if (this._touchStatus === false) {
            this._touchEnd();
        }
    }

    private _showMaskDiv(isShowMaskDiv: boolean): void {
        this._maskDiv.style.visibility = isShowMaskDiv ? "visible" : "hidden";
        TouchMoveFullScreen.IS_SHOW_MASK_DIV = isShowMaskDiv;
    }

    private getScreenMode(): ScreenMode {
        // return document.documentElement.clientWidth >= document.documentElement.clientHeight ? ScreenMode.Landscape : ScreenMode.Portrait;
        return Laya.Browser.width >= Laya.Browser.height ? ScreenMode.Landscape : ScreenMode.Portrait;
    }
}