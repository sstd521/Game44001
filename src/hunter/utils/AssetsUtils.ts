import UINameConstants from "../configs/UINameConstants";
import FUILoadingView from "../fui/loading/FUILoadingView";
import AssetsPackageGroup from "../definitions/AssetsPackageGroup";

/**
 * AssertsUtils
 */
export default class AssetsUtils {
    public static UICommonPackageUrlPath: string = "res/common";
    public static UIPackageUrlPath: string = "res/fui";
    public static protoBufferPathHead: string = "res/protoBuffer/";

    constructor() {

    }


    /**
    * 加载初始资源 
    */
    public static loadInitialAssets(caller: any, method: Function, args: any[] = null) {
        // 加载登陆所需资源
        rigger.service.AssetsPackageService.instance.loadPackageByGroup(AssetsPackageGroup.initial,
            rigger.RiggerHandler.create(caller, method, args));
    }

    public static loadPreloadingAssets(completeHandler: rigger.RiggerHandler, progressHandler?: rigger.RiggerHandler) {
        // 加载及初始化必须的UI资源
        this._loadPreloadingPackages(completeHandler, progressHandler);

    }

    private static _loadPreloadingPackages(completeHandler: rigger.RiggerHandler, progressHandler?: rigger.RiggerHandler) {
        // modules.push(Application.instance.mainModuleName);
        rigger.service.AssetsPackageService.instance.loadPackageByGroup(AssetsPackageGroup.preloading, completeHandler, progressHandler);
    }


    /**
     * 计算应该使用的loading名的包名（如果子游戏有自己的Loading界面，则使用子游戏自己的，否则使用公共的Loading界面)
     */
    private static _calculateLoadingPackageName(): string {
        // if (Application.instance.loadingModuleName) return Application.instance.loadingModuleName;
        return UINameConstants.FUI_PACKAGE_NAME_LOADING;
    }

    /**
     * 根据UI路径获取UI包名
     * path:packageName/uiName
     */
    public static getUIPackageName(path: string): string  {
        let arr: string[] = path.split("/");
        if (arr && arr.length >= 2)  {
            return arr[arr.length - 2];
        }

        return null;
    }


    /**
     * 根据UI路径获取UI名称
     * @public
     * @static
     * @method getUIName
     * @param {strArr} path UI的路径
     */
    public static getUIName(path: string): string  {
        let arr: string[] = path.split("/");
        if (arr && arr.length >= 2)  {
            return arr[arr.length - 1];
        }

        return null;

    }



    /**
     * 根据UI所在包名和UI名生成UI的真实名称
     */
    public static makeUIName(packageName: string, uiName: string)  {
        return `${packageName}/${uiName}`;
    }




    /**
     * 生成数据模块
     * 
     * @public
     * @static
     * @method makeDataModule
     * @param {string} modulePreFix 数据模拟的通用前缀
     * @param {strArr} [gameId=null] 游戏ID，如果不传或传入NULL，则自动获取当前的游戏ID
     * @return {any}    返回该数据模块的类定义
     */
    public static makeDataModule(modulePreFix: string, gameId?: number): any  {
        let moduleName: string;
        moduleName = modulePreFix;
        try  {
            return eval(moduleName);
        }
        catch (e) {
            return null;
        }
    }

    /**
    * 将一个fairyGUI格式的URL转换成一个普通格式的URL
    * 
    * @method convertFairyUrl
    * @static
    * @public
    * @param {string} url fairygui 格式的URL地址
    * @returns {string} 普通格式的URL地址
    */
    public static convertFairyUrl(url: string): string  {
        let item: fairygui.PackageItem = fairygui.UIPackage.getItemByURL(url);
        let customId: string = item.owner.customId;

        // 去掉custoId中最后的文件名,提取出路径
        let strArr: string[] = customId.split("/");
        strArr.pop();
        let path: string = strArr.join("/");

        return `${item.file}`;
    }

    /**
     * 获取游戏的背景音乐，并以普通URL的格式返回
     * @public
     * @static
     * @method makeBGMUrl
     * @return {string} 返回普通格式的游戏背景音乐URL
     */
    // public static makeBGMUrl():string
    // {
    //     return AssetsUtils.makeSoundUrl(AssetsConfig.GAME_BACK_MUSIC);
    // }


    /**
     * 生成指定名称的声音的URL，此URL是一个普通格式的URL（非fairygui格式)
     * 
     * @public
     * @static
     * @method makeSoundUrl
     * @param {strArr} soundName 声音的名称，一般定义在AssetsConfigs中
     * @return {string} 一个普通格式的路径地址，可以供LayaBox使用
     */
    public static makeSoundUrl(soundName: string, pkgName: string): string  {
        let fairyguiUrl: string = fairygui.UIPackage.getItemURL(pkgName, soundName);
        if (!fairyguiUrl) return null;
        return AssetsUtils.convertFairyUrl(fairyguiUrl);
    }

    /**
     * 获取加载界面的URL
     */
    public static makeLoadingViewUrl(): string  {
        // if(Application.instance.loadingModule)
        // {
        //     return Application.instance.loadingModule.FUILoadingView.URL;
        // }
        return FUILoadingView.URL;
    }

    /**
     * 生成包路径
     */
    public static makePackageFullName(packageName: string): string  {
        let subDir: string = "Common" === packageName || "Loading" === packageName || "SlotLogUI" === packageName ? AssetsUtils.UICommonPackageUrlPath : AssetsUtils.UIPackageUrlPath
        return `${subDir}/${packageName}/${packageName}`;
    }

    private static _linePre: string = "__LINE_";
    public static makeLineSign(lineId: number)  {
        return this._linePre + lineId;
    }


    /**获取游戏路径**/
    public static getUrl(dir: string, fileName: string, format: string = ".png", direct: boolean = false): string {
        return "res/" + dir + "/" + fileName + format;
    }

    /**获取游戏资源**/
    public static getAssetAtlas(name: string, uiPackage: fairygui.UIPackage): string[] {
        let itemMap: Object = uiPackage["_itemsByName"];
        let itemPackage: fairygui.PackageItem = itemMap[name];
        let sprites: Object = uiPackage["_items"]//uiPackage["_sprites"];
        let assets: string[] = [];
        for (let k in sprites) {
            let item: fairygui.PackageItem = sprites[k];

            if (item.file == null || item.file.indexOf(itemPackage.id) == -1) {
                continue;
            }
            //let asset:any = sprites[k];
            let atlasName: string = item["file"];
            atlasName = this.getUrl("fui/" + uiPackage.name, uiPackage.name + "@" + atlasName, "");
            // if (assets.indexOf(atlasName) != -1)
            // {
            //   continue;
            // }

            assets.push(atlasName);
        }
        return assets
    }

    public static getPackageRes(packageName: string, fileName: string): string {
        // fairygui.UIPackage.getItemByURL()
        return fairygui.UIPackage.getItemURL(packageName, fileName);
    }

    /**释放包的资源**/
    public static removeResByPackage(name: string, fun: Laya.Handler, force: boolean = false): void  {
        var arry: any[] = fun.runWith(name);
        for (var item of arry)  {
            this.removeResUrl(item.url, force);
        }
    }

    /**url释放资源**/
    public static removeResUrl(url: string, force: boolean = false): void  {
        Laya.loader.clearRes(url);
    }
}