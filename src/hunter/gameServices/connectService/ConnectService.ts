/**
* 连接服务
*/
import MyApplication from '../../MyApplication';
import { GameState } from '../../MyApplication';
import UIManager from '../../manager/UIManager';
import Utils from '../../utils/Utils';
import ServerListView from '../../moduleContexts/loginModule/views/ServerListView';
import * as GameEventNames from '../../configs/GameEventNames'; 
import CommandCodes from '../../protocol/CommandCodes';
import FUIServerListView from '../../fui/loginUi/FUIServerListView';
import * as protocol from "../../protocol/protocols/protocols";
import NetworkChannelNames from '../../definitions/NetworkChannelNames';

@rigger.utils.DecoratorUtil.register
export default class ConnectService extends rigger.service.AbsService {
	constructor() {
		super();
	}

	/**
	  * 服务名
	  */
	public static serviceName: string = "ConnectService";

	public static get instance(): ConnectService {
		return ConnectService.getRunningService<ConnectService>(ConnectService.serviceName);
	}

	/**
	  * 服务启动时的回调
	  * @param {ServerHandler} resultHandler 由服务启动者传递的一个回调句柄，当服务启动成功时，服务提供者应该以"true"参数回调，否则以"false"参数回调
	  * @param {any[]} startupArgs 由服务启动者传递的一个回调句柄，当服务启动成功时，服务提供者应该以"true"参数回调，否则以"false"参数回调
	  * 
	  * @example resultHandler.runWith([true]) 启动成功
	  */
	protected onStart(resultHandler: rigger.RiggerHandler, startupArgs: any[]): void {
		this.init();
		resultHandler.success();
	}

	/**
	  * 停止服务时的回调
	  * @param {ServerHandler} resultHandler 由服务启动者传递的一个回调句柄，当服务启动成功时，服务提供者应该以"true"参数回调，否则以"false"参数回调
	  * @example resultHandler.runWith([true]) 服务停用成功
	  */
	protected onStop(resultHandler: rigger.RiggerHandler): void {
		resultHandler.success();
	}

	/**
	  * 启动服务时的回调
	  * @param {ServerHandler} resultHandler 由服务启动者传递的一个回调句柄，当服务重启成功时，服务提供者应该以"true"参数回调，否则以"false"参数回调
	  * @example resultHandler.runWith([true]) 重启
	  */
	protected onReStart(resultHandler: rigger.RiggerHandler): void {
		resultHandler.success();
	}


	public set serverIP(ip: string) {
		this._serverIp = ip;
	}
	private _serverIp: string = null;

	public set serverPort(port: number) {
		this._serverPort = port;
	}
	private _serverPort: number;


	/**
	  * 帐号服务器下发的登陆凭证
	  */
	public get token(): string {
		// let cfg:rigger.config.MyApplicationConfig = MyApplication.instance.getConfig<rigger.config.MyApplicationConfig>();
		// if (!this._token) return cfg.testToken;
		return this._token;
		// return "111111";
	}
	public set token(v: string) {
		this._token = v;
	}
	private _token: string;

	/**
	  * 大厅地址
	  */
	public get lobbyUrl(): string {
		return this._lobbyUrl || null;
	}
	private _lobbyUrl: string = null;

	/**
	  * 房间参数
	  */
	public get roomInfo(): Object {
		return this._roomInfo
	}
	private _roomInfo: Object = null;

	/**
	  * 玩家自身房卡数量
	  */
	public get cardNum(): string {
		return this._cardNum || null;
	}
	private _cardNum: string = null;

	/**
	  * 分享链接(纯链接)
	  */
	public get shareUrl(): string {
		return this.shareUrl || null;
	}
	private _shareUrl: string = null;

	/**
	  * 分享链接(文字加链接)
	  */
	public get shareText(): string {
		return this._shareText || null;
	}
	private _shareText: string = null

	public init() {
		this._addEventListener();
		this._initServer();
	}

	public dispose() {
		this._removeEventListener();
	}

	/**
	  * 连接游戏服
	  */
	public connectGameServer() {
		if (this._serverIp) {
			MyApplication.instance.nowGameState = GameState.ConnectingGameServer;
			rigger.service.NetworkService.instance.connect(NetworkChannelNames.GameChannel, this._serverIp, this._serverPort);
			// NetworkManager.instance.connect(NetJZWL.SocketType.GameServer, this._serverIp, this._serverPort);

			// 伪造
			// this._onGameServerConnected(); 
		}
		else {
			UIManager.instance.showWindow(ServerListView, true, UIManager.instance.sceneLayer);
		}
	}


	/**
	  * 登陆游戏服
	  */
	public loginGameServer() {
		var req: protocol.LoginReq = new protocol.LoginReq;
		console.log(req.toString());
		if (this.roomInfo != null) {
			if (this.roomInfo['ret'] == "false") {
				console.log(this.roomInfo['msg']);
				return;
			}
			else {
				MyApplication.instance.getConfig<rigger.config.MyApplicationConfig>().gameId = this.roomInfo['data']['itemid'];
			}
		}
		req.gameId = MyApplication.instance.getConfig<rigger.config.MyApplicationConfig>().gameId;
		// req.gameId = 0;			
		req.token = this.token;

		rigger.service.NetworkService.instance.send(NetworkChannelNames.GameChannel, CommandCodes.PPLoginReq, req);

		//  以上临时注释

		// 伪造数据
		// player_id:number;//玩家id
		// coin:number;//玩家拥有的金币数
		// type:number;//1是正式玩,2是免费
		// is_debug?:number;//0:正式版1:测试版
		// reason:number;//0:登录成功,1:先下线再登录,其他表示登录失败的原因
		// let resp = {};
		// resp["player_id"] = 1;
		// resp["coin"] = 10000;

		// let resp:protocol.LoginResp = new protocol.LoginResp();
		// resp.gameId = 2001,
		// resp.balance = 1000,
		// resp.type = 3,
		// EventManager.instance.dispatchEvent(CommandCodes.PPLoginResp, NetworkManager.instance, resp);
	}

	private _addEventListener() {
		let networkService = rigger.service.NetworkService.instance;
		let eventService: rigger.service.EventService = rigger.service.EventService.instance;
		rigger.service.NetworkService.instance.onConnect(NetworkChannelNames.GameChannel, this, this._onGameServerConnected);
		rigger.service.HeartBeatService.instance.onTimeOut(this, this._onSocketDisconnected, []);
		networkService.onClose(NetworkChannelNames.GameChannel, this, this._onSocketDisconnected);
		eventService.addEventListener(GameEventNames.EVENT_NECESSARY_ASSETS_LOADED, rigger.service.AssetsService.serviceName, this, this._onNecessaryAssetsLoaded);
		eventService.addEventListener(GameEventNames.EVENT_GAME_SOCKET_CLOSE, rigger.service.NetworkService.serviceName, this, this._onSocketDisconnected);
		eventService.addEventListener(GameEventNames.EVENT_GAME_SOCKET_CONNECTED, rigger.service.NetworkService.serviceName, this, this._onGameServerConnected);
	}

	private _removeEventListener() {
		let eventService: rigger.service.EventService = rigger.service.EventService.instance;

		rigger.service.HeartBeatService.instance.offTimeOut(this, this._onSocketDisconnected);
		rigger.service.NetworkService.instance.offConnect(NetworkChannelNames.GameChannel, this, this._onGameServerConnected);
		rigger.service.NetworkService.instance.offClose(NetworkChannelNames.GameChannel, this, this._onSocketDisconnected);
		eventService.removeEventListener(GameEventNames.EVENT_NECESSARY_ASSETS_LOADED, rigger.service.AssetsService.serviceName, this, this._onNecessaryAssetsLoaded);
		eventService.removeEventListener(GameEventNames.EVENT_GAME_SOCKET_CLOSE, rigger.service.NetworkService.serviceName, this, this._onSocketDisconnected);
		eventService.removeEventListener(GameEventNames.EVENT_GAME_SOCKET_CONNECTED, rigger.service.NetworkService.serviceName, this, this._onGameServerConnected);

	}

	private _initServer() {
		this._serverIp = this._getServerIp();
		this._serverPort = parseInt(this._getServerPort());

		this._token = this._getToken();
		this._lobbyUrl = this._getLobbyUrl();

		this._roomInfo = this._getRoomInfo();

		this._cardNum = this._getCardNum();

		this._shareUrl = this._getShareUrl();

		this._shareText = this._getShareText();
	}


	/**
	  * 获取后台设置的IP
	  */
	private _getServerIp(): string {
		// return this._getMetaValue("serverIp");
		// let str: string = "ws://";
		let ip: string = this._getMetaValue("serverIp");
		// if(ip) {
		// 	ip = (str.indexOf(ip) == -1) ? (`ws://${ip}`) : ip;
		// }
		return ip;
	}

	/**
	  * 获取后台设置的服务器端口
	  */
	private _getServerPort(): string {
		return this._getMetaValue("serverPort");
	}

	/**
	  * 获取后台设置的token
	  */
	private _getToken(): string {
		return this._getMetaValue("token");
	}

	/**
	  * 获取后台设置的大厅地址
	  */
	private _getLobbyUrl(): string {
		// return "http://www.baidu.com";
		return this._getMetaValue("lobbyUrl");
	}

	/**
	  * 获取后台设置的房间参数
	  */
	private _getRoomInfo(): Object {
		if (this._getMetaValue("roomInfo") == null) return null;
		return eval("(" + this._getMetaValue("roomInfo") + ")");
		// return  eval(window.atob(this._getMetaValue("roomInfo")));
	}

	/**
	  * 获取后台设置的玩家自身的房卡数量
	  */
	private _getCardNum(): string {
		return this._getMetaValue("cardNum");
	}

	/**
	  * 获取后台设置的分享链接(纯链接)
	  */
	private _getShareUrl(): string {
		return this._getMetaValue("shareUrl");
	}

	/**
	  * 获取后台设置的分享链接(文字加链接)
	  */
	private _getShareText(): string {
		return this._getMetaValue("shareText");
	}

	/**
	  * 获取指定ID的元素的value值
	  * @param id 
	  */
	public _getMetaValue(id: string): string {
		let ele: HTMLElement = null;
		if (ele = document.getElementById(id)) {
			let metaValue: string = ele.getAttribute("value");
			if (id == "token") {
				return metaValue;
			}
			else {
				return Utils.utf8_decode(window.atob(metaValue));
			}
		}

		return null;
	}

	/**
	  * 游戏的必要资源加载完成了
	  */
	private _onNecessaryAssetsLoaded(): void {
		// 连接游戏服
		this.connectGameServer();
	}


	private _gameServerConnectedTimes = 0
	private _reconnectTimes: number = 1;
	private _onSocketDisconnected() {
		// if(PlayerManager.instance.kicked) return;
		Laya.timer.clearAll(this);
		rigger.service.NetworkService.instance.close(NetworkChannelNames.GameChannel);
		if (this._gameServerConnectedTimes >= 0) {
			// 显示掉线提示
			UIManager.instance.showReconnectView();
			this._gameServerConnectedTimes = 0;
		}
		else {
			// 重连
			// alert("reconnect:" + this._gameServerConnectedTimes);
			++this._gameServerConnectedTimes;
			// NetworkManager.instance.close(NetJZWL.SocketType.GameServer);
			this.connectGameServer();

			// 设置超时
			Laya.timer.once(3000, this, this._onSocketDisconnected);
		}
	}

	private _initiallizied: boolean = false;
	/**
	  * 与服务器建立了SOCKET连接
	  */
	private _onGameServerConnected() {
		Laya.timer.clearAll(this);
		UIManager.instance.hideWindowByName(FUIServerListView.URL);
		// if (this._initiallizied) {
		// 	// 重新登陆
		// 	this.loginGameServer();
		// }
		// else {
		console.log("game server connected");
		// 	MyApplication.instance.nowGameState = GameState.ConnectedGameServer;
		// 	this.loginGameServer();
		// 	this._initiallizied = true;
		// }

	}
}