/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class FUIGmBtn extends fairygui.GComponent {

	public m_n7:fairygui.GImage;
	public m_n8:fairygui.GTextField;

	public static URL:string = "ui://lnswovbz8eoc7";

	public static createInstance():FUIGmBtn {
		return <FUIGmBtn><any>(fairygui.UIPackage.createObject("gmCmd","GmBtn"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_n7 = <fairygui.GImage><any>(this.getChildAt(0));
		this.m_n8 = <fairygui.GTextField><any>(this.getChildAt(1));
	}
}