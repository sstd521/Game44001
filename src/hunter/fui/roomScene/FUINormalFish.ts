/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class FUINormalFish extends fairygui.GComponent {

	public m_buffLoader:fairygui.GLoader;
	public m_fishLoader:fairygui.GLoader;
	public m_specalAniLoader:fairygui.GLoader;
	public m_aimSignLoader:fairygui.GLoader;

	public static URL:string = "ui://0lwk28v89lp30";

	public static createInstance():FUINormalFish {
		return <FUINormalFish><any>(fairygui.UIPackage.createObject("roomScene","NormalFish"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_buffLoader = <fairygui.GLoader><any>(this.getChildAt(0));
		this.m_fishLoader = <fairygui.GLoader><any>(this.getChildAt(1));
		this.m_specalAniLoader = <fairygui.GLoader><any>(this.getChildAt(2));
		this.m_aimSignLoader = <fairygui.GLoader><any>(this.getChildAt(3));
	}
}