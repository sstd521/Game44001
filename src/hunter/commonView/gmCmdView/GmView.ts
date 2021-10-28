import UIWindow from "../../utils/UIWindow";
import UIManager from "../../manager/UIManager";
import Utils from "../../utils/Utils";
import GmBtnView from "./GmBtnView";
import CommandCodes from "../../protocol/CommandCodes";
import FUIGMCmdItemView from "../../fui/gmCmd/FUIGMCmdItemView";
import FUIGmView from "../../fui/gmCmd/FUIGmView";
import * as protocol from "../../protocol/protocols/protocols";
import GmCmd from "../../definitions/GmCmd";
import NetworkChannelNames from "../../definitions/NetworkChannelNames";
/**
 * GmView
 */
export default class GmView extends UIWindow<FUIGmView> {
    constructor() {
        super();
        this.needMask = true;

    }
    static getUrl(): string {
        return FUIGmView.URL;
    }

    onInit()  {
        super.onInit();
        this._initGmCmdList();
    }

    onShown()  {
        super.onShown();
        UIManager.instance.maskView.onClick(this, this._onClickMask);
        this.contentPane.m_content.m_cancelBtn.onClick(this, this._onClickMask);
        this.contentPane.m_content.m_confirmBtn.onClick(this, this._onClickConfirm);
    }

    onHide()  {
        super.onHide();
        UIManager.instance.maskView.offClick(this, this._onClickMask);
        this.contentPane.m_content.m_cancelBtn.offClick(this, this._onClickMask);
        this.contentPane.m_content.m_confirmBtn.offClick(this, this._onClickConfirm);
    }

    dispose()  {
        super.dispose();

    }

    layout()  {


        // Layout.addScaleFairy(this.contentPane.m_content,[
        // Layout.style.WINDOWS_CENTER_X,
        // Layout.style.WINDOWS_CENTER_Y,
        // Layout.style.ZOOM_WINDOWSWIDTH,
        // Layout.style.ZOOM_WINDOWSHEIGHT+"@2",
        // ]);

    }

    private _initGmCmdList()  {
        let cmds: GmCmd[] = GmBtnView.instance.gmCmds;
        if (!cmds || cmds.length <= 0)  {
            this.contentPane.m_content.m_gmList.numItems = 0;
            return;
        }

        this.contentPane.m_content.m_gmList.itemRenderer = Laya.Handler.create(this, this._onGmItemRender, null, false);
        this.contentPane.m_content.m_gmList.on(fairygui.Events.CLICK_ITEM, this, this._onSelectedGmCmd);
        this.contentPane.m_content.m_gmList.numItems = cmds.length;
    }

    private _onGmItemRender(idx: number, item: FUIGMCmdItemView)  {
        if (!item) return;
        let cmd: GmCmd = GmBtnView.instance.gmCmds[idx];
        item.m_btn.text = cmd.title;
        item["idx"] = idx;
    }

    private _onClickMask()  {
        UIManager.instance.hideWindow(this);
    }

    private _onClickConfirm()  {
        let gmReq: protocol.GmReq = new protocol.GmReq();
        gmReq.gmStr = this.contentPane.m_content.m_gmInput.text;
        if (gmReq.gmStr === "updateLayout ")  {
            //更新布局
            // Layout.updateLayout();
            this._onClickMask();
            return;
        }

        if (gmReq.gmStr === "clearLocalCache ")  {
            // 清除掉声音提示界面缓存
            Utils.clearAudioAlertCache();
            this._onClickMask();
            return;
        }

        if (!Utils.isNullOrEmpty(gmReq.gmStr)) {
            // NetworkManager.instance.send(CommandCodes.PPGmReq, gmReq);
            rigger.service.NetworkService.instance.send(NetworkChannelNames.GameChannel, CommandCodes.PPGmReq, gmReq);
        }
        this._onClickMask();
    }

    private _onSelectedGmCmd(obj: fairygui.GObject)  {
        let idx: number = obj["idx"];
        let cmd: GmCmd = GmBtnView.instance.gmCmds[idx];
        this.contentPane.m_content.m_gmInput.text = this._makeGmCmdStr(cmd);
    }

    private _makeGmCmdStr(cmd: GmCmd): string  {
        if (Utils.isNullOrEmpty(cmd.cmd)) return "";

        if (cmd.default instanceof Array)  {
            return `${cmd.cmd} [${cmd.default}]`;
        }
        //!add_money 1000
        return `!${cmd.cmd} ${cmd.default}`;
    }
}