/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class FUIHelpPlayContentView extends fairygui.GComponent {

	public m_n0:fairygui.GImage;

	public static URL:string = "ui://75q2l4muuhyn77i";

	public static createInstance():FUIHelpPlayContentView {
		return <FUIHelpPlayContentView><any>(fairygui.UIPackage.createObject("briefUI","HelpPlayContentView"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_n0 = <fairygui.GImage><any>(this.getChildAt(0));
	}
}