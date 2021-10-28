/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class FUIwinGoldNumView extends fairygui.GComponent {

	public m_winGoldTxt:fairygui.GTextField;
	public m_t0:fairygui.Transition;
	public m_t1:fairygui.Transition;

	public static URL:string = "ui://0lwk28v8n86c78d";

	public static createInstance():FUIwinGoldNumView {
		return <FUIwinGoldNumView><any>(fairygui.UIPackage.createObject("roomScene","winGoldNumView"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_winGoldTxt = <fairygui.GTextField><any>(this.getChildAt(0));
		this.m_t0 = this.getTransitionAt(0);
		this.m_t1 = this.getTransitionAt(1);
	}
}