import UIWindow from "../../../utils/UIWindow";
import ConnectService from "../../../gameServices/connectService/ConnectService";
import { ServerItemView, ServerInfo } from "./ServerItemView";
import * as ServerConfig from '../../../configs/ServerConfig';
import FUIServerListView from "../../../fui/loginUi/FUIServerListView";
/**
* name 
*/
export default class ServerListView extends UIWindow<FUIServerListView>{
	constructor() {
		super();
	}

	static getUrl(): string {
		return FUIServerListView.URL;
	}

	onInit() {
		this.contentPane.m_context.m_serverList.itemRenderer = Laya.Handler.create(this, this._onItemRender, null, false);
		this.contentPane.m_context.m_serverList.numItems = ServerConfig.debugServerList.length;
		this.contentPane.m_context.m_serverList.on(fairygui.Events.CLICK_ITEM, this, this._onSelectServer);

		var serverId: number = 0;
		if (localStorage["fg_server"])
			serverId = JSON.parse(localStorage["fg_server"]);
		if (serverId > this.contentPane.m_context.m_serverList.numItems - 1)
			serverId = 0;
		this.contentPane.m_context.m_serverList.selectedIndex = serverId;
		this._onSelectServer();

		this.contentPane.m_enter.m_startBtn.onClick(this, this._onClickEnter);

		var token: string;
		if (localStorage["fg_token"])
			token = JSON.parse(localStorage["fg_token"]);
		if (token)
			this.contentPane.m_enter.m_token_input.text = token;
		else
			this.contentPane.m_enter.m_token_input.text = ConnectService.getRunningService<ConnectService>(ConnectService.serviceName).token;
	}

	protected layout() {
		// 内容
		let contextGroup: riggerLayout.Group = new riggerLayout.Group(this.contentPane.m_context);
		contextGroup.name = "contextGroup";
		contextGroup.horizontalCenter = 0;
		contextGroup.width = [
			RiggerLayoutHelper.createScreenP("80%"),
			RiggerLayoutHelper.createScreenL("66%")
		];
		RiggerLayout.layer.addChild(contextGroup);

		// 背景
		let bgGroup: riggerLayout.Group = new riggerLayout.Group(this.contentPane.m_bgGraphic);
		bgGroup.name = "bgGroup";
		bgGroup.width = riggerLayout.LayoutSpec.create(1334 / 750, -1, "100%");
		bgGroup.height = [
			riggerLayout.LayoutSpec.create(1, 1334 / 750, "100%"),
			riggerLayout.LayoutSpec.create(750 / 1334, 1, "100%"),
			riggerLayout.LayoutSpec.create(-1, 750 / 1334, "100%")
		];
		RiggerLayout.layer.addChild(bgGroup);

		// 按钮
		let btnGroup: riggerLayout.Group = new riggerLayout.Group(this.contentPane.m_enter);
		btnGroup.name = "btnGroup";
		btnGroup.horizontalCenter = 0;
		btnGroup.width = [
			RiggerLayoutHelper.createScreenP("35%"),
			RiggerLayoutHelper.createScreenL("20%")
		];
		btnGroup.bottom = [
			RiggerLayoutHelper.createScreenP("20%"),
			RiggerLayoutHelper.createScreenL("20%")
		];
		RiggerLayout.layer.addChild(btnGroup);
	}

	private _onItemRender(idx: number, item: ServerItemView) {
		item && item.setInfo(ServerConfig.debugServerList[idx]);
	}

	private _onSelectServer() {
		// let items:ServerItemView[] = this.contentPane.m_context.m_serverList.getSelection();
		let item: ServerItemView = this.contentPane.m_context.m_serverList.getChildAt(this.contentPane.m_context.m_serverList.selectedIndex) as ServerItemView;
		// console.log(`selected server name:${item.info.serverName}`);

		this._updateSelectedServerInfo(item.info);

	}

	private _updateSelectedServerInfo(server: ServerInfo) {
		this.contentPane.m_context.m_serverInfoLabel.text =
			`服务器名：${server.serverName}
			服务器IP:${server.serverIp}
			服务器端口:${server.serverPort}`
	}

	private _onClickEnter() {
		let selectedIndex: number = this.contentPane.m_context.m_serverList.selectedIndex;
		if (selectedIndex < 0) {
			alert("Please select at least one server to enter!");
			return;
		}

		if (this.contentPane.m_enter.m_token_input.text == "") {
			alert("Please input token!");
			return;
		}
		ConnectService.instance.token = this.contentPane.m_enter.m_token_input.text;
		localStorage["fg_token"] = JSON.stringify(ConnectService.instance.token);
		localStorage["fg_server"] = JSON.stringify(selectedIndex);

		let item: ServerItemView = this.contentPane.m_context.m_serverList.getChildAt(selectedIndex) as ServerItemView;
		ConnectService.instance.serverIP = item.info.serverIp;
		ConnectService.instance.serverPort = item.info.serverPort;
		ConnectService.instance.connectGameServer();
	}
}