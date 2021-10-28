/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import FUISettingSlide from "./FUISettingSlide";

export default class FUISettingView extends fairygui.GComponent {

	public m_n16:fairygui.GImage;
	public m_n17:fairygui.GImage;
	public m_n18:fairygui.GImage;
	public m_n19:fairygui.GImage;
	public m_music_slider:FUISettingSlide;
	public m_sound_slider:FUISettingSlide;

	public static URL:string = "ui://75q2l4muqw20c";

	public static createInstance():FUISettingView {
		return <FUISettingView><any>(fairygui.UIPackage.createObject("briefUI","SettingView"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_n16 = <fairygui.GImage><any>(this.getChildAt(0));
		this.m_n17 = <fairygui.GImage><any>(this.getChildAt(1));
		this.m_n18 = <fairygui.GImage><any>(this.getChildAt(2));
		this.m_n19 = <fairygui.GImage><any>(this.getChildAt(3));
		this.m_music_slider = <FUISettingSlide><any>(this.getChildAt(4));
		this.m_sound_slider = <FUISettingSlide><any>(this.getChildAt(5));
	}
}