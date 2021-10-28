/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class FUIEntryItem extends fairygui.GComponent {

	public m_c1:fairygui.Controller;

	public static URL:string = "ui://5xl6v9kdtg8891";

	public static createInstance():FUIEntryItem {
		return <FUIEntryItem><any>(fairygui.UIPackage.createObject("entry","EntryItem"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_c1 = this.getControllerAt(0);
	}
}