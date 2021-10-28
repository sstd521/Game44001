/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class FUIOkBtn extends fairygui.GButton {

	public m_n0:fairygui.GImage;

	public static URL:string = "ui://liobtiy9glv2a";

	public static createInstance():FUIOkBtn {
		return <FUIOkBtn><any>(fairygui.UIPackage.createObject("loginUi","OkBtn"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_n0 = <fairygui.GImage><any>(this.getChildAt(0));
	}
}