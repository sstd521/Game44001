import DataMon from "../../../data/tpls/DataMon";
import { fishTypeEnum } from "../../../script/enum/FishEnum";
import FUIAutoFireFishItem from "../../../fui/roomScene/FUIAutoFireFishItem";
import FUIFishTypeItem from "../../../fui/briefUI/FUIFishTypeItem";
import FUIHelpYuPanel from "../../../fui/briefUI/FUIHelpYuPanel";

export class FishTypeHelpView extends FUIHelpYuPanel {
    public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
        super.constructFromXML(xml);
        this.init();
    }
    
    private fishList: number[] = [];
    init() {
        this.fishList = this.fishTypeList();
        this.m_fishList.itemRenderer = Laya.Handler.create(this, this.renderFishListItem, null, false);
        this.m_fishList.numItems = this.fishList.length;
    }

    /**
     * 鱼列表渲染回调
     * @param index 
     * @param item 
     */
    renderFishListItem(index: number, item: FUIFishTypeItem) {
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
        item.data = fishData.id;
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
}