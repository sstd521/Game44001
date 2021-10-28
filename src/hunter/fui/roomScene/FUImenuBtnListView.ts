/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class FUImenuBtnListView extends fairygui.GComponent {

	public m_bg:fairygui.GImage;
	public m_menuBtnList:fairygui.GList;

	public static URL:string = "ui://0lwk28v8poad743";

	public static createInstance():FUImenuBtnListView {
		return <FUImenuBtnListView><any>(fairygui.UIPackage.createObject("roomScene","menuBtnListView"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_bg = <fairygui.GImage><any>(this.getChildAt(0));
		this.m_menuBtnList = <fairygui.GList><any>(this.getChildAt(1));
	}
}