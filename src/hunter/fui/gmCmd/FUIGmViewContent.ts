/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import FUILongBtn from "./FUILongBtn";

export default class FUIGmViewContent extends fairygui.GComponent {

	public m_n0:fairygui.GImage;
	public m_n7:fairygui.GGraph;
	public m_gmList:fairygui.GList;
	public m_gmInput:fairygui.GTextInput;
	public m_confirmBtn:FUILongBtn;
	public m_cancelBtn:FUILongBtn;

	public static URL:string = "ui://lnswovbz8eoc4";

	public static createInstance():FUIGmViewContent {
		return <FUIGmViewContent><any>(fairygui.UIPackage.createObject("gmCmd","GmViewContent"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_n0 = <fairygui.GImage><any>(this.getChildAt(0));
		this.m_n7 = <fairygui.GGraph><any>(this.getChildAt(1));
		this.m_gmList = <fairygui.GList><any>(this.getChildAt(2));
		this.m_gmInput = <fairygui.GTextInput><any>(this.getChildAt(3));
		this.m_confirmBtn = <FUILongBtn><any>(this.getChildAt(4));
		this.m_cancelBtn = <FUILongBtn><any>(this.getChildAt(5));
	}
}