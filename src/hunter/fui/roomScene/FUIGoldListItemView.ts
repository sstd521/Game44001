/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class FUIGoldListItemView extends fairygui.GComponent {

	public m_bottmCoin:fairygui.GImage;
	public m_coinTxt:fairygui.GTextField;

	public static URL:string = "ui://0lwk28v8uhyn79k";

	public static createInstance():FUIGoldListItemView {
		return <FUIGoldListItemView><any>(fairygui.UIPackage.createObject("roomScene","GoldListItemView"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_bottmCoin = <fairygui.GImage><any>(this.getChildAt(0));
		this.m_coinTxt = <fairygui.GTextField><any>(this.getChildAt(1));
	}
}