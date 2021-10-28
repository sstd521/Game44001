import SkeletonAnimationCreater from "../utils/SkeletonAnimationCreater";


 /**
 * Avatar 
 * 为骨骼动画的创建和基本操作提供支持
 */
export default class Avatar {
    /**
     * 骨骼动画各个时装槽位的默认资源映射,当首次进行时装显示时进行初始化
     * {skinName:{"slotName":url}}
     */
    private static _defaultSkinSlotResMap = {};

    public get body():laya.ani.bone.Skeleton
    {
        return this._body;
    }
    private _body: laya.ani.bone.Skeleton = null;

    private _curAction: any;
    private _curSkin: any;

    public get isLoop():boolean
    {
        return this._isLoop;
    }
    public set isLoop(value:boolean)
    {
        this._isLoop = value;
    }
    private _isLoop:boolean;

    private _bodyScaleX: number = 1;
    private _bodyScaleY: number = 1;

    private _handler: Laya.Handler = null;

    private _completeHandler: Laya.Handler;

    private _direction: number = 1;

    private _dataPath: string;

    constructor(dataPath?:string, handler?:Laya.Handler) {
        dataPath && this.init(dataPath, handler);
    }


    public init(dataPath: string, handler:Laya.Handler) {
        if(this._dataPath == dataPath)
        {
            // 已经加载过或正在加载过该资源
            // 更新回调
            this._addCompleteHandler(handler);
            // 检查骨骼资源是否已经加载,如果已经加载则直接调用一次回调
            if(this._body)
            {
                this._onSkeletonCreated(this._body);
            }
        }
        else
        {
            this._dataPath = dataPath;
            this._createSkeleton(handler);
        }
    }


    /**
     * 切换某部位的骨骼动画资源
     */
    public switchSkinSlotRes(slotName:string, res:string | Laya.Texture)
    {
        if(!res)
        {
            // 当卸载时装时，传空资源即可
            this._body.setSlotSkin(slotName, null);
            return;
        }

         switch (res.constructor) {
            case String:
                var wt:Laya.Texture = Laya.loader.getRes(res as string);
                this._body.setSlotSkin(slotName, wt); 
                break;  
            case laya.resource.Texture:
                this._body.setSlotSkin(slotName, res as Laya.Texture);     
                break;
        }
    }

    /**
     * 析构
     */
    public dispose(destroyChild: boolean = true)
    {
        this.recover();
        if(this._body)
        {
            this._body.destroy(destroyChild);
            this._body = null;
        }
        
    }

    /**
     * 回收,与析构的区别是，回收不析构动画，以供下次使用
     */
    public recover()
    {
        this._handler = null;

        this._completeHandler.recover();
        this._completeHandler = null;

        if(this._body)
        {
            this._body.paused();
            this._body.offAll();
            this._body.removeSelf();
        }

    }

    public setDirection(direction: number) 
    {
        this._direction = direction;
        if (!this._body) {
            return;
        }
        this._setDirection();
    }

    public scale(x: number, y: number) {
        this._bodyScaleX = x;
        this._bodyScaleY = y;
        if (this._body) {
            this._body.scale(x, y);

        }

        return this;
    }

    public play(nameOrIndex: any, loop:boolean = false, handler:Laya.Handler):Avatar {
        this._curAction = nameOrIndex;
        this._isLoop = loop;
        this._handler = handler;
        this._play();

        return this;
    }

    public changeSkin(skinNameOrIndex: any):Avatar {
        this._curSkin = skinNameOrIndex;
        this._changeSkin();

        return this;
    }

    public addSkeletonEvent(caller?: any, handler?: Function, args?)
    {   
        this._body.once(Laya.Event.LABEL, caller, handler);
        
    }

    /**
     * 缓存该骨骼动画指定槽位的资源(不需要缓存了，因为还原时，直接传null即可)
     */
    private _cacheDefaultSlotRes(slotName:string)
    {
        let map:{} = Avatar._defaultSkinSlotResMap[this._dataPath];
        if(!map)
        {
             map = {[slotName] : null};
             Avatar._defaultSkinSlotResMap[this._dataPath] = map;
        }

        let defaultTexture:Laya.Texture = map[slotName];
        if(!defaultTexture)
        {
            let slot:laya.ani.bone.BoneSlot = this._body.getSlotByName(slotName);
            let texture:Laya.Texture;
            if(slot)
            {
                texture = slot.currTexture;
                map[slotName] = texture;
            }
        }
        
        
    }

    /**
     * 获取已经缓存的槽位资源
     */
    private _getCachedDefaultSlotRes(slotName:string):Laya.Texture
    {
        let map:{} = Avatar._defaultSkinSlotResMap[this._dataPath];
        if(!map)
        {
            return null;
        }

        return map[slotName];
    }

    private _addCompleteHandler(handler:Laya.Handler)
    {
        if (handler) {
            this._completeHandler && this._completeHandler.recover();
            this._completeHandler = null;
            this._completeHandler = handler;
        }
    }

    private _createSkeleton(handler?: Laya.Handler) {
        this._addCompleteHandler(handler);
        var creater: SkeletonAnimationCreater = new SkeletonAnimationCreater();
        creater.create(this._dataPath, this, this._onSkeletonCreated);
    }

    private _onSkeletonCreated(ani) {
        if (this._body && this._body != ani) {
            this._body.offAll();
            this._body.removeSelf();
            this._body.destroy(true);
            this._body = null;
        }

        this._body = ani;
        this._body.visible = true;
        this._play();
        this._changeSkin();
        this._body.playbackRate(this._playbackRate);

        this._body.scale(this._bodyScaleX, this._bodyScaleY);
        this._setDirection();   

        // 回调
        this._completeHandler && this._completeHandler.runWith(this);

    }

    private _setDirection() {
        if (this._direction > 0) {
            if (this._body.scaleX < 0) {
                this._body.scale(this._body.scaleX * (-1), this._body.scaleY);                
            }
        }
        else {
            if (this._body.scaleX > 0) {
                this._body.scale(this._body.scaleX * (-1), this._body.scaleY);                                
            }
        }
    }

    /**
     * 回放速率;
     */
    public get playbackRate():number{
        return this._playbackRate;
    }
    public set playbackRate(rate:number){
        this._playbackRate = rate;
        if(this._body) this._body.playbackRate(this._playbackRate);
    }
    private _playbackRate:number = 1;
    // private _standardPlaybackRate:number = 30;
    // private _adjustPlaybackRate(costTime:number)
    // {
    //     // console.log("adjust rate, now:" + TimeManager.instance.now + ",cost:" + costTime);
        
    //     var f = 1000 / costTime;
    //     this._body.playbackRate(f);
    // }

    private _changeSkin() {
        if (!this._body) {
            return;
        }

        if (!this._curSkin) {
            return;
        }

        this._body.showSkinByName(this._curSkin);
    }

    private _play() {

        if (this._body == null || this._body.destroyed) {
            return;
        }

        this._body.once(Laya.Event.STOPPED, this, this._onStopped);                    
        if (this._handler && !this.isLoop) {
            this._body.once(Laya.Event.STOPPED, this, this._onStopped);                        
        }
        // console.log(`avtar==${this._dataPath}`);
        this._body.play(this._curAction, this.isLoop);
    }

    private _eventTest(e)
    {
        console.log("test event");
        
    }

    private _onStopped() 
    {
        this._handler && this._handler.run();
    }

}