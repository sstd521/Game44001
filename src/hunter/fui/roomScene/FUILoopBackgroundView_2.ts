/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class FUILoopBackgroundView_2 extends fairygui.GComponent {

	public m_n14:fairygui.GMovieClip;
	public m_n15:fairygui.GMovieClip;
	public m_n16:fairygui.GMovieClip;
	public m_n17:fairygui.GImage;
	public m_n18:fairygui.GImage;

	public static URL:string = "ui://0lwk28v8uhyn798";

	public static createInstance():FUILoopBackgroundView_2 {
		return <FUILoopBackgroundView_2><any>(fairygui.UIPackage.createObject("roomScene","LoopBackgroundView_2"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_n14 = <fairygui.GMovieClip><any>(this.getChildAt(0));
		this.m_n15 = <fairygui.GMovieClip><any>(this.getChildAt(1));
		this.m_n16 = <fairygui.GMovieClip><any>(this.getChildAt(2));
		this.m_n17 = <fairygui.GImage><any>(this.getChildAt(3));
		this.m_n18 = <fairygui.GImage><any>(this.getChildAt(4));
	}
}