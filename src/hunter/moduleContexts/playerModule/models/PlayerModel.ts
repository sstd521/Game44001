/**
 * 玩家数据存放
 */
import { PlayingType } from "../../../definitions/PlayingType";
import PlayerInfo from "./PlayerInfo";
import LoginModel from "../../loginModule/models/LoginModel";
import inject = riggerIOC.inject;
export default class PlayerModel extends riggerIOC.Model {
    @inject(LoginModel)
    private loginModel: LoginModel;

    constructor() {
        super();
        // this.init();
        this.addProtocolListener();
    }

    dispose() {
        this.removeProtocolListener();
    }

    private addProtocolListener() {
    }

    private removeProtocolListener() {
    }

    init() {
        this.playerSelfInfo = new PlayerInfo();
        this.playerSelfInfo.balance = this.loginModel.loginInfo.balance;
        this.playerSelfInfo.type = this.loginModel.loginInfo.type;
    }
    public playerSelfInfo: PlayerInfo;

}