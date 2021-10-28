/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class FUIselectBtn extends fairygui.GButton {

	public m_button:fairygui.Controller;
	public m_icon:fairygui.GLoader;

	public static URL:string = "ui://0lwk28v8n8sw75x";

	public static createInstance():FUIselectBtn {
		return <FUIselectBtn><any>(fairygui.UIPackage.createObject("roomScene","selectBtn"));
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