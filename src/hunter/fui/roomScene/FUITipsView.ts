/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class FUITipsView extends fairygui.GComponent {

	public m_tipsLoader:fairygui.GLoader;
	public m_t0:fairygui.Transition;

	public static URL:string = "ui://0lwk28v8tb5z79p";

	public static createInstance():FUITipsView {
		return <FUITipsView><any>(fairygui.UIPackage.createObject("roomScene","TipsView"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_tipsLoader = <fairygui.GLoader><any>(this.getChildAt(0));
		this.m_t0 = this.getTransitionAt(0);
	}
}