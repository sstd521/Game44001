/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import FUIloadConfigBtn from "./FUIloadConfigBtn";
import FUIselectBtn from "./FUIselectBtn";
import FUIchangeConfigBtn from "./FUIchangeConfigBtn";
import FUIcloseBtn from "./FUIcloseBtn";

export default class FUIAutoHuntingView extends fairygui.GComponent {

	public m_c1:fairygui.Controller;
	public m_panel:fairygui.GImage;
	public m_n2:fairygui.GImage;
	public m_n22:fairygui.GImage;
	public m_n4:fairygui.GImage;
	public m_fishList:fairygui.GList;
	public m_loadConfigBtn:FUIloadConfigBtn;
	public m_selectAllBtn:FUIselectBtn;
	public m_reselectBtn:FUIselectBtn;
	public m_startHuntBtn:FUIselectBtn;
	public m_configView:fairygui.GGroup;
	public m_n13:fairygui.GImage;
	public m_changeAutoBtn:FUIchangeConfigBtn;
	public m_cancelAutoBtn:FUIchangeConfigBtn;
	public m_huntingList:fairygui.GList;
	public m_huntingView:fairygui.GGroup;
	public m_closeBtn:FUIcloseBtn;

	public static URL:string = "ui://0lwk28v8d7af722";

	public static createInstance():FUIAutoHuntingView {
		return <FUIAutoHuntingView><any>(fairygui.UIPackage.createObject("roomScene","AutoHuntingView"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_c1 = this.getControllerAt(0);
		this.m_panel = <fairygui.GImage><any>(this.getChildAt(0));
		this.m_n2 = <fairygui.GImage><any>(this.getChildAt(1));
		this.m_n22 = <fairygui.GImage><any>(this.getChildAt(2));
		this.m_n4 = <fairygui.GImage><any>(this.getChildAt(3));
		this.m_fishList = <fairygui.GList><any>(this.getChildAt(4));
		this.m_loadConfigBtn = <FUIloadConfigBtn><any>(this.getChildAt(5));
		this.m_selectAllBtn = <FUIselectBtn><any>(this.getChildAt(6));
		this.m_reselectBtn = <FUIselectBtn><any>(this.getChildAt(7));
		this.m_startHuntBtn = <FUIselectBtn><any>(this.getChildAt(8));
		this.m_configView = <fairygui.GGroup><any>(this.getChildAt(9));
		this.m_n13 = <fairygui.GImage><any>(this.getChildAt(10));
		this.m_changeAutoBtn = <FUIchangeConfigBtn><any>(this.getChildAt(11));
		this.m_cancelAutoBtn = <FUIchangeConfigBtn><any>(this.getChildAt(12));
		this.m_huntingList = <fairygui.GList><any>(this.getChildAt(13));
		this.m_huntingView = <fairygui.GGroup><any>(this.getChildAt(14));
		this.m_closeBtn = <FUIcloseBtn><any>(this.getChildAt(15));
	}
}