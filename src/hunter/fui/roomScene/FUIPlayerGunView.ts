/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import FUIbatteryLvBtn from "./FUIbatteryLvBtn";
import FUIgun from "./FUIgun";

export default class FUIPlayerGunView extends fairygui.GComponent {

	public m_c1:fairygui.Controller;
	public m_batteryLoader:fairygui.GLoader;
	public m_batteryLvAddBtn:FUIbatteryLvBtn;
	public m_batteryLvSubBtn:FUIbatteryLvBtn;
	public m_gun:FUIgun;
	public m_n15:fairygui.GImage;
	public m_gunLvTxt:fairygui.GTextField;

	public static URL:string = "ui://0lwk28v8mnwy738";

	public static createInstance():FUIPlayerGunView {
		return <FUIPlayerGunView><any>(fairygui.UIPackage.createObject("roomScene","PlayerGunView"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_c1 = this.getControllerAt(0);
		this.m_batteryLoader = <fairygui.GLoader><any>(this.getChildAt(0));
		this.m_batteryLvAddBtn = <FUIbatteryLvBtn><any>(this.getChildAt(1));
		this.m_batteryLvSubBtn = <FUIbatteryLvBtn><any>(this.getChildAt(2));
		this.m_gun = <FUIgun><any>(this.getChildAt(3));
		this.m_n15 = <fairygui.GImage><any>(this.getChildAt(4));
		this.m_gunLvTxt = <fairygui.GTextField><any>(this.getChildAt(5));
	}
}