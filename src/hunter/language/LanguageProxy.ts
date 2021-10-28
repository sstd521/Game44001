import Utils from '../utils/Utils';
import Lang from './lang';
export default class LanguageProxy{

    private _fuiPackStringsSource:string;
    private _languageConfig:any;
    
    /**获得当前语言类型的语言字段配置 */
    static get languageConfig():any { return LanguageProxy._inst._languageConfig; }

    private static _inst:LanguageProxy;
    static instance():LanguageProxy
    {
        if(!LanguageProxy._inst) { LanguageProxy._inst = new LanguageProxy(); }

        return LanguageProxy._inst;
    }
    
    private _callback:Laya.Handler;
    public startup(callback:Laya.Handler):void
    {
        this._callback = callback;
        this.loadLanguageConfig();
    }

    private loadLanguageConfig():void
    {
        var languageType = Utils.getQueryString("language");
        Lang.language = languageType;
        
        var assetLists = [
            { url: "res/datas/language/Common/" + Lang.language + ".json", type: Laya.Loader.JSON },
            { url: "res/datas/language/Common/fui/FUIStringsSource.xml", type: Laya.Loader.TEXT },

            { url: "res/datas/language/Game/" + Lang.language + ".json", type: Laya.Loader.JSON },
            { url: "res/datas/language/Game/fui/FUIStringsSource.xml", type: Laya.Loader.TEXT }
        ];
        Laya.loader.load(assetLists, Laya.Handler.create(this, this.onLoadLanguageCompleteHandle));
    }

    private onLoadLanguageCompleteHandle():void
    {
        this._languageConfig = Laya.loader.getRes("res/datas/language/Common/" + Lang.language + ".json");
        this._fuiPackStringsSource = Laya.loader.getRes("res/datas/language/Common/fui/FUIStringsSource.xml");
        this.updatePackStringsSourceLanguage();

        if(this._callback) this._callback.run();
    }

    /**(多语言适配)更新fairygui字符串集的配置内容 */
    private updatePackStringsSourceLanguage():void
    {
        let index:number = 0;
        let stringEndIndex:number;
        let selectString:string;
        let languageID:number;
        while(true)
        {
            index = this._fuiPackStringsSource.indexOf("lang:", index);
            if(index==-1) break;

            stringEndIndex = this._fuiPackStringsSource.indexOf("</string>", index);
            selectString = this._fuiPackStringsSource.substring(index, stringEndIndex);
            languageID = parseInt(selectString.split(":")[1]);
            this._fuiPackStringsSource = this._fuiPackStringsSource.replace(selectString, $language(languageID));
        }
        fairygui.UIPackage.setStringsSource(this._fuiPackStringsSource);
    };
}

/**获取当前语言环境，指定字段ID的字符串**/
export function $language(LanguageID:number):string
{
    return LanguageProxy.languageConfig[LanguageID];
}

/**获取当前语言环境下对应语言资源包的资源URL */
export function $langResURL(assetName):string
{
    return "ui://"+Lang.packName+"/"+assetName;
}
