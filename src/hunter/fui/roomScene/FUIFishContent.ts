/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import FUIFullScreenGoldAniView from "./FUIFullScreenGoldAniView";

export default class FUIFishContent extends fairygui.GComponent {

	public m_n0:fairygui.GGraph;
	public m_fullScreenFrozenAniLoader:fairygui.GLoader;
	public m_fullScreenBoomAniLoader:fairygui.GLoader;
	public m_fullScreenGoldAniView:FUIFullScreenGoldAniView;

	public static URL:string = "ui://0lwk28v89lp3a";

	public static createInstance():FUIFishContent {
		return <FUIFishContent><any>(fairygui.UIPackage.createObject("roomScene","FishContent"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_n0 = <fairygui.GGraph><any>(this.getChildAt(0));
		this.m_fullScreenFrozenAniLoader = <fairygui.GLoader><any>(this.getChildAt(1));
		this.m_fullScreenBoomAniLoader = <fairygui.GLoader><any>(this.getChildAt(2));
		this.m_fullScreenGoldAniView = <FUIFullScreenGoldAniView><any>(this.getChildAt(3));
	}
}