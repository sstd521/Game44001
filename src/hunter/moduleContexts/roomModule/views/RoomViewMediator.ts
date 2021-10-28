import inject = riggerIOC.inject;
import * as protocol from '../../../protocol/protocols/protocols';
import * as protocolSignals from '../../../protocol/signals/signals';
import RoomView from './RoomView';
import FreshFishSignal from '../../fightModule/signals/FreshFishSignal';
import FishManager from '../models/FishManager';
import FUIBullet from '../../../fui/roomScene/FUIBullet';
import BulletUtils from '../../../script/bullet/utils/BulletUtils';
import NormalBullet from '../../../script/bullet/bulletScript/NormalBullet';
import FightServer from '../../fightModule/servers/fightServer';
import FireBulletSignal from '../../fightModule/signals/FireBulletSignal';
import BulletDestorySignal from '../../fightModule/signals/BulletDestorySignal';
import FUINormalFish from '../../../fui/roomScene/FUINormalFish';
import BulletManager from '../models/BulletManager';
import AbstractFish from '../../../script/fish/fishScript/AbstractFish';
import NewPlayerSignal from '../signals/NewPlayerSignal';
import PlayerManager from '../models/PlayerManager';
import PlayerExitRoomSignal from '../signals/PlayerExitRoomSIgnal';
import RoomInfoInitSignal from '../signals/RoomInfoInitSignal';
import AttactPatternChangedSignal from '../../fightModule/signals/AttackPatternChangedSignal';
import FightModel, { AttactPattern } from '../../fightModule/models/FightModel';
import AbstractBullet from '../../../script/bullet/bulletScript/AbstractBullet';
import GoldAni from '../../../script/gold/GoldAni';
import BalanceUpdateSignal from '../signals/BalanceUpdateSignal';
import BatteryLvUpdateSignal from '../signals/BatteryLvUpdateSignal';
import FUIAimLineView from '../../../fui/roomScene/FUIAimLineView';
import PlayerModel from '../../playerModule/models/PlayerModel';
import BatteryUtils from '../../../script/battery/utils/BatteryUtils';
import FishInfoUpdateSignal from '../../fightModule/signals/FishInfoUpdateSignal';
import RoomTipsView from './RoomTipsView';
import { fishTypeEnum } from '../../../script/enum/FishEnum';
import FUIBatteryView from '../../../fui/roomScene/FUIBatteryView';
import RoomModel from '../models/RoomModel';
import DataHuntingRoom from '../../../data/tpls/DataHuntingRoom';
import AutoHuntingSignal from '../signals/AutoHuntingSignal';
import AutoHuntingFishHuntedSignal from '../signals/AutoHuntingFishHuntedSignal';
import DataMon from '../../../data/tpls/DataMon';
import UIManager from '../../../manager/UIManager';
import GuideView from './GuideView';
import Utils from '../../../utils/Utils';
import AutoHuntTipsView from './AutoHuntTipsView';
import FUIwinGoldNumView from '../../../fui/roomScene/FUIwinGoldNumView';
import FUIcatchAllLineView from '../../../fui/roomScene/FUIcatchAllLineView';
import CatchAllAniView from '../../../script/fish/fishScript/CatchAllAniView';
import CoinLackSignal from '../signals/CoinLackSignal';
import FUIFishDeadTipsView from '../../../fui/roomScene/FUIFishDeadTipsView';
import TipView from '../../briefModule/views/TipView';
import SpecialDeadTipsView from '../../../script/fish/fishScript/SpecialDeadTipsView';
import SoundController from '../../soundModule/SoundController';
import SoundEvents from '../../soundModule/SoundEvents';
import { ShowGoldListView } from './ShowGoldListView';
export default class RoomViewMediator extends riggerIOC.Mediator {
    /**视图界面*/
    @inject(RoomView)
    private roomView: RoomView;

    @inject(FightModel)
    private fightModel: FightModel;

    @inject(PlayerModel)
    private playerModel: PlayerModel;

    @inject(RoomModel)
    private roomModel: RoomModel;

    /**房间数据初始化完毕 */
    @inject(RoomInfoInitSignal)
    private roomInfoInitSignal: RoomInfoInitSignal;

    //鱼刷新的信号
    @inject(FreshFishSignal)
    private freshFishSignal: FreshFishSignal;

    @inject(FightServer)
    private fightServer: FightServer;

    /**子弹发射信号 */
    @inject(FireBulletSignal)
    private fireBulletSignal: FireBulletSignal;

    @inject(BulletDestorySignal)
    private bulletDestorySignal: BulletDestorySignal;

    /**鱼潮来袭 */
    @inject(protocolSignals.FishTideRespSignal)
    private fishTideRespSignal: protocolSignals.FishTideRespSignal;

    /**新玩家加入房间 */
    @inject(NewPlayerSignal)
    private newPlayerSignal: NewPlayerSignal;

    /**玩家退出房间 */
    @inject(PlayerExitRoomSignal)
    private playerExitRoomSignal: PlayerExitRoomSignal;

    /**战斗模式改变 */
    @inject(AttactPatternChangedSignal)
    private attactPatternChangedSignal: AttactPatternChangedSignal;

    /**玩家余额更新,带参数玩家id */
    @inject(BalanceUpdateSignal)
    private balanceUpdateSignal: BalanceUpdateSignal;

    /**玩家炮台等级更新,带参数玩家id */
    @inject(BatteryLvUpdateSignal)
    private batteryLvUpdateSignal: BatteryLvUpdateSignal;

    /**鱼数据更新 */
    @inject(FishInfoUpdateSignal)
    private fishInfoUpdateSignal: FishInfoUpdateSignal;

    /**自动捕鱼信息,带参数 鱼Id列表 */
    @inject(AutoHuntingSignal)
    private autoHuntingSignal: AutoHuntingSignal;

    /**自动捕鱼模式下,鱼被捕获的信号 */
    @inject(AutoHuntingFishHuntedSignal)
    private autoHuntingFishHuntedSignal: AutoHuntingFishHuntedSignal;

    /**余额不足 */
    @inject(CoinLackSignal)
    private coinLackSignal: CoinLackSignal;

    @inject(SoundController)
    private soundController: SoundController;

    constructor() {
        super();
    }

    onInit() {
        // this.onAttactPatternChanged(this.fightModel.attactPattern);
        Utils.IS_SHOW_GUID_VIEW && UIManager.instance.showWindow(GuideView, false, UIManager.instance.popupLayer); //引导界面
    }

    onShown() {
        this.addProtocolListener();
        this.addEventListener();
        this.attactPatternChangedSignal.dispatch(AttactPattern.normal);
        // this.onAttactPatternChanged(this.fightModel.attactPattern);
    }

    onHide() {
        this.removerProtocolListener();
        this.removeEventListener();
        let fish = FishManager.instance.fishgObjectGroup;
        let bullet = BulletManager.instance.bullethgObjectGroup;
        for(let i = 0; i < fish.length ; i++) {
            let fishScript = fish[i].displayObject.getComponent(AbstractFish) as AbstractFish;
            fishScript.recover();
        }
        
        for(let j = 0; j < bullet.length; j++) {
            let bulletScript = bullet[j].displayObject.getComponent(AbstractBullet) as AbstractBullet;
            bulletScript.recover();
        }
        this.roomView.contentPane.removeChildren();
        this.attactPatternChangedSignal.dispatch(AttactPattern.normal);
        Laya.timer.clearAll(this);
    }

    dispose() {
    }

    addProtocolListener() {
        this.roomInfoInitSignal.on(this, this.onRoomInit);
        this.freshFishSignal.on(this, this.onFreshFish);
        this.fireBulletSignal.on(this, this.onFireBullet);
        this.bulletDestorySignal.on(this, this.onBulletDestory);
        this.fishTideRespSignal.on(this, this.onFishTideResp);
        this.newPlayerSignal.on(this, this.onNewPlayerIntoRoom);
        this.playerExitRoomSignal.on(this, this.onPlayerExitRoom);
        this.attactPatternChangedSignal.on(this, this.onAttactPatternChanged);
        this.balanceUpdateSignal.on(this, this.onBalanceUpdate);
        this.batteryLvUpdateSignal.on(this, this.onBatteryLvUpdate);
        this.fishInfoUpdateSignal.on(this, this.onFishInfoUpdate);
        this.autoHuntingSignal.on(this, this.onAutoHunting);
        this.coinLackSignal.on(this, this.onCoinLack);
    }

    removerProtocolListener() {
        this.roomInfoInitSignal.off(this, this.onRoomInit);
        this.freshFishSignal.off(this, this.onFreshFish);
        this.fireBulletSignal.off(this, this.onFireBullet);
        this.bulletDestorySignal.off(this, this.onBulletDestory);
        this.fishTideRespSignal.off(this, this.onFishTideResp);
        this.newPlayerSignal.off(this, this.onNewPlayerIntoRoom);
        this.playerExitRoomSignal.off(this, this.onPlayerExitRoom);
        this.attactPatternChangedSignal.off(this, this.onAttactPatternChanged);
        this.balanceUpdateSignal.off(this, this.onBalanceUpdate);
        this.batteryLvUpdateSignal.off(this, this.onBatteryLvUpdate);
        this.fishInfoUpdateSignal.off(this, this.onFishInfoUpdate);
        this.autoHuntingSignal.off(this, this.onAutoHunting);
        this.coinLackSignal.off(this, this.onCoinLack);
    }

    addEventListener() {
        this.roomView.contentPane.on(Laya.Event.MOUSE_DOWN, this, this.onMouseDown);

        window.onkeydown = (e) => {
            if(e.keyCode == 9) {
                if (e.preventDefault) {e.preventDefault(); }
                else { e.returnValue = false; }
            }
        };
        Laya.stage.on(Laya.Event.KEY_DOWN, this, this.onKeyDown);
        Laya.stage.on(Laya.Event.KEY_UP, this, this.onKeyUp);
    }

    removeEventListener() {
        this.roomView.contentPane.off(Laya.Event.MOUSE_DOWN, this, this.onMouseDown);
        Laya.stage.off(Laya.Event.KEY_DOWN, this, this.onKeyDown);
        Laya.stage.off(Laya.Event.KEY_UP, this, this.onKeyUp);
    }

    /**
     * 房间数据初始化完毕,房间初始化
     */
    private onRoomInit() {
        //初始化入座
        this.roomView.bulletView.init();

        this.roomView.fishView.init();
        // if([3 ,4].indexOf(this.playerModel.playerSelfInfo.pos) != -1) {
        //     this.roomView.fishView.scaleY = -Math.abs(this.roomView.fishView.scaleY);
        // }
        // else {
        //     this.roomView.fishView.scaleY = Math.abs(this.roomView.fishView.scaleY);
        // }
    }

    /**
     * 鱼刷新
     * @param fishList 
     */
    private onFreshFish(fishList: protocol.MonInfo[]) {
        for (let i = 0; i < fishList.length; i++) {
            let fishId = fishList[i].monId;
            if (FishManager.instance.fishCreatedIdList().indexOf(fishId) == -1) {
                let fishGObject = this.roomView.fishView.addFish(fishList[i]);
                fishGObject.data = fishId;
                FishManager.instance.fishgObjectGroup.push(fishGObject);
                this.playFishEnterAni(fishList[i].monTypeId);
            }
        }
        // console.log(`fishCreatedIdList` + FishManager.instance.fishCreatedIdList().length);
    }

    /**
     * 鱼数据更新
     * @param fishInfo 
     */
    private onFishInfoUpdate(fishInfo: protocol.MonInfo[]) {
        for(let i = 0; i < fishInfo.length; i++) {
            let id = fishInfo[i].monId;
            let fish = FishManager.instance.getFishgObjectById(id);
            if(fish) {
                let fishScript = fish.displayObject.getComponent(AbstractFish) as AbstractFish;
                fishScript.init(fishInfo[i]);
                if(fishInfo[i].frozenList) {
                    if(!this.roomView.fishView.isFrozen) {
                        let frozenTime = fishInfo[i].frozenList[0].time;
                        this.roomView.fishView.playFullScreenFrozenAni(frozenTime); //冰冻动画
                    }                    
                }
            }
        }
    }

    /**播放鱼的入场动画 */
    private playFishEnterAni(TypeId: number) {
        switch(TypeId) {
            case 25: /**黄金鲨 */
                this.roomView.roomTipsView.playFishInAni(1);
                this.soundController.dispatch(SoundEvents.FISH_IN);
                break;
            case 26: /**美人鱼 */
                this.roomView.roomTipsView.playFishInAni(2);
                this.soundController.dispatch(SoundEvents.FISH_IN);
                break;
            case 100: /**海盗船 */
                this.roomView.roomTipsView.playFishInAni(0);
                break;
            default:
                break;
        }
    }

    /**
     * 余额不足
     */
    private onCoinLack() {
        if(this.lastLockFishId) {
            let lastFish = FishManager.instance.getFishgObjectById(this.lastLockFishId);
            if(lastFish) {
               let lastFishScript = lastFish.displayObject.getComponent(AbstractFish) as AbstractFish;
               lastFishScript.isLock = false;
            }
        }
        this.aimLineView && BatteryUtils.recoverAimLineView(this.aimLineView);
        this.aimLineView = null;
        Laya.timer.clearAll(this);
        this.attactPatternChangedSignal.dispatch(AttactPattern.normal);
        this.roomView.roomTipsView.playTips(1);
    }

    /**
     * 战斗模式改变
     * @param pattern 
     */
    private onAttactPatternChanged(pattern: AttactPattern) {
        if (pattern == AttactPattern.lock) {
            //可穿透子弹界面
            this.roomView.bulletView.opaque = false;
            this.roomView.fishView.touchable = true;
            this.roomView.bulletView.m_autoTipLoader.url = `ui://roomScene/auto`;
            this.roomView.bulletView.m_lockTipLoader.url = `ui://roomScene/unLock`;
            this.autoHuntingCurrentTargetFishId = null;
            this.roomView.bulletView.m_attackModelControl.selectedIndex = 0;
        }
        else if(pattern == AttactPattern.normal){
            //不可穿透子弹界面
            this.roomView.bulletView.opaque = true;
            this.roomView.fishView.touchable = false;
            this.roomView.bulletView.m_autoTipLoader.url = `ui://roomScene/auto`;
            this.roomView.bulletView.m_lockTipLoader.url = `ui://roomScene/lock`;
            this.autoHuntingCurrentTargetFishId = null;
            this.roomView.bulletView.m_attackModelControl.selectedIndex = 2;
        }
        else if(pattern == AttactPattern.auto) {
            this.roomView.bulletView.m_autoTipLoader.url = `ui://roomScene/unAuto`;
            this.roomView.bulletView.m_lockTipLoader.url = `ui://roomScene/lock`;
            this.roomView.bulletView.m_attackModelControl.selectedIndex = 1;
        }
    }

    /**键盘按下事件 */
    private onKeyDown(e: Laya.Event) {
        // console.log(`${Laya.stage.focus}`);
        let keyCode = e.keyCode;
        switch(keyCode) {
            case 37: //Left 炮台方向
                this.roomView.bulletView.changeBatteryAngle('left');
                break;
            case 38: //Up 炮台等级
                this.roomView.bulletView.changeBatteryLv('up');
                break;
            case 39: //Right 炮台方向
                this.roomView.bulletView.changeBatteryAngle('right');
                break;      
            case 40: //Down 炮台等级
                this.roomView.bulletView.changeBatteryLv('down');
                break;
            case 32: //空格 普通模式开火
                this.spaceFire();
                break;
            case 9: //Tab
                this.tabForSearchFish();
                break
            default:
                break;
        }
        if(Laya.KeyBoardManager.hasKeyDown(32) && keyCode != 32) {
            !this.isLoop && Laya.timer.loop(100, this, this.spaceFire);
            this.isLoop = true;
        }
    }

    private isLoop: boolean = false;
    private onKeyUp(e: Laya.Event) {
        let keyCode = e.keyCode;
        if(keyCode == 32) {
            Laya.timer.clear(this, this.spaceFire);
            this.isLoop = false;
        } 
    }

    private tabForSearchFish() {
        if(this.fightModel.attactPattern != AttactPattern.lock) return;
        let fishInfo = FishManager.instance.fishInfo;
        let index = Math.floor(Math.random() * fishInfo.length);
        if(!fishInfo[index]) {
            this.tabForSearchFish();
            return;
        } 
        let fish = FishManager.instance.getFishgObjectById(fishInfo[index].monId);
        if(!fish) {
            this.tabForSearchFish();
            return;
        } 
        let fishScript = fish.displayObject.getComponent(AbstractFish) as AbstractFish;
        if(fishScript.checkOutOfWall()) {
            this.tabForSearchFish();
            return; //还在屏幕外
        }
        this.lockFireModel(fishInfo[index].monId);
    }

    /**
     * 空格键开火
     */
    private spaceFire() {
        if(this.fightModel.attactPattern == AttactPattern.auto) {
            UIManager.instance.showWindow(AutoHuntTipsView, false, UIManager.instance.popupLayer);
        }
        if(this.fightModel.attactPattern != AttactPattern.normal) {
            Laya.timer.clear(this, this.spaceFire);
            return;
        }
        let bullet = BulletUtils.getBullet() as FUIBullet;
        let pos = this.playerModel.playerSelfInfo.pos;
        let ui = this.roomView.bulletView.playerUiArr[pos] as FUIBatteryView;
        let currentAngle = ui.m_gunView.m_gun.rotation;
        let radin = 2 * Math.PI / 360 * currentAngle;
        let batteryPoint = this.roomView.bulletView.getAxisPoint(ui.m_gunView.m_gun);
        let startPoint: Laya.Point = new Laya.Point(batteryPoint.x - bullet.width * bullet.pivotX, batteryPoint.y - bullet.height * bullet.pivotY); // 暂定,后续根据炮台编号读取对应炮台
        let firePoint: Laya.Point = new Laya.Point();
        firePoint.x = startPoint.x + Math.sin(radin) * 200; //炮高度为113, 选取200是为了形成炮轴心与炮口的正方向
        // let r: number = [3, 4].indexOf(pos) != -1 ? -1 : 1;
        let r: number = 1;
        firePoint.y = startPoint.y - Math.abs(Math.cos(radin) * 200) * r;
        this.fightServer.fireReq(0, firePoint.x, firePoint.y);
        BulletUtils.recoverBullet(bullet);
    }           

    private fireClickX: number;
    private fireClickY: number;
    /**
     * 按下屏幕
     * @param e 
     */
    private onMouseDown(e: Laya.Event) {
        if (e.target[`$owner`].name.toLowerCase().indexOf('btn') != -1) return;
        if (e.target.parent[`$owner`].name.toLowerCase().indexOf('btn') != -1) return;
        if (e.target.parent[`$owner`].name == 'menuView') return;

        switch(this.fightModel.attactPattern) {
            case AttactPattern.lock: /**锁定攻击 */
                if (e.target[`$owner`].parent) {
                    let fishId = e.target[`$owner`].parent.data;
                    if (fishId) {
                        this.lockFireModel(fishId);
                    }
                }
                break; 
            case AttactPattern.normal: /**自由攻击 */
                this.roomView.contentPane.on(Laya.Event.MOUSE_MOVE, this, this.onMouseMove);
                this.roomView.contentPane.on(Laya.Event.MOUSE_UP, this, this.onMouseUp);

                //防止mouseMove获取的xy为 可触摸按钮内的坐标系.
                this.roomView.contentPane.m_content.m_bulletView.m_lockBtn.touchable = false;
                this.roomView.contentPane.m_content.m_bulletView.m_autoFireBtn.touchable = false;
                this.roomView.contentPane.m_content.m_tipsView.m_menuView.m_menuBtn.touchable = false;

                this.normalFireModel(new Laya.Point(e.target.mouseX, e.target.mouseY));
                break;
            case AttactPattern.auto: /**自动攻击 */
                    UIManager.instance.showWindow(AutoHuntTipsView, false, UIManager.instance.popupLayer);
                break;
            default:
                break;
        }
    }

    private onMouseMove(e: Laya.Event) {
        this.fireClickX = e.target.mouseX;
        this.fireClickY = e.target.mouseY;
    }

    private onMouseUp(e: Laya.Event) {
        if (this.fightModel.attactPattern == AttactPattern.normal) {
            Laya.timer.clearAll(this);
        }
        this.roomView.contentPane.m_content.m_bulletView.m_lockBtn.touchable = true;
        this.roomView.contentPane.m_content.m_bulletView.m_autoFireBtn.touchable = true;
        this.roomView.contentPane.m_content.m_tipsView.m_menuView.m_menuBtn.touchable = true;
        this.roomView.contentPane.off(Laya.Event.MOUSE_MOVE, this, this.onMouseMove);
        this.roomView.contentPane.off(Laya.Event.MOUSE_UP, this, this.onMouseUp);
    }

    /**
     * 自由攻击模式
     * @param targetPoint 
     */
    private normalFireModel(targetPoint: Laya.Point) {
        this.fireClickX = targetPoint.x;
        this.fireClickY = targetPoint.y;

        this.fixFireClick();
        //请求发射子弹
        this.fightServer.fireReq(0, this.fireClickX, this.fireClickY);
        Laya.timer.loop(100, this, () => {
            this.fixFireClick();
            this.fightServer.fireReq(0, this.fireClickX, this.fireClickY);
        });
    }

    /**
     * 发射点处于炮口和底座之间,应延长发射点至炮口正方向
     */
    private fixFireClick() {
        let bullet = BulletUtils.getBullet() as FUIBullet;
        let pos: number = this.playerModel.playerSelfInfo.pos;
        let batteryPoint: Laya.Point = this.roomView.bulletView.getAxisPoint(this.roomView.bulletView.playerUiArr[pos].m_gunView.m_gun);
        let startPoint: Laya.Point = new Laya.Point(batteryPoint.x - bullet.width * bullet.pivotX, 750); // 暂定,后续根据炮台编号读取对应炮台
        let direction: Laya.Vector2 = new Laya.Vector2(this.fireClickX - startPoint.x, this.fireClickY - startPoint.y);
        BulletUtils.recoverBullet(bullet);
        
        if(Laya.Vector2.scalarLength(direction) < 200) {
            let normalDirection: Laya.Vector2 = new Laya.Vector2(0, 0);
            Laya.Vector2.normalize(direction, normalDirection);
            let dot = Laya.Vector2.dot(new Laya.Vector2(0, -1), normalDirection);
            let radian = Math.acos(dot);
            //炮台长度113
            let rx = this.fireClickX > startPoint.x ? 1 : -1;
            this.fireClickX += Math.sin(radian) * 250 * rx;
            this.fireClickY -= 200;
        }
    }

    /**上一次锁定的Id */
    private lastLockFishId: number;
    /**
     * 锁定攻击模式
     * @param fishId 
     */
    private lockFireModel(fishId: number) {
        Laya.timer.clearAll(this);
        if(this.lastLockFishId != fishId) {
            let lastFish = FishManager.instance.getFishgObjectById(this.lastLockFishId);
            if(lastFish) {
               let lastFishScript = lastFish.displayObject.getComponent(AbstractFish) as AbstractFish;
               lastFishScript.isLock = false;
            }
            this.lastLockFishId = fishId;
        }
        let fish = FishManager.instance.getFishgObjectById(fishId);
        if(!fish) return;
        let fishScript = fish.displayObject.getComponent(AbstractFish) as AbstractFish;
        fishScript.isLock = true; //添加瞄准标识
        this.addAimLine(fishId); //添加瞄准线
        this.fightServer.fireReq(fishId, 0, 0);
        Laya.timer.loop(100, this, () => {
            let fish = FishManager.instance.getFishgObjectById(fishId);
            if (!fish) {
                this.aimLineView && BatteryUtils.recoverAimLineView(this.aimLineView);
                this.aimLineView = null;
                Laya.timer.clearAll(this);
            }
            else {
                let fishScript = fish.displayObject.getComponent(AbstractFish) as AbstractFish;
                if(this.fightModel.attactPattern == AttactPattern.normal) {
                    fishScript.isLock = false;
                    this.aimLineView && BatteryUtils.recoverAimLineView(this.aimLineView);
                    this.aimLineView = null;
                    Laya.timer.clearAll(this);
                    return;
                }
                this.fightServer.fireReq(fishId, 0, 0);
            }
        });
    }

    private aimLineView: FUIAimLineView = null;
    /**
     * 添加瞄准线
     * @param fishId 
     */
    private addAimLine(fishId: number) {
        let fish = FishManager.instance.getFishgObjectById(fishId);
        if(this.aimLineView) {
            BatteryUtils.recoverAimLineView(this.aimLineView);
            this.aimLineView = null;
        }
        this.aimLineView = BatteryUtils.getAimLineView();
        let pos = this.playerModel.playerSelfInfo.pos;
        let ui = this.roomView.bulletView.playerUiArr[pos].m_gunView.m_gun;
        let gunPoint = this.roomView.bulletView.getAxisPoint(ui);
        let aimStartPoint: Laya.Point = new Laya.Point(gunPoint.x, gunPoint.y);
        this.roomView.bulletView.addChild(this.aimLineView); //添加ui
        this.aimLineView.x = aimStartPoint.x;
        this.aimLineView.y = aimStartPoint.y;
        Laya.timer.frameLoop(1, this, () => {
            if(!this.aimLineView) return;
            if(!fish) {
                BatteryUtils.recoverAimLineView(this.aimLineView);
                this.aimLineView = null;
                return;
            }
            let targetPoint = this.roomView.bulletView.getAxisPoint(fish[`m_aimSignLoader`]);
            let rotation = this.roomView.bulletView.shootDirection(aimStartPoint, targetPoint);
            let distance = aimStartPoint.distance(targetPoint.x, targetPoint.y);
            distance = Math.floor(distance/62) * 62;  // 62为瞄准线上 两个点的间距加上点的宽度,防止出现不完整的点
            this.aimLineView.m_mask.width = distance;
            this.aimLineView.rotation = -90 + rotation;
        });
    }

    //自动捕鱼模式下,当前锁定目标
    private autoHuntingCurrentTargetFishId: number;
    /**
     * 自动捕鱼
     * @param fishTypeList 待捕鱼的类型列表
     */
    private onAutoHunting(fishTypeList: number[]) {
        if(this.autoHuntingCurrentTargetFishId) {
            let fish = FishManager.instance.getFishgObjectById(this.autoHuntingCurrentTargetFishId);
            if(fish){
                let script = fish.displayObject.getComponent(AbstractFish) as AbstractFish;
                if(fishTypeList.indexOf(DataMon.getData(script.fishTypeId).fishType) != -1) return;
            } 
        }
        // console.log(fishIdList);
        this.fightModel.attactPattern = AttactPattern.auto;
        let fishInfo = FishManager.instance.fishInfo;
        let flag = false;
        for(let i = 0; i < fishTypeList.length; i++) {
            for(let j = 0; j < fishInfo.length; j++) {
                if(fishTypeList[i] == DataMon.getData(fishInfo[j].monTypeId).fishType) {
                    let fish = FishManager.instance.getFishgObjectById(fishInfo[j].monId);
                    if(!fish) continue;
                    let fishScript = fish.displayObject.getComponent(AbstractFish) as AbstractFish;
                    if(fishScript.checkOutOfWall()) continue; //还在屏幕外
                    this.lockFireModel(fishInfo[j].monId);
                    this.autoHuntingCurrentTargetFishId = fishInfo[j].monId;
                    flag = true;
                    break;
                }
            }
            if(flag) break;
        }
    }

    /**
     * 新玩家进入房间
     * @param id 
     */
    private onNewPlayerIntoRoom(id: number) {
        this.roomView.bulletView.showViewById(id);
    }

    /**
     * 玩家退出房间
     * @param id 
     */
    private onPlayerExitRoom(id: number) {
        this.roomView.bulletView.hideViewById(id);
    }

    /**
     * 玩家余额更新, 此处只更新消耗, 余额增加需在飘完金币动画后更新
     * @param id 
     */
    private onBalanceUpdate([id, change]) {
        let playerInfo = PlayerManager.instance.findPlayerInfoById(id);
        if(!playerInfo) return;
        let pos = playerInfo.pos;
        // if(change < 0) {
        this.roomView.bulletView.playerUiArr[pos].m_infoView.m_coinTxt.text = (playerInfo.balance / 100).toFixed(2) + '';
        if(this.roomView.bulletView.playerUiArr[pos].m_infoView.m_coinTxt.text.indexOf(".") == -1) {
            this.roomView.bulletView.playerUiArr[pos].m_infoView.m_coinTxt.text += ".00";
        }
        // }
    }

    /**
     * 玩家炮台等级更新
     * @param id 
     */
    private onBatteryLvUpdate(id: number) {
        let playerInfo = PlayerManager.instance.findPlayerInfoById(id);
        if(!playerInfo) return;
        let pos = playerInfo.pos;
        let playerUi = this.roomView.bulletView.playerUiArr[pos] as FUIBatteryView;
        let rate = Number(DataHuntingRoom.getData(this.roomModel.roomType).rate.toFixed(1));
        playerUi.m_gunView.m_gunLvTxt.text = `${rate * playerInfo.batteryLv}`;
        if(playerUi.m_gunView.m_gunLvTxt.text.indexOf('.') != -1) {
            playerUi.m_gunView.m_gunLvTxt.text = `${(rate * playerInfo.batteryLv).toFixed(1)}`;
        }
        let gunUiName = [0, 1, 2];
        let index;
        if(playerInfo.batteryLv < 10) index = 0;
        else if(playerInfo.batteryLv < 100) index = 1;
        else index = 2;
        playerUi.m_gunView.m_gun.m_c1.selectedIndex = gunUiName[index];
        // 暂定 修改炮台等级
    }

    /**
     * 收到发射子弹的信号
     * @param bulletInfo 
     */
    private onFireBullet(bulletInfo: protocol.ShellInfo) {
        let bullet = this.roomView.bulletView.addBullet(bulletInfo);
        if (!bullet) {
            if(bulletInfo.userId == this.playerModel.playerSelfInfo.userId) {
                this.fightServer.shellReq(bulletInfo.shellId, 0, 0, []); //锁定模式下,鱼已被移除,该子弹无须发射,上报服务器该子弹无效
            }
            return;
        }
        this.soundController.dispatch(SoundEvents.BULLET);
        // console.log(`fishid===${bulletInfo.monId},,,bulletId===${bulletInfo.shellId}`);
        bullet.data = bulletInfo.shellId;
        BulletManager.instance.bullethgObjectGroup.push(bullet);
    }

    /**
     * 收到子弹出屏幕或击中的信号
     * @param info 
     */
    private onBulletDestory(info: protocol.ShellResp) {
        // console.log(`====recoverBullet====${info.shellId}`);
        let bulletId: number = info.shellId;
        let fishId: number = info.monId;
        let deadFishList: protocol.DeadMon[] = info.deadList;
        let coin: number = info.reward;
        let bulletInfo = BulletManager.instance.getBulletInfoById(bulletId);
        let ownerId = bulletInfo.userId;
        let bulletCost = info.cost;

        //回收子弹
        BulletManager.instance.deleteBulletById(bulletId);  //删除存储的子弹信息

        if(deadFishList.length > 0) {
            deadFishList.forEach((deadFish) => {
                let fish = FishManager.instance.getFishgObjectById(deadFish.monId);
                if(fish) {
                    let fishScript = fish.displayObject.getComponent(AbstractFish) as AbstractFish;
                    fishScript.ratio = deadFish.rate;
                }
            }); 
        }
        if (fishId != 0) {
            let fishInfo = FishManager.instance.getFishInfoById(fishId);
            if(!fishInfo) return;
            let fishData = DataMon.getData(fishInfo.monTypeId);
            //击中鱼
            this.fishEvent(info.eventType); //触发事件类型
            if(info.eventType == fishTypeEnum.boss) {
                //海盗船
                let bossFish = FishManager.instance.getFishgObjectById(fishId);
                if(bossFish) {
                    let bossFishScript = bossFish.displayObject.getComponent(AbstractFish) as AbstractFish;
                    bossFishScript.ratio = info.reward / bulletCost;
                    this.goldMoneyAni(bossFish, bossFishScript, bulletCost, ownerId, false);
                }
            }

            if(deadFishList.length > 0) {
                if(this.fightModel.attactPattern == AttactPattern.auto) {
                    if(ownerId == this.playerModel.playerSelfInfo.userId) {
                        this.autoHuntingFishHuntedSignal.dispatch([fishId, info.reward]); //自动模式下,派发鱼被捕获的信号
                    }
                }
                
                //19-金白鲨 20-美人鱼 24-大三元 25-大四喜 26-奖金鱼 27-一网打尽 死亡播放特殊提示
                if(fishData && [19, 20, 24, 25, 26, 27].indexOf(fishData.fishType) != -1) {
                    this.specialDeadTips(fishId, deadFishList, coin, bulletCost, ownerId, fishData.fishType);
                    return;
                }

                //一网打尽,特殊处理
                if(info.eventType == fishTypeEnum.catchAll) {
                    this.catchAll(fishId, deadFishList, bulletCost, ownerId);
                    return;
                }
    
                //除去一网打尽之外的情景
                let delayTime: number = 0;
                if(info.eventType == fishTypeEnum.boom) {
                    delayTime = 500;  //全屏炸弹延时播放鱼死亡,飞金币动画
                }
                Laya.timer.once(delayTime, this, () => {
                    for (let i = 0; i < deadFishList.length; i++) {
                        //鱼死亡
                        let fish = FishManager.instance.getFishgObjectById(deadFishList[i].monId);
                        if(!fish) continue;
                        let fishScript = fish.displayObject.getComponent(AbstractFish) as AbstractFish;
                        this.goldMoneyAni(fish, fishScript, bulletCost, ownerId);
                    }
                });
            }
        }
    }

    /**
     * 一网打尽闪电链效果
     * @param triggerFish 
     * @param deadFishList 
     */
    private catchAll(triggerFish: number, deadFishList: protocol.DeadMon[], bulletCost: number, ownerId: number) {
        let pos = PlayerManager.instance.findPlayerInfoById(ownerId).pos;
        let mainFish = FishManager.instance.getFishgObjectById(triggerFish) as FUINormalFish;
        // let mainFishPoint: Laya.Point = new Laya.Point(mainFish.x + 25, mainFish.y + 25);
        let mainFishScript = mainFish.displayObject.getComponent(AbstractFish) as AbstractFish;
        let mainFishPoint: Laya.Point = mainFishScript.getCenterPoint();
        mainFishScript.beforeDeadInCatchAll(); //静止主鱼
        let otherFish: FUINormalFish[] = [];
        let otherFishScript: AbstractFish[] = [];
        for(let i = 0; i < deadFishList.length; i++) {
            if(deadFishList[i].monId != triggerFish) {
                let fish = FishManager.instance.getFishgObjectById(deadFishList[i].monId) as FUINormalFish;
                if(fish) {
                    let fishScript = fish.displayObject.getComponent(AbstractFish) as AbstractFish;
                    otherFish.push(fish);
                    if(fishScript.checkOutOfWall()) {
                        fishScript.runUpTime = 1000;
                        Laya.timer.callLater(this, () => {
                            fishScript.beforeDeadInCatchAll(); //静止待连接的鱼
                        });
                    }
                    else {
                        fishScript.beforeDeadInCatchAll(); //静止待连接的鱼
                    }
                    otherFishScript.push(fishScript);
                }
            }
        }

        //没有其他需要连接的鱼,直接播放主鱼的死亡
        if(otherFish.length == 0) {
            this.goldMoneyAni(mainFish, mainFishScript, bulletCost, ownerId);
            return;
        }

        //闪电连接其他同种类的鱼
        let lightAniIndex: number = 0;
        for(let j = 0; j < otherFish.length; j++) {
            let catchAllLineAniView = FUIcatchAllLineView.createInstance() as CatchAllAniView;
            // let fishPoint: Laya.Point = new Laya.Point(otherFish[j].x + 25, otherFish[j].y + 25);
            let fishPoint: Laya.Point = otherFishScript[j].getCenterPoint();
            let distance = mainFishPoint.distance(fishPoint.x, fishPoint.y);

            //闪电链动画播完完成的回调
            let cb: Laya.Handler = Laya.Handler.create(this, () => {
                otherFish[j].m_specalAniLoader.url = `ui://roomScene/catchAllCircleAni`;
                catchAllLineAniView.dispose();
                lightAniIndex += 1;
                //播放鱼死亡,飘金币、奖金动画
                if(lightAniIndex >= otherFish.length) {
                    otherFish.push(mainFish);
                    otherFishScript.push(mainFishScript);
                    for(let k = 0; k < otherFish.length; k++) {
                        this.goldMoneyAni(otherFish[k], otherFishScript[k], bulletCost, ownerId);
                    }
                }
            });
            this.roomView.fishView.addChildAt(catchAllLineAniView, 0);
            catchAllLineAniView.x = mainFishPoint.x;
            catchAllLineAniView.y = mainFishPoint.y;
            let rotation = this.roomView.bulletView.shootDirection(mainFishPoint, fishPoint);
            catchAllLineAniView.rotation = -90 + rotation;
            console.log(catchAllLineAniView.x, catchAllLineAniView.y, rotation)
            //播放闪电特效
            catchAllLineAniView.play(100, distance, cb);
        }
    }

    /**
     * 部分鱼死后的提示
     * @param fishType 鱼类型（目前只处理 19-金白鲨 20-美人鱼 24-大三元 25-大四喜 26-奖金鱼 27-一网打尽）
     */
    private specialDeadTips(fishId: number, deadFishList: protocol.DeadMon[], coin: number, bulletCost: number, ownerId: number, fishType: number) {
        let fish = FishManager.instance.getFishgObjectById(fishId);
        let fishScript = fish.displayObject.getComponent(AbstractFish) as AbstractFish;
        let fishPoint = fishScript.getCenterPoint();
        let tipsView = FUIFishDeadTipsView.createInstance() as SpecialDeadTipsView;
        let ctrIdx: number;
        let fishUrl: string = "ui://roomScene/";
        switch(fishType) {
            case 19: //金白鲨
                ctrIdx = 0;
                fishUrl += "brdr_ycjm_icon_jinsha";
                break;
            case 20: //美人鱼
                ctrIdx = 0;
                fishUrl += "brdr_ycjm_icon_meirenyu";
                break;
            case 24: //大三元
                ctrIdx = 1;
                fishUrl += "brdr_ycjm_text_dsy";
                break;
            case 25: //大四喜
                ctrIdx = 1;
                fishUrl += "brdr_ycjm_text_dsx";
                break;
            case 26: //奖金鱼
                ctrIdx = 2;
                fishUrl += "brdr_ycjm_text_jjy";
                break;
            case 27: //一网打尽
                ctrIdx = 2;
                fishUrl += "brdr_ycjm_text_ywdj";
                tipsView.init(ctrIdx, fishUrl, coin);
                this.roomView.fishView.addChild(tipsView);
                tipsView.setXY(fishPoint.x - 80, fishPoint.y - 100);
                let cb: Laya.Handler = Laya.Handler.create(this, () => {
                    tipsView.dispose();
                });
                tipsView.play(cb);
                this.catchAll(fishId, deadFishList, bulletCost, ownerId);
                return;
            default :
                break;
        }
        this.soundController.dispatch(SoundEvents.FISH_DEAD);
        tipsView.init(ctrIdx, fishUrl, coin);
        this.roomView.fishView.addChild(tipsView);
        tipsView.setXY(fishPoint.x - 80, fishPoint.y - 100);
        let cb: Laya.Handler = Laya.Handler.create(this, () => {
            tipsView.dispose();
        });
        this.goldMoneyAni(fish, fishScript, bulletCost, ownerId);
        tipsView.play(cb);
    }

    /**
     * 炮弹返回触发事件类型
     * @param type 
     */
    private fishEvent(type: number) {
        switch(type) {
            case fishTypeEnum.boom:
                console.log(`trigger fullScreenBoom`);
                this.roomView.fishView.playFullScreenBoomAni();
                break;
            case fishTypeEnum.frozen:
                console.log(`trigger frozen`);
                this.soundController.dispatch(SoundEvents.ICE_FISH);
                break;
            case fishTypeEnum.boss:
                console.log(`trigger boss`);
                break;
            case fishTypeEnum.catchAll:
                console.log(`trigger catchAll`);
                break;
            case fishTypeEnum.jackPot:
                console.log(`trigger jackPot`);
                break;
            case fishTypeEnum.triStar:
                console.log(`trigger triStar`);
                break;
            case fishTypeEnum.four:
                console.log(`trigger four`);
                break;
            default:
                break;
        }
    }

    /**
     * 飘金币、奖金、回收鱼
     * @param fishScript 
     * @param bulletCost 炮弹消耗
     * @param ownerId 
     * @param recover 
     */
    private goldMoneyAni(fish: fairygui.GObject, fishScript: AbstractFish, bulletCost: number, ownerId: number, recover: boolean = true) {
        let selfGoldAni = 'ui://5xl6v9kdvv7ubm';
        let othersGoldAni = 'ui://5xl6v9kdrhqcbn';
        let playerInfo = PlayerManager.instance.findPlayerInfoById(ownerId);
        let pos = playerInfo.pos;
                if([25, 26].indexOf(fishScript.fishTypeId) != -1) {
                    //黄金鲨,美人鱼播放全屏金币动画
                    this.roomView.fishView.playFullScreenGoldAni(); 
                }
                //飘金币
                let goldAni = new GoldAni();
                let playerView = this.roomView.bulletView.playerUiArr[pos] as FUIBatteryView;
                let index = Number(playerView.name.charAt(playerView.name.length - 1));
                this.roomView.bulletView.m_c1.selectedIndex = index - 1;
                let playerPos: Laya.Point = new Laya.Point(this.roomView.bulletView.m_goldPosition.x, this.roomView.bulletView.m_goldPosition.y);
                let fishPos: Laya.Point = new Laya.Point(fish.x, fish.y);
                if(ownerId == this.playerModel.playerSelfInfo.userId) {
                    let fishRatio: number = fishScript.ratio;
                    if(fishRatio) {
                        let fishReward: number = fishRatio * bulletCost / 100;
                        (playerView.m_goldList as ShowGoldListView).pushGoldItems(fishReward, bulletCost / 100);
                    }
                    goldAni.setData(fishPos, playerPos, 8, selfGoldAni, this.roomView.roomTipsView);
                }
                else {
                    goldAni.setData(fishPos, playerPos, 8, othersGoldAni, this.roomView.roomTipsView);
                }
                this.soundController.dispatch(SoundEvents.COIN_JUMP);
                let cb = Laya.Handler.create(this, () => {
                    this.soundController.dispatch(SoundEvents.COIN_IN);
                });
                goldAni.play(cb);
                

                //飘奖金数字
                // let fishRatio: number = DataMon.getData(fishScript.fishTypeId).rate[0];
                let fishRatio: number = fishScript.ratio;
                if(fishRatio) {
                    let fishReward: number = fishRatio * bulletCost / 100;
                    this.rewardMoneyAni(fishReward, ownerId, fishPos);
                }
                // console.log(`deadFish===` + deadFishList[i]);
                // console.log(`deleteFish===${deadFishList[i]}`);
                this.playFishDeadSound(fishScript.fishTypeId)
                if(recover) {
                    FishManager.instance.deleteFishInfoById(fishScript.fishId); //删除该鱼对应的数据信息
                    fishScript.recover();
                    fishScript.reset();
                }
    }

    /**鱼死飘奖金 */
    private rewardMoneyAni(fishReward: number, ownerId: number, fishPos: Laya.Point) {
        let winGoldTxtView: FUIwinGoldNumView = FUIwinGoldNumView.createInstance();
        if(ownerId == this.playerModel.playerSelfInfo.userId) {
            winGoldTxtView.m_winGoldTxt.font = `ui://0lwk28v8n86c78b`;
        }
        else {
            winGoldTxtView.m_winGoldTxt.font = `ui://0lwk28v8n86c78c`;
        }
        let pointIdx: number = fishReward.toString().indexOf('.');
        if(pointIdx != -1) {
            let pointLen: number = fishReward.toString().substring(pointIdx + 1, fishReward.toString().length).length;
            if(pointLen > 3) {
                fishReward = Number(fishReward.toFixed(3));
            }
        }
        winGoldTxtView.m_winGoldTxt.text = `+${fishReward}`;
        winGoldTxtView.x = fishPos.x - winGoldTxtView.width / 2;
        winGoldTxtView.y = fishPos.y + winGoldTxtView.height / 2;
        this.roomView.roomTipsView.addChild(winGoldTxtView);
        winGoldTxtView.m_t1.play(Laya.Handler.create(this, () => {
            winGoldTxtView.removeFromParent();
            winGoldTxtView.dispose();
            winGoldTxtView = null;
        }), 1);
    }

    /**
     * 播放鱼死的音效
     * @param fishTypeId 
     */
    private playFishDeadSound(fishTypeId: number) {
        switch(fishTypeId) {
            case fishTypeEnum.boom:
                this.soundController.dispatch(SoundEvents.BOOM_FISH);
                break;
            case fishTypeEnum.catchAll:
                this.soundController.dispatch(SoundEvents.CATCH_ALL);
                break;
            default: 
                break;
        }
    }

    /**
     * 鱼潮来袭
     */
    private onFishTideResp() {
        this.aimLineView && BatteryUtils.recoverAimLineView(this.aimLineView);
        this.aimLineView = null;
        Laya.timer.clearAll(this); //取消自动发射子弹
        this.roomView.roomTipsView.playFishBoomAni();
        this.soundController.dispatch(SoundEvents.FISH_TIDE);
    }
}