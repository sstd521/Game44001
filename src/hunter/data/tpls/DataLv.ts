import IDataLv from "../defines/IDataLv";

// ============================================
// 本文件根据data_lv自动生成
// 请勿手改
// ============================================
export default class DataLv {
	public static getIds(): any[]
	{
		return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, ]
	}

	public static getData(key: any): IDataLv
	{
		return DataLv.instance.data[key];
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

	public static get instance(): DataLv
	{
		if (!this._instance) {
			this._instance = new DataLv();
		}
		return this._instance;
	}
	private static _instance: DataLv;

	constructor() {
		this.data = {
			1: {
				lv: 1,
				exp: 10000,
				headId: 1,
			},
			2: {
				lv: 2,
				exp: 100000,
				headId: 1,
			},
			3: {
				lv: 3,
				exp: 500000,
				headId: 1,
			},
			4: {
				lv: 4,
				exp: 800000,
				headId: 1,
			},
			5: {
				lv: 5,
				exp: 1000000,
				headId: 2,
			},
			6: {
				lv: 6,
				exp: 1300000,
				headId: 2,
			},
			7: {
				lv: 7,
				exp: 1600000,
				headId: 2,
			},
			8: {
				lv: 8,
				exp: 1900000,
				headId: 2,
			},
			9: {
				lv: 9,
				exp: 2200000,
				headId: 2,
			},
			10: {
				lv: 10,
				exp: 2500000,
				headId: 3,
			},
		}
	}
}