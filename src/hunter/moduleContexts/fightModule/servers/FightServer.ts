/**
 * 战斗服务
 */
import inject = riggerIOC.inject;
import * as protocol from '../../../protocol/protocols/protocols';
import * as protocolSignals from '../../../protocol/signals/signals';
import FishManager from '../../roomModule/models/FishManager';
import FreshFishSignal from '../signals/FreshFishSignal';
import BulletManager from '../../roomModule/models/BulletManager';
import NetworkChannelNames from '../../../definitions/NetworkChannelNames';
import CommandCodes from '../../../protocol/CommandCodes';
import FireBulletSignal from '../signals/FireBulletSignal';
import BulletDestorySignal from '../signals/BulletDestorySignal';
import AbstractFish from '../../../script/fish/fishScript/AbstractFish';
import FishInfoUpdateSignal from '../signals/FishInfoUpdateSignal';

export default class FightServer extends riggerIOC.Server {
    //鱼的刷新
    @inject(protocolSignals.MonRefreshRespSignal)
    private monRefreshRespSignal: protocolSignals.MonRefreshRespSignal;

    /**通知鱼刷新 */
    @inject(FreshFishSignal)
    private freshFishSignal: FreshFishSignal;

    //子弹发射返回
    @inject(protocolSignals.FireRespSignal)
    private fireRespSignal: protocolSignals.FireRespSignal;

    //子弹击中或出屏幕
    @inject(protocolSignals.ShellRespSignal)
    private shellRespSignal: protocolSignals.ShellRespSignal;

    /**通知子弹击中或出屏幕 */
    @inject(BulletDestorySignal)
    private bulletDestorySignal: BulletDestorySignal;

    /**通知发射子弹 */
    @inject(FireBulletSignal)
    private fireBulletSignal: FireBulletSignal;

    //鱼潮来袭
    @inject(protocolSignals.FishTideRespSignal)
    private fishTideRespSignal: protocolSignals.FishTideRespSignal;

    //怪物更新
    @inject(protocolSignals.MonUpdateRespSignal)
    private monUpdateRespSignal: protocolSignals.MonUpdateRespSignal;

    /**怪物更新信号 */
    @inject(FishInfoUpdateSignal)
    private fishInfoUpdateSignal: FishInfoUpdateSignal;

    constructor() {
        super();
        this.addProtocolListener();
    }

    dispose() {
        this.removeProtocolListener();
    }

    private addProtocolListener() {
        this.monRefreshRespSignal.on(this, this.onMonRefreshResp);
        this.fireRespSignal.on(this, this.onFireResp);
        this.shellRespSignal.on(this, this.onShellResp);
        this.fishTideRespSignal.on(this, this.onFishTideResp);
        this.monUpdateRespSignal.on(this, this.onMonUpdateResp);
    }

    private removeProtocolListener() {
        this.monRefreshRespSignal.off(this, this.onMonRefreshResp);
        this.fireRespSignal.off(this, this.onFireResp);
        this.shellRespSignal.off(this, this.onShellResp);
        this.fishTideRespSignal.off(this, this.onFishTideResp);
        this.monUpdateRespSignal.off(this, this.onMonUpdateResp);
    }

    /**
     * 子弹发射请求
     * @param fishId 
     * @param fireClickX 
     * @param fireClickY 
     */
    public fireReq(fishId: number, fireClickX: number, fireClickY: number) {
        let req: protocol.FireReq = new protocol.FireReq();
        req.monId = fishId;
        req.x = fireClickX;
        req.y = fireClickY;
        rigger.service.NetworkService.instance.send(NetworkChannelNames.GameChannel, CommandCodes.PPFireReq, req);
    }

    /**
     * 子弹击中或出屏幕请求
     * @param bulletId 
     * @param fishId 
     * @param fishTypeId 
     * @param releated 
     */
    public shellReq(bulletId: number, fishId: number, fishTypeId: number, releated: number[]) {
        let req: protocol.ShellReq = new protocol.ShellReq();
        req.shellId = bulletId;
        req.monId = fishId;
        req.monTypeId = fishTypeId;
        req.expandList = releated;
        rigger.service.NetworkService.instance.send(NetworkChannelNames.GameChannel, CommandCodes.PPShellReq, req);
        // console.log(`shellReq===${bulletId}`);
    }

    /**
     * 鱼的刷新
     * @param resp 
     */
    private onMonRefreshResp(resp: protocol.MonRefreshResp) {
        // console.log(`onMonRefreshResp====${resp.monList.length}`);
        // console.log(`refreshFish`);
        FishManager.instance.fishInfo = FishManager.instance.fishInfo.concat(resp.monList);

        //派发刷新鱼的信号
        this.freshFishSignal.dispatch(resp.monList);
    }

    /**
     * 鱼数据更新
     * @param resp 
     */
    private onMonUpdateResp(resp: protocol.MonUpdateResp) {
        let fishInfo = resp.monList;
        for(let i = 0; i < fishInfo.length; i++) {
            let id = fishInfo[i].monId;
            let oldFish = FishManager.instance.getFishInfoById(id);
            if(oldFish) {
                //更新本地存储数据
                oldFish = fishInfo[i];
                this.fishInfoUpdateSignal.dispatch(fishInfo);
            } 
            return;
        }
    }


    /**
     * 子弹发射返回
     * @param resp 
     */
    private onFireResp(resp: protocol.FireResp) {
        //存储子弹信息
        BulletManager.instance.bulletInfo = BulletManager.instance.bulletInfo.concat(resp.shellInfo);
        
        //派发发射子弹的信号
        this.fireBulletSignal.dispatch(resp.shellInfo);
    }

    /**
     * 子弹击中或出屏幕返回
     * @param resp 
     */
    private onShellResp(resp: protocol.ShellResp) {
        //派发子弹击中或出屏幕的信号
        this.bulletDestorySignal.dispatch(resp);
    }

    /**
     * 调整炮台等级
     * @param lv 炮台等级
     */
    public changeBatteryLvReq(lv: number) {
        let req: protocol.ChangeBatteryLvReq = new protocol.ChangeBatteryLvReq();
        req.batteryLv = lv;
        rigger.service.NetworkService.instance.send(NetworkChannelNames.GameChannel, CommandCodes.PPChangeBatteryLvReq, req);
    }

    /**
     * 自动捕鱼设置请求
     * @param key // 0:请求数据 1:自动捕鱼
     * @param value // key=0时，value=请求的key
     */
    public huntingSettingReq(key: number, value: string) {
        let req: protocol.HuntingSettingReq = new protocol.HuntingSettingReq();
        req.key = key;
        req.value = value;
        rigger.service.NetworkService.instance.send(NetworkChannelNames.GameChannel, CommandCodes.PPHuntingSettingReq, req);
    }

    /**
     * 鱼潮来袭
     */
    private onFishTideResp() {
        console.log(`鱼潮来袭!`);
        let fishList = FishManager.instance.fishCreatedIdList();
        for(let i = 0; i < fishList.length; i++) {
            let fish = FishManager.instance.getFishgObjectById(fishList[i]);
            let fishScript = fish.displayObject.getComponent(AbstractFish) as AbstractFish;
            let isOutOfWall = fishScript.checkOutOfWall();
            if(isOutOfWall) {
                FishManager.instance.deleteFishInfoById(fishScript.fishId);
                fishScript.recover();
                fishScript.reset();
            }
            else {
                fishScript.runUpTime = 1000;
                fishScript.coliderActive = false;
            }
        }
    }
}