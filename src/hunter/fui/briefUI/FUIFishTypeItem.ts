/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class FUIFishTypeItem extends fairygui.GComponent {

	public m_bg:fairygui.GImage;
	public m_fishLoader:fairygui.GLoader;
	public m_fishRatioTxt:fairygui.GTextField;
	public m_nameLoader:fairygui.GLoader;

	public static URL:string = "ui://75q2l4murgdn5j";

	public static createInstance():FUIFishTypeItem {
		return <FUIFishTypeItem><any>(fairygui.UIPackage.createObject("briefUI","FishTypeItem"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_bg = <fairygui.GImage><any>(this.getChildAt(0));
		this.m_fishLoader = <fairygui.GLoader><any>(this.getChildAt(1));
		this.m_fishRatioTxt = <fairygui.GTextField><any>(this.getChildAt(2));
		this.m_nameLoader = <fairygui.GLoader><any>(this.getChildAt(3));
	}
}