/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class FUIsettingBtn extends fairygui.GButton {

	public m_button:fairygui.Controller;
	public m_n1:fairygui.GImage;
	public m_icon:fairygui.GLoader;

	public static URL:string = "ui://0lwk28v8poad742";

	public static createInstance():FUIsettingBtn {
		return <FUIsettingBtn><any>(fairygui.UIPackage.createObject("roomScene","settingBtn"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_button = this.getControllerAt(0);
		this.m_n1 = <fairygui.GImage><any>(this.getChildAt(0));
		this.m_icon = <fairygui.GLoader><any>(this.getChildAt(1));
	}
}