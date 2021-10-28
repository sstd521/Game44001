import UIWindow from "../../../utils/UIWindow";
import FUIAutoHuntingView from "../../../fui/roomScene/FUIAutoHuntingView";
import FUIAutoFireFishItem from "../../../fui/roomScene/FUIAutoFireFishItem";
import UIManager from "../../../manager/UIManager";
import DataMon from "../../../data/tpls/DataMon";
import inject = riggerIOC.inject;
import * as protocol from '../../../protocol/protocols/protocols';
import * as protocolSignals from '../../../protocol/signals/signals';
import FightServer from "../../fightModule/servers/fightServer";
import AutoHuntingSignal from "../signals/AutoHuntingSignal";
import AttactPatternChangedSignal from "../../fightModule/signals/AttackPatternChangedSignal";
import { AttactPattern } from "../../fightModule/models/FightModel";
import AutoHuntingFishHuntedSignal from "../signals/AutoHuntingFishHuntedSignal";
import FishManager from "../models/FishManager";
import FUIhuntingFishItem from "../../../fui/roomScene/FUIhuntingFishItem";
import { fishTypeEnum } from "../../../script/enum/FishEnum";
import ShowTipsSignal from "../signals/ShowTipsSignal";
import FUITipsView from "../../../fui/roomScene/FUITipsView";
export default class AutoHuntingView extends UIWindow<FUIAutoHuntingView> {

    @inject(FightServer)
    private fightServer: FightServer;

    /**自动捕鱼设置返回 */
    @inject(protocolSignals.HuntingSettingRespSignal)
    private huntingSettingRespSignal: protocolSignals.HuntingSettingRespSignal;

    /**自动捕鱼信号,带参数 鱼id列表 */
    @inject(AutoHuntingSignal)
    private autoHuntingSignal: AutoHuntingSignal;

    /**战斗模式改变 */
    @inject(AttactPatternChangedSignal)
    private attactPatternChangedSignal: AttactPatternChangedSignal;

    /**自动捕鱼模式下,鱼被捕获的消息 */
    @inject(AutoHuntingFishHuntedSignal)
    private autoHuntingFishHuntedSignal: AutoHuntingFishHuntedSignal;

    /**展示提示 */
    @inject(ShowTipsSignal)
    private showTipsSignal: ShowTipsSignal;

    constructor() {
        super();
        this.needMask = true;
        this.isCache = true;
    }

    static getUrl(): string {
        return FUIAutoHuntingView.URL;
    }

    onInit() {
        super.onInit();
        this.fishList = this.fishTypeList();
        this.contentPane.m_fishList.itemRenderer = Laya.Handler.create(this, this.renderFishListItem, null, false);
        this.contentPane.m_fishList.numItems = this.fishList.length;
        this.autoHuntingFishHuntedSignal.on(this, this.onFishHunted);
        this.attactPatternChangedSignal.on(this, this.onAttactPatternChanged);
    }

    onShown() {
        super.onShown();
        this.addEventListener();
        this.addProtocolListener();
        Laya.KeyBoardManager.enabled = false;
        this.loadConfig();
    }

    onHide() {
        super.onHide();
        this.removerEventListener();
        this.removerProtocolListener();
        Laya.KeyBoardManager.enabled = true;
    }

    dispose() {
        super.dispose();
        this.autoHuntingFishHuntedSignal.off(this, this.onFishHunted);
        this.attactPatternChangedSignal.off(this, this.onAttactPatternChanged);
    }

    private fishList: number[] = [];
    /**
     * 鱼列表渲染回调
     * @param index 
     * @param item 
     */
    renderFishListItem(index: number, item: FUIAutoFireFishItem) {
        let fishData = DataMon.getData(this.fishList[index]);
        if([-1].indexOf(fishData.uiId) != -1) fishData.uiId = 1;
        let ui: string = `ui://briefUI/static_fish_${fishData.uiId}`;
        item.m_fishRatioTxt.font = 'ui://75q2l4mud7af729';
        let rate = fishData.rate[0] == fishData.rate[1] ? fishData.rate[0] : `${fishData.rate[0]}-${fishData.rate[1]}`;
        if([22, 23, 24, 25, 26, 27].indexOf(fishData.fishType) != -1) {
            item.m_nameLoader.visible = true;
            item.m_fishRatioTxt.visible = false;
            item.m_nameLoader.url = `ui://briefUI/fish_${fishData.fishType}_name`;
        }
        else {
            item.m_nameLoader.visible = true;
            item.m_fishRatioTxt.visible = true;
        }
        item.m_fishLoader.setScale(1, 1);
        switch(fishData.buffType) {
            case fishTypeEnum.triStar:
                ui = 'ui://briefUI/static_triStar';
                break;
            case fishTypeEnum.four:
                ui = 'ui://briefUI/static_four';
                break;
            case fishTypeEnum.jackPot:
                ui = 'ui://briefUI/static_jackPot';
                break;
            case fishTypeEnum.catchAll:
                ui = `ui://briefUI/static_catchAll`;
                item.m_fishLoader.setScale(2, 2);
                break;
            case fishTypeEnum.frozen:
                break;
            case fishTypeEnum.boom:
                break;
            default:
                break;
        }
        item.m_fishLoader.url = ui;
        item.m_fishRatioTxt.text = `${rate}`;
        item.m_c1.selectedIndex = 0;
        item.data = fishData.id;
    }

    layout() {
        let autoHuntGroup: riggerLayout.Group = new riggerLayout.Group(this.contentPane);
        autoHuntGroup.horizontalCenter = 0;
        autoHuntGroup.verticalCenter = 0;
        autoHuntGroup.width = riggerLayout.LayoutSpec.create(1, this.contentPane.width / this.contentPane.height, "80%");
        autoHuntGroup.height = riggerLayout.LayoutSpec.create(this.contentPane.width / this.contentPane.height, -1, "70%");
        RiggerLayout.layer.addChild(autoHuntGroup);
    }

    removeLayout() {
        RiggerLayout.layer.remove(this.contentPane);
    }

    funEx(index: number = 0) {
        this.contentPane.m_c1.selectedIndex = index;
    }

    addEventListener() {
        this.contentPane.m_closeBtn.on(Laya.Event.CLICK, this, this.closeWindow);
        this.contentPane.m_fishList.on(fairygui.Events.CLICK_ITEM, this, this.onSelectFishItem);
        this.contentPane.on(Laya.Event.CLICK, this, this.onViewClick);
    }

    removerEventListener() {
        this.contentPane.m_closeBtn.off(Laya.Event.CLICK, this, this.closeWindow);
        this.contentPane.m_fishList.off(fairygui.Events.CLICK_ITEM, this, this.onSelectFishItem);
        this.contentPane.off(Laya.Event.CLICK, this, this.onViewClick);
    }

    addProtocolListener() {
        this.huntingSettingRespSignal.on(this, this.onHuntingSettingResp);
        // this.autoHuntingFishHuntedSignal.on(this, this.onFishHunted);
    }

    removerProtocolListener() {
        this.huntingSettingRespSignal.off(this, this.onHuntingSettingResp);
        // this.autoHuntingFishHuntedSignal.off(this, this.onFishHunted);
    }

    /**
     * 自动捕鱼配置返回
     * @param resp 
     */
    private onHuntingSettingResp(resp: protocol.HuntingSettingResp) {
        if(resp.key == 1) {
            this.selectFishId = [];
            this.selectConfig = resp.value;
            let config: string[] = `${this.selectConfig}`.split('');
            for(let i = 0; i < config.length; i++) {
                let item: FUIAutoFireFishItem = this.contentPane.m_fishList.getChildAt(i) as FUIAutoFireFishItem;
                item.m_c1.selectedIndex = Number(config[i]);
                if(Number(config[i]) == 1) this.selectFishId.push(Number(item.data));
            } 
        }
    }

    private onViewClick(e: Laya.Event) {
        let target = e.target[`$owner`];
        if(!target || !target.parent) return;
        let name = target.parent.name;
        switch(name) {
            case 'selectAllBtn':
                this.selectAll();
                break;
            case 'reselectBtn':
                this.reselectAll();
                break;
            case 'loadConfigBtn':
                this.loadConfig();
                break;
            case 'startHuntBtn':
                this.startHunt();
                break;
            case 'changeAutoBtn':
                this.changeAutoConfig();
                break;
            case 'cancelAutoBtn':
                this.cancelAutoHunting();
                break;
            default:
                break; 
        }
    }

    public closeWindow() {
        // this.selectFishId = []; //清空选择鱼的id列表
        UIManager.instance.hideWindow(this);
    }

    /**
     * 返回鱼的种类列表(已去重)
     */
    private fishTypeList(): number[] {
        let fishIndexList = DataMon.getIds();
        let fishType: number[] = [];
        let fishTypeList: number[] = [];
        for(let i = 0; i < fishIndexList.length; i++) {
            let fishData = DataMon.getData(fishIndexList[i]);
            if(fishType.indexOf(fishData.fishType) == -1) {
                fishTypeList.push(fishIndexList[i]);
                fishType.push(fishData.fishType);
            }
        }
        return fishTypeList;
    }

    //已选择的鱼Id
    private selectFishId: number[] = [];
    private selectConfig: string = '';
    /**
     * 自动捕鱼配置选择
     * @param item 
     */
    private onSelectFishItem(item: FUIAutoFireFishItem) {
        item.m_c1.selectedIndex = 1 - item.m_c1.selectedIndex;
        if(this.selectFishId.indexOf(Number(item.data)) == -1) {
            this.selectFishId.push(Number(item.data));
        }
        else {
            for(let i = 0; i < this.selectFishId.length; i++) {
                if(this.selectFishId[i] == Number(item.data)) {
                    this.selectFishId.splice(i, 1);
                    return;
                }
            }
        }
    }

    /**
     * 选择全部
     */
    private selectAll() {
        this.selectFishId = [];
        let length = this.contentPane.m_fishList.numChildren;
        for(let i = 0; i < length; i++) {
            let item: FUIAutoFireFishItem = this.contentPane.m_fishList.getChildAt(i) as FUIAutoFireFishItem;
            item.m_c1.selectedIndex = 1;
            this.selectFishId.push(Number(item.data));
        }
    }

    /**
     * 重新选择
     */
    private reselectAll() {
        this.selectFishId = [];
        let length = this.contentPane.m_fishList.numChildren;
        for(let i = 0; i < length; i++) {
            let item: FUIAutoFireFishItem = this.contentPane.m_fishList.getChildAt(i) as FUIAutoFireFishItem;
            item.m_c1.selectedIndex = 0;
        }
    }

    /**
     * 加载上次配置
     */
    private loadConfig() {
        this.fightServer.huntingSettingReq(0, '1');
    }

    /**
     * 每个item认为0-未选择 1-选择,组合为00001类的十进制数
     */
    private createConfig(): string {
        let selectConfig = '';
        let length = this.contentPane.m_fishList.numChildren;
        for(let i = 0; i < length; i++) {
            let item: FUIAutoFireFishItem = this.contentPane.m_fishList.getChildAt(i) as FUIAutoFireFishItem;
            if(item.m_c1.selectedIndex == 1) {
                selectConfig += '1';
            }
            else {
                selectConfig += '0';
            }
        }
        return selectConfig;
    }

    /**
     * 更改自动
     */
    private changeAutoConfig() {
        this.contentPane.m_c1.selectedIndex = 0;
    }

    /**
     * 取消自动
     */
    private cancelAutoHunting() {
        this.attactPatternChangedSignal.dispatch(AttactPattern.normal);
        this.closeWindow();
    }

    private onAttactPatternChanged(pattern: AttactPattern) {
        if(pattern == AttactPattern.normal) {
            Laya.timer.clearAll(this);
        }
    }

    private fishHuntedList: {dataId: number, fishType: number, num: number, totalCoin: number}[] = [];
    /**
     * 鱼被捕获的信号
     * @param param0 
     */
    private onFishHunted([fishId, coin]) {
        let fishInfo = FishManager.instance.getFishInfoById(fishId);
        let fishType = DataMon.getData(fishInfo.monTypeId).fishType;
        let flag = false;
        for(let i = 0; i < this.fishHuntedList.length; i++) {
            if(this.fishHuntedList[i].fishType == fishType) {
                this.fishHuntedList[i].num += 1;
                this.fishHuntedList[i].totalCoin += coin;
                flag = true;
            }
        }
        if(!flag) {
            this.fishHuntedList.push({dataId: DataMon.getData(fishInfo.monTypeId).id, fishType: fishType, num: 1, totalCoin: coin});
        }
        this.fishHuntedList = this.fishHuntedList.sort(this.sortFishHunted);
        this.updateFishHuntedList();
    }

    /**
     * 按照鱼类型 升序
     * @param fishA 
     * @param fishB 
     */
    sortFishHunted(fishA: {dataId: number, fishType: number, num: number, totalCoin: number}, fishB: {dataId: number, fishType: number, num: number, totalCoin: number}) {
        return fishA.fishType - fishB.fishType;
    }

    /**
     * 更新在自动捕鱼模式下,已捕获鱼的列表
     */
    updateFishHuntedList() {
        this.contentPane.m_huntingList.removeChildren(0, -1, true);
        for(let i = 0; i < this.fishHuntedList.length; i++) {
            let huntingFishItem: FUIhuntingFishItem = FUIhuntingFishItem.createInstance();

            let dataId = this.fishHuntedList[i].dataId;
            let fishData = DataMon.getData(dataId);
            let rate = fishData.rate[0];
            if([-1].indexOf(fishData.uiId) != -1) fishData.uiId = 1; //无素材替代
            let ui = `ui://briefUI/static_fish_${fishData.uiId}`;
            let buffType = fishData.buffType;
            huntingFishItem.m_pricesTxt.font = 'ui://0lwk28v8n8sw75w';
            huntingFishItem.m_nameLoader.url = '';
            if([22, 23, 24, 25, 26, 27].indexOf(fishData.fishType) != -1) {
                huntingFishItem.m_nameLoader.visible = true;
                huntingFishItem.m_pricesTxt.visible = false;
                huntingFishItem.m_nameLoader.url = `ui://briefUI/fish_${fishData.fishType}_name`;
            }
            else {
                huntingFishItem.m_nameLoader.visible = true;
                huntingFishItem.m_pricesTxt.visible = true;
            }
            switch(buffType) {
                case fishTypeEnum.triStar:
                    ui = 'ui://briefUI/static_triStar';
                    break;
                case fishTypeEnum.four:
                    ui = 'ui://briefUI/static_four';
                    break;
                case fishTypeEnum.jackPot:
                    ui = 'ui://roomScene/jackPot';
                    break;
                case fishTypeEnum.catchAll:
                    ui = `ui://roomScene/catchAll`;
                    break;
                case fishTypeEnum.frozen:
                    break;
                case fishTypeEnum.boom:
                    break;
                default:
                    break;
            }
            huntingFishItem.m_fishLoader.url = ui;
            huntingFishItem.m_countTxt.text = this.fishHuntedList[i].num + '';
            huntingFishItem.m_pricesTxt.text = rate + '';
            huntingFishItem.m_totalWinTxt.text = this.fishHuntedList[i].totalCoin / 100 + '';
            this.contentPane.m_huntingList.addChild(huntingFishItem);
        }
    }

    /**
     * 开始自动捕鱼
     */
    private startHunt() {
        if(!this.selectFishId || this.selectFishId.length <= 0) {
            // this.closeWindow();
            let tipsView = FUITipsView.createInstance();
            tipsView.m_tipsLoader.url = `ui://roomScene/tips${3}`;
            tipsView.setXY(850, 480);
            this.addChild(tipsView);
            tipsView.m_t0.play(Laya.Handler.create(this, () => {
                tipsView && tipsView.removeFromParent();
            }), 1);
            return;
        }
        this.selectConfig = '';
        this.selectConfig = this.createConfig();
        this.fightServer.huntingSettingReq(1, this.selectConfig); //服务器存储配置
        this.selectFishId = this.selectFishId.sort(this.fishWorthSort); //排序

        let selectFishType = this.idToType(); //转换鱼Id为鱼类型,唯一标识

        this.attactPatternChangedSignal.dispatch(AttactPattern.auto); //战斗模式改为自动捕鱼
        Laya.timer.clearAll(this);
        Laya.timer.loop(24, this, () => {
            this.autoHuntingSignal.dispatch(selectFishType); //派发开始自动捕鱼的信号
        });
        this.closeWindow();
    }

    /**
     * 按照鱼的价值降序
     * @param fishAId 
     * @param fishBId 
     */
    fishWorthSort(fishAId: number, fishBId: number) {
        let fishARate = DataMon.getData(fishAId).rate[0];
        let fishBRate = DataMon.getData(fishBId).rate[0];
        return fishBRate - fishARate;
    }  

    /**
     * 所选择鱼id列表转为 鱼类型列表
     */
    idToType(): number[] {
        let fishType: number[] = [];
        for(let i = 0; i < this.selectFishId.length; i++) {
            fishType.push(DataMon.getData(this.selectFishId[i]).fishType);
        }
        return fishType;
    }
}