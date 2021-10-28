/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import FUIFishContent from "./FUIFishContent";
import FUIBulletView from "./FUIBulletView";
import FUIRoomTipsView from "./FUIRoomTipsView";

export default class FUIContentView extends fairygui.GComponent {

	public m_fishView:FUIFishContent;
	public m_bulletView:FUIBulletView;
	public m_tipsView:FUIRoomTipsView;

	public static URL:string = "ui://0lwk28v8n86c78k";

	public static createInstance():FUIContentView {
		return <FUIContentView><any>(fairygui.UIPackage.createObject("roomScene","ContentView"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_fishView = <FUIFishContent><any>(this.getChildAt(0));
		this.m_bulletView = <FUIBulletView><any>(this.getChildAt(1));
		this.m_tipsView = <FUIRoomTipsView><any>(this.getChildAt(2));
	}
}