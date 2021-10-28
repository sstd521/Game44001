/**
* 登陆服务器
*/
import inject = riggerIOC.inject;
import * as protocol from "../../../protocol/protocols/protocols";
import * as protocolSignals from "../../../protocol/signals/signals";
import NetworkChannelNames from "../../../definitions/NetworkChannelNames";
import CommandCodes from "../../../protocol/CommandCodes";

export default class BriefServer extends riggerIOC.Server {

	constructor() {
		super();
		this.addProtocolListener();
	}

	private addProtocolListener() {
	}

	private removeProtocolListener() {
        
	}

	/**
	 * 请求排行榜
	 * 类型 1-本周 2-上周
	 *  */
	public rankReq(type: number) {
		let req: protocol.RankReq = new protocol.RankReq();
		req.type = type;
		rigger.service.NetworkService.instance.send(NetworkChannelNames.GameChannel, CommandCodes.PPRankReq, req);
	}

	dispose() {
		// this.loginRespSignal = null;
		// this.loginSuccessSignal = null;
	}
}