/**
* 登陆服务器
*/
import inject = riggerIOC.inject;
import * as protocol from "../../../protocol/protocols/protocols";
import * as protocolSignals from "../../../protocol/signals/signals";
import NetworkChannelNames from "../../../definitions/NetworkChannelNames";
import CommandCodes from "../../../protocol/CommandCodes";

export default class EntryServer extends riggerIOC.Server {

	constructor() {
		super();
		this.addProtocolListener();
	}

	private addProtocolListener() {
	}

	private removeProtocolListener() {
	}

	dispose() {
		// this.loginRespSignal = null;
		// this.loginSuccessSignal = null;
	}
}