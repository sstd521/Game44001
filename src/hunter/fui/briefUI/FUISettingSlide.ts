/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import FUISettingSlide_grip from "./FUISettingSlide_grip";

export default class FUISettingSlide extends fairygui.GSlider {

	public m_n0:fairygui.GImage;
	public m_bar:fairygui.GImage;
	public m_grip:FUISettingSlide_grip;

	public static URL:string = "ui://75q2l4mumaic50";

	public static createInstance():FUISettingSlide {
		return <FUISettingSlide><any>(fairygui.UIPackage.createObject("briefUI","SettingSlide"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_n0 = <fairygui.GImage><any>(this.getChildAt(0));
		this.m_bar = <fairygui.GImage><any>(this.getChildAt(1));
		this.m_grip = <FUISettingSlide_grip><any>(this.getChildAt(2));
	}
}