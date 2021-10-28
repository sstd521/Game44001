/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class FUIhuntingFishItem extends fairygui.GComponent {

	public m_n0:fairygui.GImage;
	public m_fishLoader:fairygui.GLoader;
	public m_n2:fairygui.GImage;
	public m_n3:fairygui.GImage;
	public m_n4:fairygui.GImage;
	public m_countTxt:fairygui.GTextField;
	public m_pricesTxt:fairygui.GTextField;
	public m_totalWinTxt:fairygui.GTextField;
	public m_nameLoader:fairygui.GLoader;

	public static URL:string = "ui://0lwk28v8rzeh72j";

	public static createInstance():FUIhuntingFishItem {
		return <FUIhuntingFishItem><any>(fairygui.UIPackage.createObject("roomScene","huntingFishItem"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_n0 = <fairygui.GImage><any>(this.getChildAt(0));
		this.m_fishLoader = <fairygui.GLoader><any>(this.getChildAt(1));
		this.m_n2 = <fairygui.GImage><any>(this.getChildAt(2));
		this.m_n3 = <fairygui.GImage><any>(this.getChildAt(3));
		this.m_n4 = <fairygui.GImage><any>(this.getChildAt(4));
		this.m_countTxt = <fairygui.GTextField><any>(this.getChildAt(5));
		this.m_pricesTxt = <fairygui.GTextField><any>(this.getChildAt(6));
		this.m_totalWinTxt = <fairygui.GTextField><any>(this.getChildAt(7));
		this.m_nameLoader = <fairygui.GLoader><any>(this.getChildAt(8));
	}
}