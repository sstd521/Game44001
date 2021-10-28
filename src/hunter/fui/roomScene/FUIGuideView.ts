/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class FUIGuideView extends fairygui.GComponent {

	public m_n0:fairygui.GImage;

	public static URL:string = "ui://0lwk28v8vmmd76n";

	public static createInstance():FUIGuideView {
		return <FUIGuideView><any>(fairygui.UIPackage.createObject("roomScene","GuideView"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_n0 = <fairygui.GImage><any>(this.getChildAt(0));
	}
}