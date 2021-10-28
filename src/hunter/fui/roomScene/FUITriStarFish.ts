/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class FUITriStarFish extends fairygui.GComponent {

	public m_buffLoader:fairygui.GLoader;
	public m_n7:fairygui.GMovieClip;
	public m_fishLoader:fairygui.GLoader;
	public m_aimSignLoader:fairygui.GLoader;
	public m_triStarFish1Loader:fairygui.GLoader;
	public m_triStarFish2Loader:fairygui.GLoader;
	public m_triStarFish3Loader:fairygui.GLoader;

	public static URL:string = "ui://0lwk28v8n86c77e";

	public static createInstance():FUITriStarFish {
		return <FUITriStarFish><any>(fairygui.UIPackage.createObject("roomScene","TriStarFish"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_buffLoader = <fairygui.GLoader><any>(this.getChildAt(0));
		this.m_n7 = <fairygui.GMovieClip><any>(this.getChildAt(1));
		this.m_fishLoader = <fairygui.GLoader><any>(this.getChildAt(2));
		this.m_aimSignLoader = <fairygui.GLoader><any>(this.getChildAt(3));
		this.m_triStarFish1Loader = <fairygui.GLoader><any>(this.getChildAt(4));
		this.m_triStarFish2Loader = <fairygui.GLoader><any>(this.getChildAt(5));
		this.m_triStarFish3Loader = <fairygui.GLoader><any>(this.getChildAt(6));
	}
}