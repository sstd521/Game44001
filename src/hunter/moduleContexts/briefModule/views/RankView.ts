import inject = riggerIOC.inject;
import RankItem from "./RankItem";
import { RankRespSignal } from "../../../protocol/signals/signals";
import { RankResp, UserRank } from "../../../protocol/protocols/protocols";
import BriefServer from "../servers/BriefServer";
import FUIRankView from "../../../fui/briefUI/FUIRankView";
import PlayerModel from "../../playerModule/models/PlayerModel";
import PlayerInfo from "../../playerModule/models/PlayerInfo";

export default class RankView extends FUIRankView {

    /**排行榜数据返回信号 */
    @inject(RankRespSignal)
    private rankRespSignal: RankRespSignal;

    @inject(BriefServer)
    private briefServer: BriefServer;

    /**玩家信息 */
    @inject(PlayerModel)
    private playerModule: PlayerModel;

    constructor() {
        super();
    }

    protected constructFromXML(xml: any): void {
        super.constructFromXML(xml);
        this.init();
    }

    private init() {
        this.addEventListener();
        this.rankReq();
    }

    /**添加监听 */
    addEventListener() {
        for (var i = 0, len = 2; i < len; i++) {
            this["m_t" + i].onClick(this, this.onClicks, [i]);
        }

        this.rankRespSignal.on(this, this.rankResp);
    }

    /**请求列表 */
    rankReq(type: number = 1): void {
        this.briefServer.rankReq(type);
    }

    /**排行榜数据返回 */
    private rankResp(datas: RankResp) {
        let list: UserRank[] = this.rankRegroup(datas.list);
        let info: PlayerInfo = this.playerModule.playerSelfInfo;

        // 生成列表
        this.m_listContentView.m_list.removeChildren();
        for (var i = 0, len = list.length; i < len; i++) {
            var data: RankData = new RankData();
            data.goldNum = list[i].value / 100;
            data.rankNum = list[i].rank;
            data.name = list[i].name;
            data.lv = list[i].lv;
            data.isMe = (info.userId == list[i].userId);
            this.m_listContentView.m_list.addChild(RankItem.getInstance(data));
        }
    }

    /**
     * 名次重排
     * （由低到高）
     *  */
    private rankRegroup(list: UserRank[]) {
        let tempArr: UserRank = null;
        for (var i = 0, len = list.length; i < len; i++) {
            for (var j = 0, lens = len - 1; j < lens; j++) {
                if (list[i].rank < list[j].rank) {
                    tempArr = list[i];
                    list[i] = list[j];
                    list[j] = tempArr;
                }
            }
        }
        return list;
    }

    onClicks(index: number) {
        if (this.m_c1.selectedIndex != index) {
            this.m_c1.selectedIndex = index;
            this.rankReq(index + 1);
        }
    }

    /**移除监听 */
    removeEventListener() {
        for (var i = 0, len = 2; i < len; i++) {
            this["m_t" + i].offClick(this, this.onClicks, [i]);
        }

        this.rankRespSignal.off(this, this.rankResp);
    }
}

export class RankData {
    // 名词
    rankNum: number;

    // id
    name: string;

    // 金币
    goldNum: number;

    // 等价
    lv: number;

    // 是否自己
    isMe: boolean;
}
