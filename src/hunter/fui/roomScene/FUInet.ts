/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class FUInet extends fairygui.GComponent {

	public m_n0:fairygui.GLoader;
	public m_n1:fairygui.GMovieClip;
	public m_t0:fairygui.Transition;

	public static URL:string = "ui://0lwk28v8cyonl";

	public static createInstance():FUInet {
		return <FUInet><any>(fairygui.UIPackage.createObject("roomScene","net"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_n0 = <fairygui.GLoader><any>(this.getChildAt(0));
		this.m_n1 = <fairygui.GMovieClip><any>(this.getChildAt(1));
		this.m_t0 = this.getTransitionAt(0);
	}
}