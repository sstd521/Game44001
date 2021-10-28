/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class FUItipBtn extends fairygui.GButton {

	public m_button:fairygui.Controller;
	public m_n0:fairygui.GImage;

	public static URL:string = "ui://75q2l4musxcx58";

	public static createInstance():FUItipBtn {
		return <FUItipBtn><any>(fairygui.UIPackage.createObject("briefUI","tipBtn"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_button = this.getControllerAt(0);
		this.m_n0 = <fairygui.GImage><any>(this.getChildAt(0));
	}
}