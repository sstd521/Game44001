/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class FUIMenuBtn extends fairygui.GButton {

	public m_button:fairygui.Controller;
	public m_c1:fairygui.Controller;
	public m_n10:fairygui.GLoader;

	public static URL:string = "ui://5xl6v9kdtg8895";

	public static createInstance():FUIMenuBtn {
		return <FUIMenuBtn><any>(fairygui.UIPackage.createObject("entry","MenuBtn"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_button = this.getControllerAt(0);
		this.m_c1 = this.getControllerAt(1);
		this.m_n10 = <fairygui.GLoader><any>(this.getChildAt(0));
	}
}