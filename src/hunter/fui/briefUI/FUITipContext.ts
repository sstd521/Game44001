/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import FUISettingView from "./FUISettingView";
import FUIHelpView from "./FUIHelpView";
import FUIRankView from "./FUIRankView";
import FUIInfoView from "./FUIInfoView";
import FUICloseBtn from "./FUICloseBtn";

export default class FUITipContext extends fairygui.GComponent {

	public m_c1:fairygui.Controller;
	public m_n0:FUISettingView;
	public m_n3:FUIHelpView;
	public m_n4:FUIRankView;
	public m_n5:FUIInfoView;
	public m_closeBtn:FUICloseBtn;

	public static URL:string = "ui://75q2l4muqw20e";

	public static createInstance():FUITipContext {
		return <FUITipContext><any>(fairygui.UIPackage.createObject("briefUI","TipContext"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_c1 = this.getControllerAt(0);
		this.m_n0 = <FUISettingView><any>(this.getChildAt(0));
		this.m_n3 = <FUIHelpView><any>(this.getChildAt(1));
		this.m_n4 = <FUIRankView><any>(this.getChildAt(2));
		this.m_n5 = <FUIInfoView><any>(this.getChildAt(3));
		this.m_closeBtn = <FUICloseBtn><any>(this.getChildAt(4));
	}
}