import DecoratorUtil from "../../utils/DecoratorUtil";

/**
* 网络的拼包和解包插件
*/
@rigger.utils.DecoratorUtil.register
export default class ProtocolCodeAssemblerPlugin extends rigger.AbsServicePlugin {
	static pluginName: string = "ProtocolCodeAssemblerPlugin";

	constructor() {
		super();
	}

	/**
	  * 拼网络包
	  * @param pkg 
	  * @param retPkg 
	  */
	protected assembleNetworkPackage(pkg: rigger.service.INetworkPackage, retPkg: rigger.service.INetworkPackage): rigger.service.INetworkPackage {
		if (!rigger.utils.Utils.isArray(pkg.outterData)) return pkg;
		if (pkg.outterData.length <= 0) return pkg;
		let code: number = pkg.outterData[0];
		let ret = new Laya.Byte();
		ret.endian = Laya.Socket.BIG_ENDIAN;
		ret.writeUint16(code);
		for (var i: number = 1; i < pkg.outterData.length; ++i) {
			ret.writeArrayBuffer(pkg.outterData[i]);
		}
		ret.pos = 0;
		retPkg.outterData = pkg.outterData = ret;
		return retPkg;
	}

	private protocoBufferClassKey: string = "_proto_class_";
	/**
	  * 解网络包
	  * @param pkg 
	  */
	protected unAssembleNetworkPackage(pkg: rigger.service.INetworkPackage, retPkg: rigger.service.INetworkPackage): rigger.service.INetworkPackage {
		if (retPkg.outterData instanceof ArrayBuffer) {
			let data: Laya.Byte = new Laya.Byte(retPkg.outterData);
			data.endian = Laya.Socket.BIG_ENDIAN;
			let head = this.readHeader(data);
			data.clear();
			data.writeArrayBuffer(pkg.outterData, 2);
			// 再根据协议头转换出protoBuffer类
			let temp = data.buffer;
			temp[this.protocoBufferClassKey] = DecoratorUtil.getProtocolResponseClassName(head);
			retPkg.innerData = [head, temp];

		}

		return retPkg;
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

	private readHeader(data: Laya.Byte): number {
		data.pos = 0;
		return data.getUint16();
	}
}