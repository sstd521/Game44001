/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class FUIFullScreenGoldAniView extends fairygui.GComponent {

	public m_n4:fairygui.GGraph;

	public static URL:string = "ui://0lwk28v8uhyn799";

	public static createInstance():FUIFullScreenGoldAniView {
		return <FUIFullScreenGoldAniView><any>(fairygui.UIPackage.createObject("roomScene","FullScreenGoldAniView"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_n4 = <fairygui.GGraph><any>(this.getChildAt(0));
	}
}