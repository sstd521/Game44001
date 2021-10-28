/**
 * 动态资源类，用于动态加载窗体所需要的动态资源
 */
export default class DynamicSource implements fairygui.IUISource{

    constructor(caller:any, fileName:string, fileType:string, packageName:string) {
        this._fileName = fileName;
        this._fileType = fileType;
        this._packageName = packageName;
        this._caller = caller;
    }

    /**
     * 文件名
     */
    public get fileName():string
    {
        return this._fileName;
    }
    public set fileName(name:string)
    {
        this._fileName = name;
    }
    private _fileName:string = null;

    /**
     * 文件类型
     */
    public get fileType():string
    {
        return this._fileType;
    }
    private _fileType:string = null;

    /**
     * 资源的包名
     */
    public get packageName():string
    {
        return this._packageName;
    }
    private _packageName:string = null;

    /**
     * 资源是否已经加载
     */
    public get loaded():boolean
    {
        return !!Laya.Loader.getRes(this._fileName);
    }

    private _caller:any;

    /**
     * 加载资源，由Window类回调
     */
    public load(cb:() => void):void
    {
        Laya.loader.load(this._fileName, Laya.Handler.create(this, this._onLoaded, [cb]), null, this._fileType);
    }

    public dispose()
    {
        this._caller = null;
    }

    private _completedHandler:Laya.Handler;
    public onLoaded(caller:any, fun:Function, args?:any[])
    {
        this._completedHandler = Laya.Handler.create(caller, fun, args, true);
    }

    /**
     * 资源加载完成
     */
    private _onLoaded(cb:() => void)
    {
        this._completedHandler && this._completedHandler.run();
        cb.apply(this._caller);
        this.dispose();
    }
}