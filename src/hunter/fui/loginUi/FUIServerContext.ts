/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class FUIServerContext extends fairygui.GComponent {

	public m_serverList:fairygui.GList;
	public m_infoTitle:fairygui.GTextField;
	public m_serverInfoLabel:fairygui.GTextField;

	public static URL:string = "ui://liobtiy9mdi56";

	public static createInstance():FUIServerContext {
		return <FUIServerContext><any>(fairygui.UIPackage.createObject("loginUi","ServerContext"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_serverList = <fairygui.GList><any>(this.getChildAt(0));
		this.m_infoTitle = <fairygui.GTextField><any>(this.getChildAt(1));
		this.m_serverInfoLabel = <fairygui.GTextField><any>(this.getChildAt(2));
	}
}