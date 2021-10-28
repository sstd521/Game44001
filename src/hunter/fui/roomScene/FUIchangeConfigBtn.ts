/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class FUIchangeConfigBtn extends fairygui.GButton {

	public m_button:fairygui.Controller;
	public m_icon:fairygui.GLoader;

	public static URL:string = "ui://0lwk28v8d7af72i";

	public static createInstance():FUIchangeConfigBtn {
		return <FUIchangeConfigBtn><any>(fairygui.UIPackage.createObject("roomScene","changeConfigBtn"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_button = this.getControllerAt(0);
		this.m_icon = <fairygui.GLoader><any>(this.getChildAt(0));
	}
}