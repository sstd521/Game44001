/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class FUIgun extends fairygui.GComponent {

	public m_c1:fairygui.Controller;
	public m_gunLoader:fairygui.GLoader;
	public m_lightAniLoader:fairygui.GLoader;

	public static URL:string = "ui://0lwk28v8n86c77j";

	public static createInstance():FUIgun {
		return <FUIgun><any>(fairygui.UIPackage.createObject("roomScene","gun"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_c1 = this.getControllerAt(0);
		this.m_gunLoader = <fairygui.GLoader><any>(this.getChildAt(0));
		this.m_lightAniLoader = <fairygui.GLoader><any>(this.getChildAt(1));
	}
}