/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class FUIServerItemView extends fairygui.GButton {

	public m_button:fairygui.Controller;
	public m_n2:fairygui.GGraph;
	public m_title:fairygui.GTextField;

	public static URL:string = "ui://liobtiy98eoc4";

	public static createInstance():FUIServerItemView {
		return <FUIServerItemView><any>(fairygui.UIPackage.createObject("loginUi","ServerItemView"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_button = this.getControllerAt(0);
		this.m_n2 = <fairygui.GGraph><any>(this.getChildAt(0));
		this.m_title = <fairygui.GTextField><any>(this.getChildAt(1));
	}
}