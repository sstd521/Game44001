/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class FUIAutoFireFishItem extends fairygui.GComponent {

	public m_c1:fairygui.Controller;
	public m_bg:fairygui.GImage;
	public m_n6:fairygui.GImage;
	public m_fishLoader:fairygui.GLoader;
	public m_n3:fairygui.GImage;
	public m_fishRatioTxt:fairygui.GTextField;
	public m_checked:fairygui.GImage;
	public m_nameLoader:fairygui.GLoader;

	public static URL:string = "ui://0lwk28v8d7af726";

	public static createInstance():FUIAutoFireFishItem {
		return <FUIAutoFireFishItem><any>(fairygui.UIPackage.createObject("roomScene","AutoFireFishItem"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_c1 = this.getControllerAt(0);
		this.m_bg = <fairygui.GImage><any>(this.getChildAt(0));
		this.m_n6 = <fairygui.GImage><any>(this.getChildAt(1));
		this.m_fishLoader = <fairygui.GLoader><any>(this.getChildAt(2));
		this.m_n3 = <fairygui.GImage><any>(this.getChildAt(3));
		this.m_fishRatioTxt = <fairygui.GTextField><any>(this.getChildAt(4));
		this.m_checked = <fairygui.GImage><any>(this.getChildAt(5));
		this.m_nameLoader = <fairygui.GLoader><any>(this.getChildAt(6));
	}
}