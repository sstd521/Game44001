import Utils from "../utils/Utils";
import Avatar from "../skeleton/Avatar";
import { VideoType } from "../definitions/VideoType";
import { ScreenMode } from "../definitions/ScreenMode";

/**
 * 动画播放器的资源类
 */
export  class VideoPlayerViewAssets {
    constructor() {
    }

    /**
     * 资源地址，主要是图集资源,用于LAYA加载相关资源
     * 1.对于骨骼动画请在此处填写其图集资源地址
     * 2.对于Laya.ani与fairyGUI.GLoader,此字段无效
     */
    url: string | string[];

    /**
     * 资源类型，用于LAYA加载相关资源
     */
    type: string = Laya.Loader.IMAGE;

    /**
     * 以下字段对骨骼动画没有意义
     */

    /**
     * 资源所属的动作名
     * 1.对于骨骼动画，此字段没有意义
     * 2.对于其它类型的动画，必须要填写一个动作名
     */
    actionName: string;

    /**
     * 一个额外的资源地址，目前只对：VideoType.GLoader有效
     * 1.对于VideoType.LayaAnimation,该字段表示其.ani文件的地址
     * 2.对于VideoType.GLoader,表示其在fairyGUI中的动画的地址，形如:ui://package/assets
     */
    extraUrl?: string;

    /**
     * 动作开始位置
     * 1.只对非骨骼动画有效
     */
    startIndex?: number;

    /**
     * 动作结束位置
     * 1.只能非骨骼动画有效
     */
    stopIndex?: number;

    /**
     * 标识资源是是否已经就绪
     */
    ready?: boolean = false;
}

/**
 * VideoPlayer
 */
export class VideoPlayerViewParams  {
    /**
     * 视频/动画播放资源,注意url与assets的区别:
     * 1.对于骨骼动画url对应其.sk文件,且assets对于骨骼动画没有意义
     * 2.对于Laya原生动画(VideoType.LayaAnimation),url对应其.ani文件地址,而assets对应了动画的图集路径(往往是.json/.atlas)
     * 3.对于VideoType.GLoader而言，url没有意义，此时请将动画地址配置在VideoPlayerViewAssets.extraUrl中
     *   assets表示其需要的图集资源（列表),且如果需要按动作播放GLoader动画，还需要在actionInfo中配置相关信息
     */
    url: string;

    /**
     * 依赖的资源地址，如果已经预加载则可以不填注意assets与url的区别:
     * 1.对于骨骼动画url对应其.sk文件,且assets对于骨骼动画没有意义
     * 2.对于Laya原生动画(VideoType.LayaAnimation),url对应其.ani文件地址,而assets对应了动画的图集路径(往往是.json/.atlas)
     * 3.对于VideoType.GLoader而言，url没有意义，此时请将动画地址配置在VideoPlayerViewAssets.extraUrl中
     *   assets表示其需要的图集资源（列表),且如果需要按动作播放GLoader动画，还需要在actionInfo中配置相关信息
     */
    assets?: VideoPlayerViewAssets[];

    /**
     * 视频类型
     */
    type: VideoType;
    /**
     * 准备完毕后的回调
     */
    completeHandler: Laya.Handler;

    /**
     * 在什么屏幕模式下播放，如果为ＮＯＮＥ则所有屏幕模式下,则表示在所有模式屏幕下都会播放
     */
    screenMode: ScreenMode = ScreenMode.Portrait;
}

export default class VideoPlayerView extends fairygui.GComponent {
    private _params: VideoPlayerViewParams;

    /**
     * 设置回放速率
     */
    public get playbackRate(): number {
        return this._playbackRate;
    }
    public set playbackRate(rate: number) {
        this._playbackRate = rate;
        if (this._content && this._params.type === VideoType.Skeleton) {
            (this._content as Avatar).playbackRate = rate;
        }
    }
    private _playbackRate: number = 1;

    constructor() {
        super();
        Laya.stage.on(Laya.Event.RESIZE, this, this._onResize);
    }

    dispose()  {
        Laya.stage.on(Laya.Event.RESIZE, this, this._onResize);
        this._disposeContent();
        super.dispose();
    }

    public init(params: VideoPlayerViewParams)  {
        this._params = params;
        this._disposeContent();

        switch (params.type) {
            case VideoType.LayaAnimation:
                this._initLayaAni();
                break;
            case VideoType.GLoader:
                this._initGLoaderAnimation();
                break;
            case VideoType.Skeleton:
                this._initSkeletonAnimation();
                break;
            default:
                break;
        }

        this._onResize();
    }


    // public setXY(xv:number, yv:number)
    // {
    //     super.setXY(xv, yv);
    // }

    private _actionName: string = undefined;
    private _loop: boolean = true;
    private _playCompleteHandler: Laya.Handler;
    private _ready: boolean = false;

    // 默认动作
    private _defaultAction: string;
    /**
     * 播放
     * @public
     * @method play
     * @param {string} [action = null] 要播放的动作，对于VideoType.GLoader类型的动画，此参数不能空，即必须指定一个有效的动作
     * @param {boolean} [loop = true] 是否循环播放
     * @param {Laya.Handler} [completeHandler = null] 播放完成后的回调，此回调的表现部分取决于内部组件的表现，如VideoType.GLoader类型的动画循环播放时可能不会触发此回调
     */
    public play(action: string = null, loop: boolean = true, completeHandler?: Laya.Handler)  {
        if (!this._defaultAction) this._defaultAction = action;
        if (this._active || !this._actionName) {
            this._actionName = action;
            this._loop = loop;
            this._playCompleteHandler = completeHandler;
        }

        if (!this._active) return;
        if (this._ready) this._play();
    }

    /**
     * 设置骨骼动画的皮肤，只对骨骼动画有用
     */
    public setSkin(skin: string)  {
        if (VideoType.Skeleton === this._params.type)  {
            if (this._content)  {
                (<Avatar>this._content).changeSkin(skin);
            }
        }
    }

    private _active: boolean = false;
    private _onResize()  {
        this._active = true;
        if (this._params && (this._params.screenMode !== ScreenMode.None)) {
            this._active = this.visible = (this._params.screenMode === Utils.getScreenMode());
        }
        if (!this._actionName) return;
        if (this._active) {
            // this._play();
        }
        else  {
            this._actionName = this._defaultAction;
        }
    }

    private _play()  {
        if (!this._params) return;
        switch (this._params.type) {
            case VideoType.LayaAnimation:
                this._playLayaAni();
                break;
            case VideoType.GLoader:
                this._playGLoaderAni();
                break;
            case VideoType.Skeleton:
                this._playSkeletonAni();
                break;
            default:
                break;
        }
    }

    private _playLayaAni()  {
        if (!this._ready) return;
        if (!this._content) return;
        (<Laya.Animation>this._content).play(this._actionName, this._loop);
        this._resetPlayPlan();
    }

    private _playSkeletonAni()  {
        if (Utils.isNullOrEmpty(this._actionName)) return;
        if (!this._content) return;
        (<Avatar>this._content).play(this._actionName, this._loop, this._playCompleteHandler);
    }

    private _playGLoaderAni()  {
        let loader: fairygui.GLoader = <fairygui.GLoader>this._content;
        let url: string = this._checkGLoaderAction();
        if (url)  {
            (<fairygui.GLoader>this._content).url = url;
            // 是否要播放
            if (loader.content instanceof fairygui.display.MovieClip)  {
                loader.content.setPlaySettings(0, -1, this._loop ? 0 : 1, -1, this._playCompleteHandler);
            }
            // 重置动作
            this._resetPlayPlan();
        }
    }

    private _resetPlayPlan()  {
        this._actionName = this._defaultAction;
        this._loop = true;
        this._playCompleteHandler = undefined;
    }

    private _checkGLoaderAction(): string  {
        if (this._params.type === VideoType.GLoader && !this._actionName) throw new Error("GLoader Animation Must Have an Valid Action!");
        // 检查动作资源是否准备就绪
        let actionInfo: VideoPlayerViewAssets = this._actionMap[this._actionName];
        if (this._params.type === VideoType.GLoader && !actionInfo) throw new Error("GLoader Animation Must Have an Valid Action!");
        if (actionInfo.ready)  {
            return actionInfo.extraUrl;
        }

        return null;
    }


    /**
     * 初始化一个LAYA原生动画
     */
    private _initLayaAni()  {
        this._ready = false;
        // this._initGLoaderActions();
        let url: { url, type }[] = [];
        for (var i: number = 0, len = this._params.assets.length; i < len; ++i)  {
            this._formatAssetsUrl(this._params.assets[i], url);
        }

        // // 加载数据
        if (rigger.service.AssetsService.instance.getAssets(url, rigger.RiggerHandler.create(this, this._onLayaAniAssetsLoaded)))  {
            this._onLayaAniAssetsLoaded();
        }
    }

    private _initSkeletonAnimation()  {
        // 检查资源是否就绪
        // if(this._params.assets.length <= 0) throw new Error("Invalid Assets Config For Skeleton Animation!");
        if (Utils.isNullOrEmpty(this._params.url)) throw new Error("Invalid Url Config For Skeleton Animation!");

        // let allUrl:{url, type}[] = [];
        // for(var i:number = 0, len:number = this._params.assets.length; i < len; ++i)
        // {
        //     allUrl = allUrl.concat(this._formatAssetsUrl(this._params.assets[i]));
        // }

        this._content = new Avatar();
        // if(AssetsManager.instance.getAssets(allUrl, Laya.Handler.create(this, this._onSkeletonAssetsLoaded)))
        // {
        this._onSkeletonAssetsLoaded();
        // }

    }

    private _onSkeletonAssetsLoaded()  {
        // 资源已经就绪
        (<Avatar>this._content).init(this._params.url, Laya.Handler.create(this, this._onSkeletonInitCompleted));
    }

    private _onSkeletonInitCompleted()  {
        let body: laya.ani.bone.Skeleton = (<Avatar>this._content).body;
        this.displayObject.addChild(body);

        this._ready = true;
        this._params && this._params.completeHandler && this._params.completeHandler.run();
        this.playbackRate = this._playbackRate;

        this._play();
    }

    private _actionMap: {} = {};
    private _actionUrlMap: {} = {};
    private _initGLoaderAnimation()  {
        this._content = new fairygui.GLoader();
        this.addChild(this._content);
        this._ready = true;

        // 初始化动作
        this._initGLoaderActions();

        // 格式化资源地址
        // let assetsUrl = this._formateAssetsUrl();
        // for(var i:number = 0, len:number = assetsUrl.length; i < len; ++i)
        // {
        //     AssetsManager.instance.getAssets(this._params.assets[i], Laya.Handler.create(this, this._onGLoaderAssetsLoaded, this._params.assets[i]))
        // }
    }

    /**
     * 初始化GLoader类型的动画的动作
     */
    private _initGLoaderActions()  {
        this._actionMap = {};
        this._actionUrlMap = {};
        let assets: VideoPlayerViewAssets[] = this._params.assets;

        if (assets && assets.length > 0)  {
            for (var i: number = 0, len: number = this._params.assets.length; i < len; ++i)  {
                if (this._params.type === VideoType.GLoader && !assets[i].extraUrl) throw ("GLoader Animation Must Config a valid extraUrl! Please Check Out!");
                if (!assets[i].actionName) continue;

                this._actionMap[assets[i].actionName] = assets[i];
                let url = this._formatAssetsUrl(assets[i]);
                if (this._isAssetsReady(url))  {
                    assets[i].ready = true;
                }
                else  {
                    // 加载
                    assets[i].ready = false;
                    rigger.service.AssetsService.instance.getAssets(url, rigger.RiggerHandler.create(this, this._onGLoaderAssetsLoaded, [url[0].url]));
                    if (!Utils.isNullOrEmpty(url[0].url)) this._actionUrlMap[url[0].url] = assets[i].actionName;
                }

            }
        }
    }

    /**
     * 检查资源是否已经就绪
     * @param assetsUrl 资源地址URL
     */
    private _isAssetsReady(assetsUrl: { url, type } | { url, type }[]): boolean  {
        if (Utils.isAssetsUrlObject(assetsUrl))  {
            return !!Laya.Loader.getRes(assetsUrl.url);
        }
        else if (Utils.isArray(assetsUrl))  {
            // 如果是数据，需要检查每一个资源
            for (var i: number = 0, len = assetsUrl.length; i < len; ++i)  {
                if (!this._isAssetsReady(assetsUrl[i]))  {
                    return false;
                }
            }

            return true;
        }

        return false;
    }

    /**
     * 对传入的Assets的资源地址进行格式化
     * @param assets 
     * @param old 已经收集的资源地址的数组
     */
    private _formatAssetsUrl(assets: VideoPlayerViewAssets, old: { url, type }[] = []): { url, type }[]  {
        if (Utils.isString(assets.url))  {
            old.push(assets);
            return old;
        }

        if (Utils.isArray(assets.url))  {
            // let ret:{url, type}[] = [];
            for (var i: number = 0, len = assets.url.length; i < len; ++i)  {
                old.push({ url: assets.url[i], type: assets.type || Laya.Loader.IMAGE });
            }

            return old;
        }
    }



    /**
     * GLoader形式的动画资源加载完成
     * @param url 资源地址，实际上此参数只是参数列表中的第一个，仅做标记用
     */
    private _onGLoaderAssetsLoaded(url)  {
        // console.log("gloader assets loaded");

        if (this._actionUrlMap[url])  {
            this._actionMap[this._actionUrlMap[url]].ready = true;
        }

        if (this._params.completeHandler && this._isAllLoaded()) this._params.completeHandler.run();

        // 检查是否需要播放刚加载的资源
        if (this._actionName && this._actionUrlMap[url] === this._actionName)  {
            this._play();
        }

    }

    /**
     * 是否所有的资源都已经加载完毕
     */
    private _isAllLoaded(): boolean  {
        for (var i: number = 0, len: number = this._params.assets.length; i < len; ++i)  {
            if (this._params.assets[i].actionName && !this._params.assets[i].ready) return false;
        }

        return true;
    }

    // private _formateAssetsUrl():{url, type}[]
    // {
    //     this._params.assets = this._params.assets || [];

    //     // 加载资源
    //     if(Utils.isString(this._params.assets))
    //     {
    //         this._params.assets = [{url:this._params.assets, type:Laya.Loader.IMAGE}];
    //     }
    //     else if(Utils.isAssetsUrlObject(this._params.assets))
    //     {
    //         this._params.assets = [this._params.assets];
    //     }

    //     return this._params.assets;
    // }

    private _content: Laya.Animation | Avatar | fairygui.GLoader;
    private _onLayaAniAssetsLoaded()  {
        this._content = new Laya.Animation();
        this._content.loadAnimation(this._params.url, Laya.Handler.create(this, this._onLayaAniCreated));
    }

    private _onLayaAniCreated()  {
        if (this._isLayaNode(this._content))  {
            this.displayObject.addChild(this._content);
        }

        this._ready = true;
        if (this._actionName !== undefined) this._play();
        this._params.completeHandler && this._params.completeHandler.run();
    }

    public get content(): any  {
        return this._content;
    }

    private _isLayaNode(node: any): node is Laya.Node  {
        return node instanceof Laya.Node;
    }

    private _isFairyguiNode(node: any): node is fairygui.GObject  {
        return node instanceof fairygui.GObject;
    }

    private _disposeContent()  {
        if (this._content && this._isFairyguiNode(this._content)) {
            this._content.dispose()
        }
        else if (this._content && this._isLayaNode(this._content))  {
            this._content.destroy();
        }

        this._content = null;
    }

}