/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class FUILoopBackgroundView_1 extends fairygui.GComponent {

	public m_bg1:fairygui.GImage;
	public m_bg2:fairygui.GImage;
	public m_n10:fairygui.GImage;
	public m_n11:fairygui.GImage;
	public m_n14:fairygui.GMovieClip;
	public m_n15:fairygui.GMovieClip;

	public static URL:string = "ui://0lwk28v8mnwy73s";

	public static createInstance():FUILoopBackgroundView_1 {
		return <FUILoopBackgroundView_1><any>(fairygui.UIPackage.createObject("roomScene","LoopBackgroundView_1"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_bg1 = <fairygui.GImage><any>(this.getChildAt(0));
		this.m_bg2 = <fairygui.GImage><any>(this.getChildAt(1));
		this.m_n10 = <fairygui.GImage><any>(this.getChildAt(2));
		this.m_n11 = <fairygui.GImage><any>(this.getChildAt(3));
		this.m_n14 = <fairygui.GMovieClip><any>(this.getChildAt(4));
		this.m_n15 = <fairygui.GMovieClip><any>(this.getChildAt(5));
	}
}