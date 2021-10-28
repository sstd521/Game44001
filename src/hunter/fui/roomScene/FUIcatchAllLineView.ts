/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class FUIcatchAllLineView extends fairygui.GComponent {

	public m_n1:fairygui.GGraph;
	public m_n2:fairygui.GMovieClip;
	public m_n3:fairygui.GMovieClip;
	public m_n4:fairygui.GMovieClip;
	public m_n5:fairygui.GMovieClip;
	public m_n6:fairygui.GMovieClip;
	public m_n7:fairygui.GMovieClip;

	public static URL:string = "ui://0lwk28v8n86c78i";

	public static createInstance():FUIcatchAllLineView {
		return <FUIcatchAllLineView><any>(fairygui.UIPackage.createObject("roomScene","catchAllLineView"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_n1 = <fairygui.GGraph><any>(this.getChildAt(0));
		this.m_n2 = <fairygui.GMovieClip><any>(this.getChildAt(1));
		this.m_n3 = <fairygui.GMovieClip><any>(this.getChildAt(2));
		this.m_n4 = <fairygui.GMovieClip><any>(this.getChildAt(3));
		this.m_n5 = <fairygui.GMovieClip><any>(this.getChildAt(4));
		this.m_n6 = <fairygui.GMovieClip><any>(this.getChildAt(5));
		this.m_n7 = <fairygui.GMovieClip><any>(this.getChildAt(6));
	}
}