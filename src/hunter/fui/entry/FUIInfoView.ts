/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import FUIEntryHeadView from "./FUIEntryHeadView";

export default class FUIInfoView extends fairygui.GComponent {

	public m_c1:fairygui.Controller;
	public m_headBox:FUIEntryHeadView;
	public m_n17:fairygui.GImage;
	public m_n20:fairygui.GImage;
	public m_goldText:fairygui.GTextField;
	public m_n21:fairygui.GGroup;

	public static URL:string = "ui://5xl6v9kdtg8892";

	public static createInstance():FUIInfoView {
		return <FUIInfoView><any>(fairygui.UIPackage.createObject("entry","InfoView"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_c1 = this.getControllerAt(0);
		this.m_headBox = <FUIEntryHeadView><any>(this.getChildAt(0));
		this.m_n17 = <fairygui.GImage><any>(this.getChildAt(1));
		this.m_n20 = <fairygui.GImage><any>(this.getChildAt(2));
		this.m_goldText = <fairygui.GTextField><any>(this.getChildAt(3));
		this.m_n21 = <fairygui.GGroup><any>(this.getChildAt(4));
	}
}