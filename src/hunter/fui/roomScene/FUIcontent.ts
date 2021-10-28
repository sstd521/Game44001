/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class FUIcontent extends fairygui.GComponent {

	public m_c1:fairygui.Controller;
	public m_bgLoader:fairygui.GLoader;
	public m_fishLoader:fairygui.GLoader;
	public m_coinBgLoader:fairygui.GLoader;
	public m_coinTxt:fairygui.GTextField;

	public static URL:string = "ui://0lwk28v8nyu978q";

	public static createInstance():FUIcontent {
		return <FUIcontent><any>(fairygui.UIPackage.createObject("roomScene","content"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_c1 = this.getControllerAt(0);
		this.m_bgLoader = <fairygui.GLoader><any>(this.getChildAt(0));
		this.m_fishLoader = <fairygui.GLoader><any>(this.getChildAt(1));
		this.m_coinBgLoader = <fairygui.GLoader><any>(this.getChildAt(2));
		this.m_coinTxt = <fairygui.GTextField><any>(this.getChildAt(3));
	}
}