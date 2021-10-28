/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import FUIcontent from "./FUIcontent";

export default class FUIFishDeadTipsView extends fairygui.GComponent {

	public m_content:FUIcontent;
	public m_t0:fairygui.Transition;

	public static URL:string = "ui://0lwk28v8nyu9791";

	public static createInstance():FUIFishDeadTipsView {
		return <FUIFishDeadTipsView><any>(fairygui.UIPackage.createObject("roomScene","FishDeadTipsView"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_content = <FUIcontent><any>(this.getChildAt(0));
		this.m_t0 = this.getTransitionAt(0);
	}
}