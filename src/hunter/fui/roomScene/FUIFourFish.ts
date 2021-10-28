/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class FUIFourFish extends fairygui.GComponent {

	public m_buffLoader:fairygui.GLoader;
	public m_n13:fairygui.GMovieClip;
	public m_fishLoader:fairygui.GLoader;
	public m_aimSignLoader:fairygui.GLoader;
	public m_fourFish1Loader:fairygui.GLoader;
	public m_fourFish2Loader:fairygui.GLoader;
	public m_fourFish3Loader:fairygui.GLoader;
	public m_fourFish4Loader:fairygui.GLoader;

	public static URL:string = "ui://0lwk28v8n86c77f";

	public static createInstance():FUIFourFish {
		return <FUIFourFish><any>(fairygui.UIPackage.createObject("roomScene","FourFish"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_buffLoader = <fairygui.GLoader><any>(this.getChildAt(0));
		this.m_n13 = <fairygui.GMovieClip><any>(this.getChildAt(1));
		this.m_fishLoader = <fairygui.GLoader><any>(this.getChildAt(2));
		this.m_aimSignLoader = <fairygui.GLoader><any>(this.getChildAt(3));
		this.m_fourFish1Loader = <fairygui.GLoader><any>(this.getChildAt(4));
		this.m_fourFish2Loader = <fairygui.GLoader><any>(this.getChildAt(5));
		this.m_fourFish3Loader = <fairygui.GLoader><any>(this.getChildAt(6));
		this.m_fourFish4Loader = <fairygui.GLoader><any>(this.getChildAt(7));
	}
}