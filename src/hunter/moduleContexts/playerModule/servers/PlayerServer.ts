/**
 * 玩家服务
 */
import * as protocol from '../../../protocol/protocols/protocols';
import * as protocolSignals from '../../../protocol/signals/signals';
import NetworkChannelNames from '../../../definitions/NetworkChannelNames';
import CommandCodes from '../../../protocol/CommandCodes';
import inject = riggerIOC.inject;
import PlayerModel from '../models/PlayerModel';
import PlayerInfoUpdateSignal from '../signals/PlayerInfoUpdateSignal';
import BalanceUpdateSignal from '../../roomModule/signals/BalanceUpdateSignal';
export default class PlayerServer extends riggerIOC.Server {
    /**玩家游戏数据 */
    @inject(protocolSignals.HuntingInfoRespSignal)
    private huntingInfoRespSignal: protocolSignals.HuntingInfoRespSignal;

    /**玩家基本信息（ID，NAME） */
    @inject(protocolSignals.UserInfoRespSignal)
    private userInfoRespSignal: protocolSignals.UserInfoRespSignal;

    /**玩家数据更新 */
    @inject(PlayerInfoUpdateSignal)
    private playerInfoUpdateSignal: PlayerInfoUpdateSignal;

    /**玩家数据 */
    @inject(PlayerModel)
    private playerModel: PlayerModel;

    /**充值更新协议 */
    @inject(protocolSignals.BalancePushSignal)
    private balancePushSignal: protocolSignals.BalancePushSignal;
    
    /**玩家余额更新 */
    @inject(BalanceUpdateSignal)
    private balanceUpdateSignal: BalanceUpdateSignal;

    constructor() {
        super();
        this.addProtocolListener();
        // this.userInfoReq();
    }

    dispose() {
        this.removeProtoclListener();
    }

    private addProtocolListener() {
        this.huntingInfoRespSignal.on(this, this.onHuntingInfoResp);
        this.userInfoRespSignal.on(this, this.onUserInfoResp);
        this.balancePushSignal.on(this, this.onBalancePush);
    }

    private removeProtoclListener() {
        this.huntingInfoRespSignal.off(this, this.onHuntingInfoResp);
        this.userInfoRespSignal.off(this, this.onUserInfoResp);
        this.balancePushSignal.off(this, this.onBalancePush);
    }

    /**
     * 玩家基础数据请求(Id、昵称、等级、经验)
     */
    public userInfoReq() {
        //等级、经验
        let req: protocol.HuntingInfoReq = new protocol.HuntingInfoReq();
        rigger.service.NetworkService.instance.send(NetworkChannelNames.GameChannel, CommandCodes.PPHuntingInfoReq, req);

        //id、昵称
        let req2: protocol.UserInfoReq = new protocol.UserInfoReq();
        rigger.service.NetworkService.instance.send(NetworkChannelNames.GameChannel, CommandCodes.PPUserInfoReq, req2);
    }

    /**
     * 玩家数据返回
     * @param resp 等级、经验
     */
    private onHuntingInfoResp(resp: protocol.HuntingInfoResp) {
        this.playerModel.playerSelfInfo.lv = resp.lv;
        this.playerModel.playerSelfInfo.exp = resp.exp;
        //派发玩家数据更新的信号
        this.playerInfoUpdateSignal.dispatch();
    }

    /**
     * 玩家数据返回
     * @param resp id、昵称
     */
    private onUserInfoResp(resp: protocol.UserInfoResp) {
        this.playerModel.playerSelfInfo.userId = resp.userId;
        this.playerModel.playerSelfInfo.name = resp.userName;
        //派发玩家数据更新的信号
        this.playerInfoUpdateSignal.dispatch();
    }

    /**
     * 玩家充值更新
     * @param resp 
     */
    private onBalancePush(resp: protocol.BalancePush) {
        this.playerModel.playerSelfInfo.balance += resp.change;
        this.balanceUpdateSignal.dispatch([this.playerModel.playerSelfInfo.userId, resp.change]);
    }
}