/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class FUIEnterBtn extends fairygui.GButton {

	public m_button:fairygui.Controller;
	public m_n11:fairygui.GGraph;
	public m_title:fairygui.GTextField;

	public static URL:string = "ui://liobtiy98eoc3";

	public static createInstance():FUIEnterBtn {
		return <FUIEnterBtn><any>(fairygui.UIPackage.createObject("loginUi","EnterBtn"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_button = this.getControllerAt(0);
		this.m_n11 = <fairygui.GGraph><any>(this.getChildAt(0));
		this.m_title = <fairygui.GTextField><any>(this.getChildAt(1));
	}
}