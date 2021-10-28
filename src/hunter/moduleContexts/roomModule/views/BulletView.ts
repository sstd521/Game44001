import FUIBulletView from "../../../fui/roomScene/FUIBulletView";
import * as protocol from '../../../protocol/protocols/protocols';
import BulletUtils from "../../../script/bullet/utils/BulletUtils";
import NormalBullet from "../../../script/bullet/bulletScript/NormalBullet";
import FishManager from "../models/FishManager";
import FUINormalFish from "../../../fui/roomScene/FUINormalFish";
import FUIBullet from "../../../fui/roomScene/FUIBullet";
import PlayerManager from "../models/PlayerManager";
import BulletManager from "../models/BulletManager";
import GoldAni from "../../../script/gold/GoldAni";
import GoldUtils from "../../../script/gold/GoldUtils";
import inject = riggerIOC.inject;
import PlayerModel from "../../playerModule/models/PlayerModel";
import AttactPatternChangedSignal from "../../fightModule/signals/AttackPatternChangedSignal";
import FightModel, { AttactPattern } from "../../fightModule/models/FightModel";
import FightServer from "../../fightModule/servers/fightServer";
import FUIBatteryView from "../../../fui/roomScene/FUIBatteryView";
import RoomModel from "../models/RoomModel";
import DataHuntingRoom from "../../../data/tpls/DataHuntingRoom";
import UIManager from "../../../manager/UIManager";
import AutoHuntingView from "./AutoHuntingView";
import AutoHuntTipsView from "./AutoHuntTipsView";
import VideoPlayerView, { VideoPlayerViewParams } from "../../../commonView/VideoPlayerView";
import { ScreenMode } from "../../../definitions/ScreenMode";
import { VideoType } from "../../../definitions/VideoType";
import { ShowGoldListView } from "./ShowGoldListView";
export default class BulletView extends FUIBulletView {
    @inject(PlayerModel)
    private playerModel: PlayerModel;

    @inject(FightServer)
    private fightServer: FightServer;

    @inject(FightModel)
    private fightModel: FightModel;

    @inject(RoomModel)
    private roomModel: RoomModel;

    /**战斗模式改变 */
    @inject(AttactPatternChangedSignal)
    private attacePatternChangedSignal: AttactPatternChangedSignal;

    /**玩家炮台ui集合 */
    private _playerUiArr: Object;
    constructor() {
        super();
    }

    protected constructFromXML(xml: any): void {
        super.constructFromXML(xml);
        this.addEventListener();
        this.initViewController();
        this.initAttackModelAni();
        this._playerUiArr = new Object();
    }

    dispose() {
        this.removeEventListener();
    }

    addEventListener() {
        this.m_lockBtn.on(Laya.Event.CLICK, this, this.onLockClick);
        this.m_autoFireBtn.on(Laya.Event.CLICK, this, this.onAutoFireClick);
        this.onClick(this, this.onBulletViewClick);
        Laya.stage.on(Laya.Event.KEY_DOWN, this, this.onKeyDown);
    }

    removeEventListener() {
        this.m_lockBtn.off(Laya.Event.CLICK, this, this.onLockClick);
        this.m_autoFireBtn.off(Laya.Event.CLICK, this, this.onAutoFireClick);
        this.offClick(this, this.onBulletViewClick);
        Laya.stage.off(Laya.Event.KEY_DOWN, this, this.onKeyDown);
    }

    /**
     * 初始化玩家入座,子弹
     */
    public init() {
        let playerInfo = PlayerManager.instance.playerInfo;
        for (let i = 0; i < playerInfo.length; i++) {
            this.showViewById(playerInfo[i].userId);
        }
        if(BulletManager.instance.bulletInfo) {
            for(let j = 0; j < BulletManager.instance.bulletInfo.length; j++) {
                this.addBullet(BulletManager.instance.bulletInfo[j]);
            }
        }
    }

    private attackModelVideoPlayer: VideoPlayerView;
    initAttackModelAni() {
        let params: VideoPlayerViewParams = new VideoPlayerViewParams();
        params.url = 'res/spine/attackModelAni/suoding.sk';
        params.screenMode = ScreenMode.None;
        params.type = VideoType.Skeleton;
        if(!this.attackModelVideoPlayer) {
            this.attackModelVideoPlayer = new VideoPlayerView();
            this.attackModelVideoPlayer.init(params);
            this.attackModelVideoPlayer.setScale(1, 1);
        }
        this.attackModelVideoPlayer.setXY(130, 130);
        this.attackModelVideoPlayer.play('1', true);
        this.m_attackModelAniView.addChild(this.attackModelVideoPlayer);
    }

    /**
     * 初始化座位
     */
    initViewController() {
        //left
        this.m_player1.m_c1.selectedIndex = 0;
        this.m_player3.m_c1.selectedIndex = 0;
        //right
        this.m_player2.m_c1.selectedIndex = 1;
        this.m_player4.m_c1.selectedIndex = 1;

        //bottom
        this.m_player1.m_gunView.m_c1.selectedIndex = 0;
        this.m_player2.m_gunView.m_c1.selectedIndex = 0;

        //top
        this.m_player3.m_gunView.m_c1.selectedIndex = 1;
        this.m_player4.m_gunView.m_c1.selectedIndex = 1;
        this.m_player3.m_gunView.m_gun.rotation = 180;
        this.m_player4.m_gunView.m_gun.rotation = 180;

        for (let i = 0; i < 4; i++) {
            this[`m_player${i + 1}`].m_c2.selectedIndex = 1;
            this[`m_player${i + 1}`].m_gunView.m_gun.m_c1.selectedIndex = 0;
            this[`m_player${i + 1}`].m_gunView.m_gun.m_gunLoader.playing = false;
            this[`m_player${i + 1}`].m_gunView.m_gun.m_gunLoader.frame = 1;
        }
    }

    /**玩家炮台ui集合 */
    get playerUiArr(): Object {
        return this._playerUiArr;
    }

    /**
     * 玩家入座
     * @param id 
     */
    showViewById(id: number) {
        let roomRate = Number(DataHuntingRoom.getData(this.roomModel.roomType).rate.toFixed(1));
        let playerInfo = PlayerManager.instance.findPlayerInfoById(id);
        let batteryLv = playerInfo.batteryLv;
        let pos = playerInfo.pos;
        //视图未固定
        // this._playerUiArr[pos] = this[`m_player${pos}`];

        //固定视图, 始终为从下至上的打击
        if([3, 4].indexOf(this.playerModel.playerSelfInfo.pos) != -1) {
            //上方,需翻转界面
            let arr = [3, 4, 1, 2];
            this._playerUiArr[pos] = this[`m_player${arr[pos - 1]}`];
        }
        else {
            //下方,正常入座
            this._playerUiArr[pos] = this[`m_player${pos}`];
        }

        let player: FUIBatteryView = this._playerUiArr[pos];
        player.data = 'invalid';
        player.m_c2.selectedIndex = 0;
        player.m_infoView.m_coinTxt.text = (playerInfo.balance / 100).toFixed(2) + '';
        if(player.m_infoView.m_coinTxt.text.indexOf(".") == -1) player.m_infoView.m_coinTxt.text += ".00";

        //name battery
        if (id == this.playerModel.playerSelfInfo.userId) {
            player.m_c3.selectedIndex = 0;
            player.m_infoView.m_nameTxt.text = playerInfo.name;
            (player.m_goldList as ShowGoldListView).init(playerInfo.pos);

            player.m_gunView.m_batteryLvAddBtn.visible = true;
            player.m_gunView.m_batteryLvSubBtn.visible = true;
            player.m_gunView.m_batteryLoader.url = `ui://roomScene/battery1`;
        }
        else {
            player.m_c3.selectedIndex = 1;
            player.m_infoView.m_nameTxt.text = playerInfo.name.substring(0, playerInfo.name.length - 4) + '****';

            player.m_gunView.m_batteryLvAddBtn.visible = false;
            player.m_gunView.m_batteryLvSubBtn.visible = false;
            player.m_gunView.m_batteryLoader.url = `ui://roomScene/battery2`;
        }

        //batteryLv
        let gunUiName = [0, 1, 2];
        let index;
        if(playerInfo.batteryLv < 10) index = 0;
        else if(playerInfo.batteryLv < 100) index = 1;
        else index = 2;
        player.m_gunView.m_gun.m_c1.selectedIndex = gunUiName[index];
        player.m_gunView.m_gunLvTxt.text = `${batteryLv * roomRate}`;
        if(player.m_gunView.m_gunLvTxt.text.indexOf('.') != -1) {
            player.m_gunView.m_gunLvTxt.text = `${(batteryLv * roomRate).toFixed(1)}`;
        }
    }

    /**
     * 隐藏座位
     * @param pos 
     */
    hideViewById(id: number) {
        let playerInfo = PlayerManager.instance.findPlayerInfoById(id);
        let pos = playerInfo.pos;
        let player: FUIBatteryView = this._playerUiArr[pos];
        
        player.m_c2.selectedIndex = 1;
        player.m_infoView.m_coinTxt.text = '';
        player.m_infoView.m_nameTxt.text = '';
        player.data = 'valid';
        this._playerUiArr[pos] = '';
        PlayerManager.instance.deletePlayerInfoById(id);
    }

    /**
     * 键盘事件
     * @param e 
     */
    private onKeyDown(e: Laya.Event) {
        let keyCode = e.keyCode;
        switch(keyCode) {
            case 87: //W 锁定攻击模式
                this.onLockClick();
                break;
            case 81: //Q 自动攻击模式
                this.onAutoFireClick();
                break;
            default:
                break;
        }
    }

    /**
     * 子弹界面点击处理,主要监听炮台等级调整按钮
     * @param e 
     */
    private onBulletViewClick(e: Laya.Event) {
        let target = e.target;
        if(!target.parent['$owner']) return;
        let name = target.parent['$owner'].name;
        if(!name) return;
        if (name.indexOf('batteryLv') != -1) {
            e.stopPropagation();
            if (name == 'batteryLvAddBtn') {
                this.changeBatteryLv('up');
            }
            else {
                this.changeBatteryLv('down');
            }
        }
    }

    /**
     * 改变炮台威力
     * @param v 'down'-减小, 'up'-增加
     */
    public changeBatteryLv(v: string) {
        let batteryList = DataHuntingRoom.getData(this.roomModel.roomType).batteryLvList;
        let nowLv = this.playerModel.playerSelfInfo.battery_lv;
        let index = batteryList.indexOf(nowLv);
        if(v == 'down') {
            index -= 1;
            if(index < 0) index = batteryList.length - 1;
            this.fightServer.changeBatteryLvReq(batteryList[index]);
        }
        else if(v == 'up') {
            index += 1;
            if(index > batteryList.length - 1) index = 0;
            this.fightServer.changeBatteryLvReq(batteryList[index]);
        }
    }

    /**
     * 键盘调整炮台角度
     * @param v 'left'-左, 'right'-右7
     */
    public changeBatteryAngle(v: string) {
        if(this.fightModel.attactPattern != AttactPattern.normal) return;
        let pos = this.playerModel.playerSelfInfo.pos;
        // let playerDirection: string = [3, 4].indexOf(pos) != -1 ? 'top' : 'bottom';
        let ratio: number;
        if(v == 'left') {
            // ratio = playerDirection == 'top' ? 1 : -1;
            ratio = -1;
        }
        if(v == 'right') {
            // ratio = playerDirection == 'top' ? -1 : 1;
            ratio = 1;
        }
        let ui = this._playerUiArr[pos] as FUIBatteryView;
        let angle: number;
        // if(playerDirection == 'top') {
        //     if(ui.m_gunView.m_gun.rotation < 0) ui.m_gunView.m_gun.rotation = 360 + ui.m_gunView.m_gun.rotation;   //方向键控制炮台角度区间[0,360],与发射炮弹时通过向量算的角度[0, 180]U[-180,0]，需转换
        //     angle = ui.m_gunView.m_gun.rotation + ratio * 10;
        //     if(angle <= 90) angle = 90;
        //     if(angle >= 270) angle = 270;
        // }
        // else {
        angle = ui.m_gunView.m_gun.rotation + ratio * 10;
        if(angle <= -90) angle = -90;
        if(angle >= 90) angle = 90;
        // }

        ui.m_gunView.m_gun.rotation = angle;
    }

    /**
     * 战斗模式改变
     */
    private onLockClick(e?: Laya.Event) {
        e && e.stopPropagation();
        if(this.fightModel.attactPattern == AttactPattern.lock) {
            this.attacePatternChangedSignal.dispatch(AttactPattern.normal);
        }
        else if(this.fightModel.attactPattern == AttactPattern.normal){
            //派发战斗模式改变为锁定状态
            this.attacePatternChangedSignal.dispatch(AttactPattern.lock);
        }
        else {
            //自动模式
            UIManager.instance.showWindow(AutoHuntTipsView, false, UIManager.instance.popupLayer);
        }
    }

    /**
     * 自动攻击
     */
    private onAutoFireClick(e?: Laya.Event) {
        e && e.stopPropagation();
        //自由攻击
        let arg: number;
        if(this.fightModel.attactPattern ==  AttactPattern.auto) arg = 1;
        else arg = 0;
        UIManager.instance.showWindow(AutoHuntingView, false, UIManager.instance.popupLayer, arg);
    }

    /**
     * 添加子弹
     * @param bulletInfo 
     */
    addBullet(bulletInfo: protocol.ShellInfo): FUIBullet {
        let bullet: FUIBullet = BulletUtils.getBullet(); //暂定,后续根据子弹类型获取对应实例
        let targetFish: fairygui.GComponent = null;
        if (bulletInfo.monId > 0) {
            //获取锁定鱼的组件
            let fish = FishManager.instance.getFishgObjectById(bulletInfo.monId);
            let fishInfo = FishManager.instance.getFishInfoById(bulletInfo.monId);
            if (!fishInfo) return;
            // if (fishInfo.monTypeId <= 9) { //读表
            targetFish = fish as FUINormalFish;
            // }
        }
        let playerInfo = PlayerManager.instance.findPlayerInfoById(bulletInfo.userId);
        let batteryLv = playerInfo.batteryLv;
        let pos = playerInfo.pos; //炮台编号
        let player: FUIBatteryView = this._playerUiArr[pos];
         
        let batteryPoint: Laya.Point = this.getAxisPoint(player.m_gunView.m_gun); // 暂定,后续根据炮台编号读取对应炮台
        let startPoint: Laya.Point = new Laya.Point(batteryPoint.x - bullet.width * bullet.pivotX, batteryPoint.y - bullet.height * bullet.pivotY); // 暂定,后续根据炮台编号读取对应炮台

        let fireClickPoint: Laya.Point = new Laya.Point(bulletInfo.x, bulletInfo.y);
        if(bulletInfo.userId != this.playerModel.playerSelfInfo.userId) {
            //普通射击模式,bulletInfo.x,y为正常坐标,未经过Y翻转. 固只需处理其他玩家的子弹
            fireClickPoint.y = 750 - fireClickPoint.y;
        }

        if (targetFish) {
            fireClickPoint = new Laya.Point(targetFish.x, targetFish.y);
            //由于鱼组件在真实座位[3,4]玩家的视图下经过了Y的翻转,固真实座位[3,4]玩家的锁定鱼的坐标均需要y的翻转
            // if([3, 4].indexOf(pos) != -1 && bulletInfo.userId != this.playerModel.playerSelfInfo.userId) {
            //     fireClickPoint.y = 750 - fireClickPoint.y;
            // }
        }

        
        let rotation: number = this.shootDirection(startPoint, fireClickPoint); //射击角度

        //炮台后坐力动画
        player.m_gunView.m_gun.rotation = rotation;//暂定,后续根据炮台编号读取炮台组件
        // player.m_gunView.m_t0.play();
        if(player.m_gunView.m_gun.m_gunLoader.content instanceof fairygui.display.MovieClip) {
            if(!player.m_gunView.m_gun.m_gunLoader.playing) {
                player.m_gunView.m_gun.m_gunLoader.playing = true;
                player.m_gunView.m_gun.m_gunLoader.content.setPlaySettings(0, -1, 1, -1, Laya.Handler.create(this, () => {
                    player.m_gunView.m_gun.m_gunLoader.frame = 1;
                    player.m_gunView.m_gun.m_gunLoader.playing = false;
                }));    
            }
        }

        let bulletUiName = [1, 2, 3];
        let index;
        if(playerInfo.batteryLv < 10) index = 0;
        else if(playerInfo.batteryLv < 100) index = 1;
        else index = 2;
        bullet.m_bulletLoader.url = `ui://roomScene/fish_bullet_${bulletUiName[index]}`;

        //子弹起始点,炮台炮口位置
        let bulletStartPoint: Laya.Point = new Laya.Point();
        let radin = 2 * Math.PI / 360 * rotation;
        bulletStartPoint.x = startPoint.x + Math.sin(radin) * 113;
        // let r: number = [1,2].indexOf(pos) != -1 ? 1 : -1; 
        let r: number = ['player1','player2'].indexOf(player.name) != -1 ? 1 : -1; 
        bulletStartPoint.y = startPoint.y - Math.abs(Math.cos(radin) * 113) * r;
        //初始化子弹脚本类
        (bullet.displayObject.getComponent(NormalBullet) as NormalBullet).init(bulletInfo.userId, bulletInfo.shellId, bulletInfo.createTime, bulletStartPoint, playerInfo.batteryLv, fireClickPoint, bulletInfo.monId);

        this.addChild(bullet);
        this.adjustBatteryZindex(bullet.sortingOrder);
        // console.log(`====fireBullet===${bulletInfo.shellId},,,fish==${bulletInfo.monId}`);
        // if(bulletInfo.userId == this.playerModel.playerSelfInfo.userId) {
            // console.log(`fireBullet==${bulletInfo.shellId},,,ownerId==${bulletInfo.userId}`);
        // }
        return bullet;
    }

    /**
     * 射击角度
     * @param startPoint 
     * @param fireClickPoint 
     */
    shootDirection(startPoint: Laya.Point, fireClickPoint: Laya.Point): number {
        let direction: Laya.Vector2 = new Laya.Vector2(fireClickPoint.x - startPoint.x, fireClickPoint.y - startPoint.y);
        let normalDirection: Laya.Vector2 = new Laya.Vector2(0, 0);
        Laya.Vector2.normalize(direction, normalDirection);
        let dot = Laya.Vector2.dot(new Laya.Vector2(0, -1), normalDirection); //单位向量点积即为余弦夹角
        let radian = Math.acos(dot);
        let rotation = 180 / Math.PI * radian;
        if (fireClickPoint.x < startPoint.x) {
            rotation = -rotation;
        }
        if (fireClickPoint.x == startPoint.x) rotation = 0;
        // console.log(`rotation==${rotation},,,fireClickPoint===(${fireClickPoint.x}, ${fireClickPoint.y})`)
        return rotation;
    }

    /**
     * 调整炮台z-Index
     * @param zIndex 
     */
    adjustBatteryZindex(zIndex: number) {
        this.m_player1.sortingOrder = zIndex + 1;
        this.m_player2.sortingOrder = this.m_player1.sortingOrder + 1;
        this.m_player3.sortingOrder = this.m_player2.sortingOrder + 1;
        this.m_player4.sortingOrder = this.m_player3.sortingOrder + 1;
        this.m_lockBtn.sortingOrder = this.m_player4.sortingOrder + 1;
        this.m_autoFireBtn.sortingOrder = this.m_lockBtn.sortingOrder + 1;
        this.m_lockTipLoader.sortingOrder = this.m_autoFireBtn.sortingOrder + 1;
        this.m_autoTipLoader.sortingOrder = this.m_lockTipLoader.sortingOrder + 1;
    }

    /**
     * 获取炮台轴心坐标并转化为子弹界面坐标系
     * @param gComponent 
     */
    getAxisPoint(gComponent: fairygui.GObject): Laya.Point {
        let point: Laya.Point = new Laya.Point();
        point.x = gComponent.x + gComponent.width * gComponent.pivotX;
        point.y = gComponent.y + gComponent.height * gComponent.pivotY;
        let globalPoint = gComponent.parent.localToGlobal(point.x, point.y);
        let localPoint = this.globalToLocal(globalPoint.x, globalPoint.y);
        return new Laya.Point(Math.floor(localPoint.x), Math.floor(localPoint.y));
    }
}