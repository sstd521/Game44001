/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class FUIMenuView extends fairygui.GComponent {

	public m_c1:fairygui.Controller;
	public m_settingBtnList:fairygui.GList;

	public static URL:string = "ui://5xl6v9kdtg8894";

	public static createInstance():FUIMenuView {
		return <FUIMenuView><any>(fairygui.UIPackage.createObject("entry","MenuView"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_c1 = this.getControllerAt(0);
		this.m_settingBtnList = <fairygui.GList><any>(this.getChildAt(0));
	}
}