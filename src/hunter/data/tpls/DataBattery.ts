import IDataBattery from "../defines/IDataBattery";

// ============================================
// 本文件根据data_battery自动生成
// 请勿手改
// ============================================
export default class DataBattery {
	public static getIds(): any[]
	{
		return [1, 2, 3, 4, ]
	}

	public static getData(key: any): IDataBattery
	{
		return DataBattery.instance.data[key];
	}
	private data: Object;

	public static make_merge_key(...args): string{
		if (args.length <= 0) return "";
		let ret = args[0];
		for(var i = 1; i < args.length; ++i){
			ret += `&${args[i]}`
		}
		return ret;
	}

	public static get instance(): DataBattery
	{
		if (!this._instance) {
			this._instance = new DataBattery();
		}
		return this._instance;
	}
	private static _instance: DataBattery;

	constructor() {
		this.data = {
			1: {
				pos: 1,
				x: 1,
				y: 1,
			},
			2: {
				pos: 2,
				x: 1,
				y: 1,
			},
			3: {
				pos: 3,
				x: 1,
				y: 1,
			},
			4: {
				pos: 4,
				x: 1,
				y: 1,
			},
		}
	}
}