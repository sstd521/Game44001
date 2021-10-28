import inject = riggerIOC.inject;
import FUIRankItem from "../../../fui/briefUI/FUIRankItem";
import { RankData } from "./RankView";
import DataLv from "../../../data/tpls/DataLv";

export default class RankItem extends FUIRankItem {
    constructor() {
        super();
    }

    static getUrl(): string {
        return FUIRankItem.URL;
    }

    static getInstance(data: RankData) {
        var item = FUIRankItem.createInstance();

        var rankNum = data.rankNum;
        var name = data.name;
        var goldNum = data.goldNum;

        if (rankNum > 3) {
            item.m_c1.selectedIndex = 1;
            item.m_rankNum.text = String(rankNum);
        } else {
            item.m_c1.selectedIndex = 0;
            item.m_rankImg.url = "ui://briefUI/bydr_phb_icon_rank" + rankNum;
        }
        item.m_name.text = data.name;
        item.m_goldNum.text = String(data.goldNum);

        //headImg
        let lv = data.lv;
        let headImgNum: number = (lv == 0) ? 1 : DataLv.getData(lv).headId;
        item.m_headImg.url = "ui://briefUI/bydr_dt_icon_toux" + headImgNum;

        //isMe
        item.m_isMe.selectedIndex = (data.isMe) ? 0 : 1;

        return item;
    }
}