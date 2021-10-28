import DecoratorUtil from '../utils/DecoratorUtil';
import * as protocolSignals from './signals/signals';
import * as protocol from './protocols/protocols'
export default class CommandCodes {

	@DecoratorUtil.retrievAble(CommandCodes.PPLoginReq)
	static readonly PPLoginReq = 1;

	@DecoratorUtil.retrievAble(CommandCodes.PPLoginResp)
	@DecoratorUtil.protocolResponseSignal(protocolSignals.LoginRespSignal)
	@DecoratorUtil.protocolResponse(protocol.LoginResp)
	static readonly PPLoginResp = 2;

	@DecoratorUtil.retrievAble(CommandCodes.PPErrResp)
	@DecoratorUtil.protocolResponseSignal(protocolSignals.ErrRespSignal)
	@DecoratorUtil.protocolResponse(protocol.ErrResp)
	static readonly PPErrResp = 3;

	@DecoratorUtil.retrievAble(CommandCodes.PPBeatHeartReq)
	static readonly PPBeatHeartReq = 4;

	@DecoratorUtil.retrievAble(CommandCodes.PPBeatHeartResp)
	@DecoratorUtil.protocolResponseSignal(protocolSignals.BeatHeartRespSignal)
	@DecoratorUtil.protocolResponse(protocol.BeatHeartResp)
	static readonly PPBeatHeartResp = 5;

	@DecoratorUtil.retrievAble(CommandCodes.PPGmReq)
	static readonly PPGmReq = 6;

	@DecoratorUtil.retrievAble(CommandCodes.PPGmResp)
	@DecoratorUtil.protocolResponseSignal(protocolSignals.GmRespSignal)
	@DecoratorUtil.protocolResponse(protocol.GmResp)
	static readonly PPGmResp = 7;

	@DecoratorUtil.retrievAble(CommandCodes.PPKickUserPush)
	@DecoratorUtil.protocolResponseSignal(protocolSignals.KickUserPushSignal)
	@DecoratorUtil.protocolResponse(protocol.KickUserPush)
	static readonly PPKickUserPush = 8;

	@DecoratorUtil.retrievAble(CommandCodes.PPGetBalanceReq)
	static readonly PPGetBalanceReq = 9;

	@DecoratorUtil.retrievAble(CommandCodes.PPGetBalanceResp)
	@DecoratorUtil.protocolResponseSignal(protocolSignals.GetBalanceRespSignal)
	@DecoratorUtil.protocolResponse(protocol.GetBalanceResp)
	static readonly PPGetBalanceResp = 10;

	@DecoratorUtil.retrievAble(CommandCodes.PPBalancePush)
	@DecoratorUtil.protocolResponseSignal(protocolSignals.BalancePushSignal)
	@DecoratorUtil.protocolResponse(protocol.BalancePush)
	static readonly PPBalancePush = 11;

	@DecoratorUtil.retrievAble(CommandCodes.PPUserSettingReq)
	static readonly PPUserSettingReq = 15;

	@DecoratorUtil.retrievAble(CommandCodes.PPShareBalanceReq)
	static readonly PPShareBalanceReq = 16;

	@DecoratorUtil.retrievAble(CommandCodes.PPUserInfoReq)
	static readonly PPUserInfoReq = 17;

	@DecoratorUtil.retrievAble(CommandCodes.PPUserInfoResp)
	@DecoratorUtil.protocolResponseSignal(protocolSignals.UserInfoRespSignal)
	@DecoratorUtil.protocolResponse(protocol.UserInfoResp)
	static readonly PPUserInfoResp = 18;

	@DecoratorUtil.retrievAble(CommandCodes.PPSystemPush)
	@DecoratorUtil.protocolResponseSignal(protocolSignals.SystemPushSignal)
	@DecoratorUtil.protocolResponse(protocol.SystemPush)
	static readonly PPSystemPush = 19;

	@DecoratorUtil.retrievAble(CommandCodes.PPAnnouncementPush)
	@DecoratorUtil.protocolResponseSignal(protocolSignals.AnnouncementPushSignal)
	@DecoratorUtil.protocolResponse(protocol.AnnouncementPush)
	static readonly PPAnnouncementPush = 20;

	@DecoratorUtil.retrievAble(CommandCodes.PPHuntingInfoReq)
	static readonly PPHuntingInfoReq = 1000;

	@DecoratorUtil.retrievAble(CommandCodes.PPHuntingInfoResp)
	@DecoratorUtil.protocolResponseSignal(protocolSignals.HuntingInfoRespSignal)
	@DecoratorUtil.protocolResponse(protocol.HuntingInfoResp)
	static readonly PPHuntingInfoResp = 1001;

	@DecoratorUtil.retrievAble(CommandCodes.PPHuntingEnterRoomReq)
	static readonly PPHuntingEnterRoomReq = 1002;

	@DecoratorUtil.retrievAble(CommandCodes.PPHuntingEnterRoomOkReq)
	static readonly PPHuntingEnterRoomOkReq = 1003;

	@DecoratorUtil.retrievAble(CommandCodes.PPHuntingEnterRoomResp)
	@DecoratorUtil.protocolResponseSignal(protocolSignals.HuntingEnterRoomRespSignal)
	@DecoratorUtil.protocolResponse(protocol.HuntingEnterRoomResp)
	static readonly PPHuntingEnterRoomResp = 1004;

	@DecoratorUtil.retrievAble(CommandCodes.PPHuntingExitRoomReq)
	static readonly PPHuntingExitRoomReq = 1005;

	@DecoratorUtil.retrievAble(CommandCodes.PPHuntingExitRoomResp)
	@DecoratorUtil.protocolResponseSignal(protocolSignals.HuntingExitRoomRespSignal)
	@DecoratorUtil.protocolResponse(protocol.HuntingExitRoomResp)
	static readonly PPHuntingExitRoomResp = 1006;

	@DecoratorUtil.retrievAble(CommandCodes.PPHuntingRoomInfoResp)
	@DecoratorUtil.protocolResponseSignal(protocolSignals.HuntingRoomInfoRespSignal)
	@DecoratorUtil.protocolResponse(protocol.HuntingRoomInfoResp)
	static readonly PPHuntingRoomInfoResp = 1007;

	@DecoratorUtil.retrievAble(CommandCodes.PPMonRefreshResp)
	@DecoratorUtil.protocolResponseSignal(protocolSignals.MonRefreshRespSignal)
	@DecoratorUtil.protocolResponse(protocol.MonRefreshResp)
	static readonly PPMonRefreshResp = 1008;

	@DecoratorUtil.retrievAble(CommandCodes.PPChangeBatteryLvReq)
	static readonly PPChangeBatteryLvReq = 1009;

	@DecoratorUtil.retrievAble(CommandCodes.PPUpdatePlayerResp)
	@DecoratorUtil.protocolResponseSignal(protocolSignals.UpdatePlayerRespSignal)
	@DecoratorUtil.protocolResponse(protocol.UpdatePlayerResp)
	static readonly PPUpdatePlayerResp = 1010;

	@DecoratorUtil.retrievAble(CommandCodes.PPFireReq)
	static readonly PPFireReq = 1011;

	@DecoratorUtil.retrievAble(CommandCodes.PPFireResp)
	@DecoratorUtil.protocolResponseSignal(protocolSignals.FireRespSignal)
	@DecoratorUtil.protocolResponse(protocol.FireResp)
	static readonly PPFireResp = 1012;

	@DecoratorUtil.retrievAble(CommandCodes.PPShellReq)
	static readonly PPShellReq = 1013;

	@DecoratorUtil.retrievAble(CommandCodes.PPShellResp)
	@DecoratorUtil.protocolResponseSignal(protocolSignals.ShellRespSignal)
	@DecoratorUtil.protocolResponse(protocol.ShellResp)
	static readonly PPShellResp = 1014;

	@DecoratorUtil.retrievAble(CommandCodes.PPMonUpdateResp)
	@DecoratorUtil.protocolResponseSignal(protocolSignals.MonUpdateRespSignal)
	@DecoratorUtil.protocolResponse(protocol.MonUpdateResp)
	static readonly PPMonUpdateResp = 1015;

	@DecoratorUtil.retrievAble(CommandCodes.PPFishTideResp)
	@DecoratorUtil.protocolResponseSignal(protocolSignals.FishTideRespSignal)
	@DecoratorUtil.protocolResponse(protocol.FishTideResp)
	static readonly PPFishTideResp = 1016;

	@DecoratorUtil.retrievAble(CommandCodes.PPRankReq)
	static readonly PPRankReq = 1017;

	@DecoratorUtil.retrievAble(CommandCodes.PPRankResp)
	@DecoratorUtil.protocolResponseSignal(protocolSignals.RankRespSignal)
	@DecoratorUtil.protocolResponse(protocol.RankResp)
	static readonly PPRankResp = 1018;

	@DecoratorUtil.retrievAble(CommandCodes.PPHuntingSettingReq)
	static readonly PPHuntingSettingReq = 1019;

	@DecoratorUtil.retrievAble(CommandCodes.PPHuntingSettingResp)
	@DecoratorUtil.protocolResponseSignal(protocolSignals.HuntingSettingRespSignal)
	@DecoratorUtil.protocolResponse(protocol.HuntingSettingResp)
	static readonly PPHuntingSettingResp = 1020
}