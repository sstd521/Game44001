/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class FUILongBtn extends fairygui.GButton {

	public m_n54:fairygui.GImage;
	public m_title:fairygui.GTextField;

	public static URL:string = "ui://lnswovbz8eoc5";

	public static createInstance():FUILongBtn {
		return <FUILongBtn><any>(fairygui.UIPackage.createObject("gmCmd","LongBtn"));
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