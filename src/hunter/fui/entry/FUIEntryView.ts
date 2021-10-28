/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import FUIbg from "./FUIbg";
import FUIInfoView from "./FUIInfoView";
import FUIMenuView from "./FUIMenuView";

export default class FUIEntryView extends fairygui.GComponent {

	public m_c1:fairygui.Controller;
	public m_bg2:fairygui.GImage;
	public m_bg:FUIbg;
	public m_bgAniBox:fairygui.GComponent;
	public m_infoview:FUIInfoView;
	public m_menu:FUIMenuView;
	public m_context:fairygui.GList;

	public static URL:string = "ui://5xl6v9kdrkgx0";

	public static createInstance():FUIEntryView {
		return <FUIEntryView><any>(fairygui.UIPackage.createObject("entry","EntryView"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_c1 = this.getControllerAt(0);
		this.m_bg2 = <fairygui.GImage><any>(this.getChildAt(0));
		this.m_bg = <FUIbg><any>(this.getChildAt(1));
		this.m_bgAniBox = <fairygui.GComponent><any>(this.getChildAt(2));
		this.m_infoview = <FUIInfoView><any>(this.getChildAt(3));
		this.m_menu = <FUIMenuView><any>(this.getChildAt(4));
		this.m_context = <fairygui.GList><any>(this.getChildAt(5));
	}
}