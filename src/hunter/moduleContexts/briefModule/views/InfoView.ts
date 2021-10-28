import inject = riggerIOC.inject;
import FUIInfoView from "../../../fui/briefUI/FUIInfoView";
import PlayerModule from "../../playerModule/models/PlayerModel";
import PlayerInfoUpdateSignal from "../../playerModule/signals/PlayerInfoUpdateSignal";
import DataLv from "../../../data/tpls/DataLv";

export default class InfoView extends FUIInfoView {

    /**玩家信息 */
    @inject(PlayerModule)
    private playerModule: PlayerModule;

    /**玩家信息更新信号 */
    @inject(PlayerInfoUpdateSignal)
    private playerInfoUpdateSignal: PlayerInfoUpdateSignal;

    constructor() {
        super();
    }

    protected constructFromXML(xml: any): void {
        super.constructFromXML(xml);
        this.updata();
        this.playerInfoUpdateSignal.on(this, this.updata);
        this.m_tipBtn.onClick(this, this.changeTip);
    }

    updata() {
        // id
        this.m_idNum.text = this.playerModule.playerSelfInfo.userId + '';
        this.m_idText.text = this.playerModule.playerSelfInfo.name + '';

        // balance
        this.m_goldText.text = String(this.playerModule.playerSelfInfo.balance / 100);

        // lv
        let lv: number = this.playerModule.playerSelfInfo.lv;
        this.m_lvText.text = "v" + lv;

        // exp
        let maxLv = DataLv.getData(DataLv.getIds().length).lv;
        let persent: number;
        let exp: number = this.playerModule.playerSelfInfo.exp;
        if(lv >= maxLv) {
            persent = 1;
            lv = maxLv;
        }
        else {
            let needExp: number = DataLv.getData(lv + 1).exp;
            persent = exp / needExp;
        }

        let width = this.m_exeModule.width * persent;
        this.m_exeNum.text = String(exp);
        this.m_exeText.text = Math.round(persent * 100) + "%";
        if (width == 0) width = 1;
        this.m_exeRect.width = width;

        //headImg
        let headImgNum: number = (lv == 0) ? 1 : DataLv.getData(lv).headId;
        this.m_headImg.url = "ui://briefUI/bydr_dt_icon_toux" + headImgNum;
    }

    changeTip() {
        this.m_tip.visible = !this.m_tip.visible;
    }
}