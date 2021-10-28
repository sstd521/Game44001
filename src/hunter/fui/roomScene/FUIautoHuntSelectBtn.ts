/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class FUIautoHuntSelectBtn extends fairygui.GButton {

	public m_button:fairygui.Controller;
	public m_icon:fairygui.GLoader;

	public static URL:string = "ui://0lwk28v8adx676y";

	public static createInstance():FUIautoHuntSelectBtn {
		return <FUIautoHuntSelectBtn><any>(fairygui.UIPackage.createObject("roomScene","autoHuntSelectBtn"));
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