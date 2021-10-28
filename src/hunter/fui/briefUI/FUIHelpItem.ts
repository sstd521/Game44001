/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class FUIHelpItem extends fairygui.GComponent {

	public m_c1:fairygui.Controller;
	public m_n5:fairygui.GLoader;

	public static URL:string = "ui://75q2l4muqw2011";

	public static createInstance():FUIHelpItem {
		return <FUIHelpItem><any>(fairygui.UIPackage.createObject("briefUI","HelpItem"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_c1 = this.getControllerAt(0);
		this.m_n5 = <fairygui.GLoader><any>(this.getChildAt(0));
	}
}