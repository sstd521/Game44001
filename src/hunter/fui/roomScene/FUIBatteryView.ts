/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import FUIPlayerGunView from "./FUIPlayerGunView";
import FUIPlayerInfoView from "./FUIPlayerInfoView";
import FUIShowGoldListView from "./FUIShowGoldListView";

export default class FUIBatteryView extends fairygui.GComponent {

	public m_c2:fairygui.Controller;
	public m_c1:fairygui.Controller;
	public m_c3:fairygui.Controller;
	public m_gunView:FUIPlayerGunView;
	public m_infoView:FUIPlayerInfoView;
	public m_goldList:FUIShowGoldListView;
	public m_n11:fairygui.GGroup;
	public m_n12:fairygui.GImage;

	public static URL:string = "ui://0lwk28v89lp3h";

	public static createInstance():FUIBatteryView {
		return <FUIBatteryView><any>(fairygui.UIPackage.createObject("roomScene","BatteryView"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_c2 = this.getControllerAt(0);
		this.m_c1 = this.getControllerAt(1);
		this.m_c3 = this.getControllerAt(2);
		this.m_gunView = <FUIPlayerGunView><any>(this.getChildAt(0));
		this.m_infoView = <FUIPlayerInfoView><any>(this.getChildAt(1));
		this.m_goldList = <FUIShowGoldListView><any>(this.getChildAt(2));
		this.m_n11 = <fairygui.GGroup><any>(this.getChildAt(3));
		this.m_n12 = <fairygui.GImage><any>(this.getChildAt(4));
	}
}