/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class FUIcloseBtn extends fairygui.GButton {

	public m_button:fairygui.Controller;
	public m_icon:fairygui.GLoader;

	public static URL:string = "ui://0lwk28v8n8sw74m";

	public static createInstance():FUIcloseBtn {
		return <FUIcloseBtn><any>(fairygui.UIPackage.createObject("roomScene","closeBtn"));
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