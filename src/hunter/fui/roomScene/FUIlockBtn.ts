/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class FUIlockBtn extends fairygui.GButton {

	public m_button:fairygui.Controller;
	public m_icon:fairygui.GLoader;

	public static URL:string = "ui://0lwk28v8kz7e11";

	public static createInstance():FUIlockBtn {
		return <FUIlockBtn><any>(fairygui.UIPackage.createObject("roomScene","lockBtn"));
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