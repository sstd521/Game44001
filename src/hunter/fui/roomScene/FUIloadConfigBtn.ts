/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class FUIloadConfigBtn extends fairygui.GButton {

	public m_button:fairygui.Controller;
	public m_icon:fairygui.GLoader;

	public static URL:string = "ui://0lwk28v8d7af72c";

	public static createInstance():FUIloadConfigBtn {
		return <FUIloadConfigBtn><any>(fairygui.UIPackage.createObject("roomScene","loadConfigBtn"));
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