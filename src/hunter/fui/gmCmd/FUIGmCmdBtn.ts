/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class FUIGmCmdBtn extends fairygui.GButton {

	public m_n54:fairygui.GImage;
	public m_title:fairygui.GTextField;

	public static URL:string = "ui://lnswovbzekuc9";

	public static createInstance():FUIGmCmdBtn {
		return <FUIGmCmdBtn><any>(fairygui.UIPackage.createObject("gmCmd","GmCmdBtn"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_n54 = <fairygui.GImage><any>(this.getChildAt(0));
		this.m_title = <fairygui.GTextField><any>(this.getChildAt(1));
	}
}