/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class FUIHelpYuPanel extends fairygui.GComponent {

	public m_fishList:fairygui.GList;

	public static URL:string = "ui://75q2l4mufc6p2p";

	public static createInstance():FUIHelpYuPanel {
		return <FUIHelpYuPanel><any>(fairygui.UIPackage.createObject("briefUI","HelpYuPanel"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_fishList = <fairygui.GList><any>(this.getChildAt(0));
	}
}