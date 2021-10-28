import CommandCodes from "../../protocol/CommandCodes";
import * as protocolSignals from "../../protocol/signals/signals";
import * as protocol from "../../protocol/protocols/protocols";
import NetworkChannelNames from "../../definitions/NetworkChannelNames";
/**
* 心跳包协议插件 
*/
///<reference path = "../../protocol/signals/BeatHeartRespSignal.ts" />
@rigger.utils.DecoratorUtil.register
export default class HeartBeatProtocolPlugin extends rigger.AbsServicePlugin {
	static pluginName:string = "HeartBeatProtocolPlugin";
	@riggerIOC.inject(protocolSignals.BeatHeartRespSignal)
	private heartBeartRespSignal: protocolSignals.BeatHeartRespSignal;
	constructor() {
		super();
	}

	public doPing(): void {
		// console.log("ping");

		let req: protocol.BeatHeartReq = new protocol.BeatHeartReq();
		rigger.service.NetworkService.instance.send(NetworkChannelNames.GameChannel, CommandCodes.PPBeatHeartReq, req);
	}

	public receivePong() {
		// console.log("receive pong");
		this.heartBeartRespSignal.on(this, this.onHeartBeartResp);
		// EventServiceUtil.addProtocolListener(CommandCodes.PPBeatHeartResp, this, this.onHeartBeartResp);
	}

	public cancelReceivePong() {
		this.heartBeartRespSignal.off(this, this.onHeartBeartResp);

		// EventServiceUtil.removeProtocolListener(CommandCodes.PPBeatHeartResp, this, this.onHeartBeartResp);

	}

	/**
	  * 插件开始时的回调 
	  * @param resultHandler 
	  * @param startupArgs 
	  */
	protected onStart(resultHandler: rigger.RiggerHandler, startupArgs: any[]): void {
		resultHandler.success();
	}

	/**
	  * 插件停止时的回调 
	  * @param resultHandler 
	  */
	protected onStop(resultHandler: rigger.RiggerHandler): void {
		resultHandler.success();
	}

	/**
	  * 插件重启时的回调
	  * @param resultHandler 
	  */
	protected onRestart(resultHandler: rigger.RiggerHandler): void {
		resultHandler.success();
	}

	private onHeartBeartResp(resp: protocol.BeatHeartResp) {
		rigger.service.TimeService.instance.setServerTime(resp.serverSec * 1000);
		this.getOwner<rigger.service.HeartBeatService>().doPong();
	}
}