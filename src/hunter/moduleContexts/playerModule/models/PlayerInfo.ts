import { PlayerSex } from "../../../definitions/PlayerSex";

export default class PlayerInfo {
    constructor() {
    }
    
    //id
    public userId: number; 

    //等级
    public lv: number;

    //经验
    public exp: number;

    //昵称
    public name: string;

    //头像
    public head: number;

    //余额
    public balance: number;

    //正式玩家,试玩玩家
    public type: number;

    //性别
    public sex: PlayerSex;

    //炮台位置
    public pos: number;

    //炮台等级
    public battery_lv: number;
}
