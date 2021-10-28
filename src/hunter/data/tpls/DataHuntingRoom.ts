import IDataHuntingRoom from "../defines/IDataHuntingRoom";

// ============================================
// 本文件根据data_hunting_room自动生成
// 请勿手改
// ============================================
export default class DataHuntingRoom {
	public static getIds(): any[]
	{
		return [1, 2, 3, ]
	}

	public static getData(key: any): IDataHuntingRoom
	{
		return DataHuntingRoom.instance.data[key];
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

	public static get instance(): DataHuntingRoom
	{
		if (!this._instance) {
			this._instance = new DataHuntingRoom();
		}
		return this._instance;
	}
	private static _instance: DataHuntingRoom;

	constructor() {
		this.data = {
			1: {
				id: 1,
				name: "0.1倍场",
				rate: 0.1,
				num: 4,
				balanceLimit: 0,
				batteryLvList: [1, 2, 3, 5, 10, 20, 30, 50, 100, ],
			},
			2: {
				id: 2,
				name: "1倍场",
				rate: 1.0,
				num: 4,
				balanceLimit: 0,
				batteryLvList: [1, 2, 3, 5, 10, 20, 30, 50, 100, ],
			},
			3: {
				id: 3,
				name: "10倍场",
				rate: 10.0,
				num: 4,
				balanceLimit: 0,
				batteryLvList: [1, 2, 3, 5, 10, 20, 30, 50, 100, ],
			},
		}
	}
}