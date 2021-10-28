import UIWindow from "../../utils/UIWindow";
import UIManager from "../../manager/UIManager";
import FUIGmBtn from "../../fui/gmCmd/FUIGmBtn";
import GmCmd from "../../definitions/GmCmd";

/**
 * GmView
 */
export default class GmBtnView extends UIWindow<FUIGmBtn> {

    public static get instance(): GmBtnView {
        if (!this._instance) {
            this._instance = new GmBtnView();
        }
        return this._instance;
    }
    private static _instance: GmBtnView;

    static getUrl(): string {
        return FUIGmBtn.URL;
    }

    constructor() {
        super();
        this.needMask = false;
    }

    onInit() {
        super.onInit();
        this._loadConfig();
    }

    onShown() {
        super.onShown();
        this.addEventListener();
    }

    onHide() {
        super.onHide();
        this.removeEventListener();
    }

    dispose() {
        super.dispose();

    }

    addEventListener() {
        this.contentPane.onClick(this, this.onClickGmBtn);
    }

    removeEventListener() {
        this.contentPane.m_n7.onClick(this, this.onClickGmBtn);
    }

    layout() {
        let gmBtnGroup: riggerLayout.Group = new riggerLayout.Group(this.contentPane);
        gmBtnGroup.top = '3%';
        gmBtnGroup.right = '3%';
        gmBtnGroup.width = [riggerLayout.LayoutSpec.create(1, 1334 / 750, "5%"), riggerLayout.LayoutSpec.create(-1, 750 / 1334, "10%")];
        gmBtnGroup.height = [riggerLayout.LayoutSpec.create(1334 / 750, -1, "10%"), riggerLayout.LayoutSpec.create(750 / 1334, 1, "5%")];
        RiggerLayout.layer.addChild(gmBtnGroup);
    }

    removeLayou() {
        RiggerLayout.layer.remove(this.contentPane);
    }

    private onClickGmBtn() {
        UIManager.instance.showGMView();
    }

    private _resRand;
    private _loadConfig() {
        this._resRand = Math.random();
        let configUrls: {}[] = [
            // { url: "gameConfig.json?" + this._resRand, type: Laya.Loader.JSON },
            { url: "gmCmds.json?" + this._resRand, type: Laya.Loader.JSON },
            //  { url: "layout.json?" + this._resRand, type: Laya.Loader.JSON },
        ]
        // let configUrls: {} = {url: "gmCmds.json?" + this._resRand, type: Laya.Loader.JSON};
        Laya.loader.load(configUrls, Laya.Handler.create(this, this._onConfigLoaded));
    }

    /**
     * 配置加载成功
     */
    private _onConfigLoaded() {
        this._initGMCmds();
    }

    /**
     * 游戏的GM指令列表
     */
    public get gmCmds(): GmCmd[] {
        return this._gmCmds;
    }
    private _gmCmds: GmCmd[] = [];

    /**
     * 初始化GM指令
     */
    private _initGMCmds() {
        // if(this._config.mode === GameMode.Release) 
        // {
        //     this._gmCmds = [];
        //     return;
        // }
        let moneyCmd: GmCmd = new GmCmd();
        moneyCmd.title = "增加金钱";
        moneyCmd.cmd = "jq";
        moneyCmd.default = 10000;

        let updateLayoutCmd: GmCmd = new GmCmd();
        updateLayoutCmd.title = "更新布局"
        updateLayoutCmd.cmd = "updateLayout";
        updateLayoutCmd.default = "";

        let clearVoiceAlertCacheCmd: GmCmd = new GmCmd();
        clearVoiceAlertCacheCmd.title = "清除游戏的本地缓存";
        clearVoiceAlertCacheCmd.cmd = "clearLocalCache";
        clearVoiceAlertCacheCmd.default = "";

        GmBtnView.instance._gmCmds.push(moneyCmd);
        GmBtnView.instance._gmCmds.push(updateLayoutCmd);
        GmBtnView.instance._gmCmds.push(clearVoiceAlertCacheCmd);
        GmBtnView.instance._gmCmds = GmBtnView.instance._gmCmds.concat(Laya.Loader.getRes("gmCmds.json?" + this._resRand));
    }
}