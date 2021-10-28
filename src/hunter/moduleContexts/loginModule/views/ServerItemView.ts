import FUIServerItemView from "../../../fui/loginUi/FUIServerItemView";

/**
* 服务器荐 
*/
export class ServerInfo {
	serverName: string;
	serverIp: string;
	serverPort: number;
}

export class ServerItemView extends FUIServerItemView {
	constructor() {
		super();
	}

	public get info(): ServerInfo {
		return this._info;
	}
	private _info: ServerInfo = null;

	public setInfo(info: ServerInfo) {
		this._info = info;

		this.title = info.serverName;
		this.tooltips = `${info.serverIp}:${info.serverPort}`;
	}
}
