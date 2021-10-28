/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class FUIbg extends fairygui.GComponent {

	public m_n16:fairygui.GImage;
	public m_n17:fairygui.GImage;

	public static URL:string = "ui://5xl6v9kduhynbq";

	public static createInstance():FUIbg {
		return <FUIbg><any>(fairygui.UIPackage.createObject("entry","bg"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_n16 = <fairygui.GImage><any>(this.getChildAt(0));
		this.m_n17 = <fairygui.GImage><any>(this.getChildAt(1));
	}
}