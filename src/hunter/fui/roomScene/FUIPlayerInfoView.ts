/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class FUIPlayerInfoView extends fairygui.GComponent {

	public m_c1:fairygui.Controller;
	public m_n11:fairygui.GImage;
	public m_n14:fairygui.GImage;
	public m_coinTxt:fairygui.GTextField;
	public m_nameTxt:fairygui.GTextField;

	public static URL:string = "ui://0lwk28v8glv2x";

	public static createInstance():FUIPlayerInfoView {
		return <FUIPlayerInfoView><any>(fairygui.UIPackage.createObject("roomScene","PlayerInfoView"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_c1 = this.getControllerAt(0);
		this.m_n11 = <fairygui.GImage><any>(this.getChildAt(0));
		this.m_n14 = <fairygui.GImage><any>(this.getChildAt(1));
		this.m_coinTxt = <fairygui.GTextField><any>(this.getChildAt(2));
		this.m_nameTxt = <fairygui.GTextField><any>(this.getChildAt(3));
	}
}