import * as protobuf from 'protobufjs';

@protobuf.Type.d('LoginReq')
export class LoginReq extends protobuf.Message<LoginReq>{

		@protobuf.Field.d(1,"string","required")
		public token:string;

		@protobuf.Field.d(2,"uint32","optional")
		public gameId?:number;
}

@protobuf.Type.d('LoginResp')
export class LoginResp extends protobuf.Message<LoginResp>{

		@protobuf.Field.d(1,"uint32","required")
		public gameId:number;

		@protobuf.Field.d(2,"uint64","required")
		public balance:number;

		@protobuf.Field.d(3,"uint32","required")
		public type:number;

		@protobuf.Field.d(4,"uint32","required")
		public gm:number;

		@protobuf.Field.d(5,"uint32","required")
		public serverSec:number;

		@protobuf.Field.d(6,"uint32","required")
		public rate:number;
}

@protobuf.Type.d('ErrResp')
export class ErrResp extends protobuf.Message<ErrResp>{

		@protobuf.Field.d(1,"uint32","required")
		public cmd:number;

		@protobuf.Field.d(2,"uint32","optional")
		public errCode?:number;

		@protobuf.Field.d(3,"string","optional")
		public errMsg?:string;
}

@protobuf.Type.d('BeatHeartReq')
export class BeatHeartReq extends protobuf.Message<BeatHeartReq>{
}

@protobuf.Type.d('BeatHeartResp')
export class BeatHeartResp extends protobuf.Message<BeatHeartResp>{

		@protobuf.Field.d(1,"uint32","required")
		public serverSec:number;
}

@protobuf.Type.d('GmReq')
export class GmReq extends protobuf.Message<GmReq>{

		@protobuf.Field.d(1,"string","required")
		public gmStr:string;
}

@protobuf.Type.d('GmResp')
export class GmResp extends protobuf.Message<GmResp>{
}

@protobuf.Type.d('KickUserPush')
export class KickUserPush extends protobuf.Message<KickUserPush>{

		@protobuf.Field.d(1,"uint32","required")
		public code:number;
}

@protobuf.Type.d('GetBalanceReq')
export class GetBalanceReq extends protobuf.Message<GetBalanceReq>{
}

@protobuf.Type.d('GetBalanceResp')
export class GetBalanceResp extends protobuf.Message<GetBalanceResp>{

		@protobuf.Field.d(1,"uint64","required")
		public balance:number;
}

@protobuf.Type.d('BalancePush')
export class BalancePush extends protobuf.Message<BalancePush>{

		@protobuf.Field.d(1,"int64","required")
		public change:number;

		@protobuf.Field.d(2,"uint64","required")
		public balance:number;
}

@protobuf.Type.d('UserSettingReq')
export class UserSettingReq extends protobuf.Message<UserSettingReq>{

		@protobuf.Field.d(1,"uint32","required")
		public key:number;

		@protobuf.Field.d(2,"uint32","required")
		public value:number;
}

@protobuf.Type.d('ShareBalanceReq')
export class ShareBalanceReq extends protobuf.Message<ShareBalanceReq>{
}

@protobuf.Type.d('UserInfoReq')
export class UserInfoReq extends protobuf.Message<UserInfoReq>{
}

@protobuf.Type.d('UserInfoResp')
export class UserInfoResp extends protobuf.Message<UserInfoResp>{

		@protobuf.Field.d(1,"uint64","required")
		public userId:number;

		@protobuf.Field.d(2,"string","required")
		public userName:string;
}

@protobuf.Type.d('SystemPush')
export class SystemPush extends protobuf.Message<SystemPush>{

		@protobuf.Field.d(1,"uint32","required")
		public type:number;

		@protobuf.Field.d(2,"uint32","required")
		public priority:number;

		@protobuf.Field.d(3,"string","optional")
		public msg?:string;
}

@protobuf.Type.d('AnnouncementPush')
export class AnnouncementPush extends protobuf.Message<AnnouncementPush>{

		@protobuf.Field.d(1,"string","required")
		public module:string;

		@protobuf.Field.d(2,"msginfo","required")
		public msgInfo:Msginfo;
}

@protobuf.Type.d('HuntingInfoReq')
export class HuntingInfoReq extends protobuf.Message<HuntingInfoReq>{
}

@protobuf.Type.d('HuntingInfoResp')
export class HuntingInfoResp extends protobuf.Message<HuntingInfoResp>{

		@protobuf.Field.d(1,"uint32","required")
		public lv:number;

		@protobuf.Field.d(2,"uint32","required")
		public exp:number;
}

@protobuf.Type.d('HuntingEnterRoomReq')
export class HuntingEnterRoomReq extends protobuf.Message<HuntingEnterRoomReq>{

		@protobuf.Field.d(1,"uint32","required")
		public roomTypeId:number;
}

@protobuf.Type.d('HuntingEnterRoomOkReq')
export class HuntingEnterRoomOkReq extends protobuf.Message<HuntingEnterRoomOkReq>{
}

@protobuf.Type.d('HuntingEnterRoomResp')
export class HuntingEnterRoomResp extends protobuf.Message<HuntingEnterRoomResp>{

		@protobuf.Field.d(1,"playerInfo","required")
		public playerInfo:PlayerInfo;
}

@protobuf.Type.d('HuntingExitRoomReq')
export class HuntingExitRoomReq extends protobuf.Message<HuntingExitRoomReq>{
}

@protobuf.Type.d('HuntingExitRoomResp')
export class HuntingExitRoomResp extends protobuf.Message<HuntingExitRoomResp>{

		@protobuf.Field.d(1,"uint64","required")
		public userId:number;
}

@protobuf.Type.d('HuntingRoomInfoResp')
export class HuntingRoomInfoResp extends protobuf.Message<HuntingRoomInfoResp>{

		@protobuf.Field.d(1,"playerInfo","repeated")
		public playerList:PlayerInfo[];

		@protobuf.Field.d(2,"monInfo","repeated")
		public monList:MonInfo[];

		@protobuf.Field.d(3,"shellInfo","repeated")
		public shellList:ShellInfo[];
}

@protobuf.Type.d('MonRefreshResp')
export class MonRefreshResp extends protobuf.Message<MonRefreshResp>{

		@protobuf.Field.d(1,"monInfo","repeated")
		public monList:MonInfo[];
}

@protobuf.Type.d('ChangeBatteryLvReq')
export class ChangeBatteryLvReq extends protobuf.Message<ChangeBatteryLvReq>{

		@protobuf.Field.d(1,"uint32","required")
		public batteryLv:number;
}

@protobuf.Type.d('UpdatePlayerResp')
export class UpdatePlayerResp extends protobuf.Message<UpdatePlayerResp>{

		@protobuf.Field.d(1,"uint64","required")
		public userId:number;

		@protobuf.Field.d(2,"uint32","required")
		public key:number;

		@protobuf.Field.d(3,"uint64","required")
		public value:number;
}

@protobuf.Type.d('FireReq')
export class FireReq extends protobuf.Message<FireReq>{

		@protobuf.Field.d(1,"uint32","required")
		public monId:number;

		@protobuf.Field.d(2,"int32","required")
		public x:number;

		@protobuf.Field.d(3,"int32","required")
		public y:number;
}

@protobuf.Type.d('FireResp')
export class FireResp extends protobuf.Message<FireResp>{

		@protobuf.Field.d(1,"shellInfo","required")
		public shellInfo:ShellInfo;
}

@protobuf.Type.d('ShellReq')
export class ShellReq extends protobuf.Message<ShellReq>{

		@protobuf.Field.d(1,"uint32","required")
		public shellId:number;

		@protobuf.Field.d(2,"uint32","required")
		public monId:number;

		@protobuf.Field.d(3,"uint32","required")
		public monTypeId:number;

		@protobuf.Field.d(4,"uint32","repeated")
		public expandList:number[];
}

@protobuf.Type.d('ShellResp')
export class ShellResp extends protobuf.Message<ShellResp>{

		@protobuf.Field.d(1,"uint32","required")
		public shellId:number;

		@protobuf.Field.d(2,"uint32","required")
		public cost:number;

		@protobuf.Field.d(3,"uint32","required")
		public monId:number;

		@protobuf.Field.d(4,"uint32","repeated")
		public expandList:number[];

		@protobuf.Field.d(5,"uint32","required")
		public eventType:number;

		@protobuf.Field.d(6,"deadMon","repeated")
		public deadList:DeadMon[];

		@protobuf.Field.d(7,"uint32","required")
		public reward:number;
}

@protobuf.Type.d('MonUpdateResp')
export class MonUpdateResp extends protobuf.Message<MonUpdateResp>{

		@protobuf.Field.d(1,"monInfo","repeated")
		public monList:MonInfo[];
}

@protobuf.Type.d('FishTideResp')
export class FishTideResp extends protobuf.Message<FishTideResp>{
}

@protobuf.Type.d('RankReq')
export class RankReq extends protobuf.Message<RankReq>{

		@protobuf.Field.d(1,"uint32","required")
		public type:number;
}

@protobuf.Type.d('RankResp')
export class RankResp extends protobuf.Message<RankResp>{

		@protobuf.Field.d(1,"string","required")
		public myName:string;

		@protobuf.Field.d(2,"uint64","required")
		public myValue:number;

		@protobuf.Field.d(3,"userRank","repeated")
		public list:UserRank[];
}

@protobuf.Type.d('HuntingSettingReq')
export class HuntingSettingReq extends protobuf.Message<HuntingSettingReq>{

		@protobuf.Field.d(1,"uint32","required")
		public key:number;

		@protobuf.Field.d(2,"string","required")
		public value:string;
}

@protobuf.Type.d('HuntingSettingResp')
export class HuntingSettingResp extends protobuf.Message<HuntingSettingResp>{

		@protobuf.Field.d(1,"uint32","required")
		public key:number;

		@protobuf.Field.d(2,"string","required")
		public value:string;
}

@protobuf.Type.d('msginfo')
export class Msginfo extends protobuf.Message<Msginfo>{

		@protobuf.Field.d(1,"index","repeated")
		public indexList:Index[];

		@protobuf.Field.d(2,"playname","repeated")
		public playerNameList:Playname[];

		@protobuf.Field.d(3,"uint64","repeated")
		public money:number[];

		@protobuf.Field.d(4,"uint64","repeated")
		public useintList:number[];

		@protobuf.Field.d(5,"string","repeated")
		public usestrList:string[];

		@protobuf.Field.d(6,"item","repeated")
		public itemlist:Item[];
}

@protobuf.Type.d('index')
export class Index extends protobuf.Message<Index>{

		@protobuf.Field.d(1,"uint32","optional")
		public indexId?:number;

		@protobuf.Field.d(2,"uint32","optional")
		public indexV?:number;
}

@protobuf.Type.d('playname')
export class Playname extends protobuf.Message<Playname>{

		@protobuf.Field.d(1,"uint64","optional")
		public playerId?:number;

		@protobuf.Field.d(2,"string","optional")
		public playerName?:string;
}

@protobuf.Type.d('item')
export class Item extends protobuf.Message<Item>{

		@protobuf.Field.d(1,"uint32","optional")
		public itemId?:number;

		@protobuf.Field.d(2,"uint32","optional")
		public itemNum?:number;
}

@protobuf.Type.d('playerInfo')
export class PlayerInfo extends protobuf.Message<PlayerInfo>{

		@protobuf.Field.d(1,"uint64","required")
		public userId:number;

		@protobuf.Field.d(2,"uint64","required")
		public balance:number;

		@protobuf.Field.d(3,"string","required")
		public name:string;

		@protobuf.Field.d(4,"uint32","required")
		public pos:number;

		@protobuf.Field.d(5,"uint32","required")
		public batteryLv:number;
}

@protobuf.Type.d('monInfo')
export class MonInfo extends protobuf.Message<MonInfo>{

		@protobuf.Field.d(1,"uint32","required")
		public monId:number;

		@protobuf.Field.d(2,"uint32","required")
		public monTypeId:number;

		@protobuf.Field.d(3,"uint64","required")
		public createTime:number;

		@protobuf.Field.d(4,"frozen","repeated")
		public frozenList:Frozen[];

		@protobuf.Field.d(5,"uint32","required")
		public pathId:number;

		@protobuf.Field.d(6,"int32","required")
		public offsetX:number;

		@protobuf.Field.d(7,"int32","required")
		public offsetY:number;
}

@protobuf.Type.d('frozen')
export class Frozen extends protobuf.Message<Frozen>{

		@protobuf.Field.d(1,"uint64","required")
		public startTime:number;

		@protobuf.Field.d(2,"uint32","required")
		public time:number;
}

@protobuf.Type.d('shellInfo')
export class ShellInfo extends protobuf.Message<ShellInfo>{

		@protobuf.Field.d(1,"uint32","required")
		public shellId:number;

		@protobuf.Field.d(2,"uint64","required")
		public userId:number;

		@protobuf.Field.d(3,"uint32","required")
		public monId:number;

		@protobuf.Field.d(4,"int32","required")
		public x:number;

		@protobuf.Field.d(5,"int32","required")
		public y:number;

		@protobuf.Field.d(6,"uint64","required")
		public createTime:number;
}

@protobuf.Type.d('deadMon')
export class DeadMon extends protobuf.Message<DeadMon>{

		@protobuf.Field.d(1,"uint32","required")
		public monId:number;

		@protobuf.Field.d(2,"float","required")
		public rate:number;
}

@protobuf.Type.d('userRank')
export class UserRank extends protobuf.Message<UserRank>{

		@protobuf.Field.d(1,"uint32","required")
		public rank:number;

		@protobuf.Field.d(2,"uint64","required")
		public userId:number;

		@protobuf.Field.d(3,"uint32","required")
		public lv:number;

		@protobuf.Field.d(4,"string","required")
		public name:string;

		@protobuf.Field.d(5,"uint64","required")
		public value:number;
}