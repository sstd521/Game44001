import FUInet from "../../fui/roomScene/FUInet";

export class NetView extends FUInet {
    public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
    }
    
    private netName: string[] = ["brdr_ycjm_icon_wang_di", "brdr_ycjm_icon_wang_zhong", "brdr_ycjm_icon_wang_gao"];
    init(bulletLv: number) {
        let idx: number;
        if(bulletLv < 10) idx = 0;
        else if(bulletLv < 100) idx = 1;
        else idx = 2;
        this.m_n0.url = `ui://roomScene/${this.netName[idx]}`;

        if(idx == 2) this.m_n1.visible = true;
        else this.m_n1.visible = false;
    }
}