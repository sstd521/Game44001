/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import FUIHelpPlayContentView from "./FUIHelpPlayContentView";

export default class FUIHelpPlayPanel extends fairygui.GComponent {

	public m_n2:fairygui.GGraph;
	public m_n0:FUIHelpPlayContentView;

	public static URL:string = "ui://75q2l4mufc6p2r";

	public static createInstance():FUIHelpPlayPanel {
		return <FUIHelpPlayPanel><any>(fairygui.UIPackage.createObject("briefUI","HelpPlayPanel"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_n2 = <fairygui.GGraph><any>(this.getChildAt(0));
		this.m_n0 = <FUIHelpPlayContentView><any>(this.getChildAt(1));
	}
}