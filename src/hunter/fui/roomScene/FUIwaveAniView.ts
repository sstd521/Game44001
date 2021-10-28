/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class FUIwaveAniView extends fairygui.GComponent {

	public m_n0:fairygui.GGraph;

	public static URL:string = "ui://0lwk28v8uhyn797";

	public static createInstance():FUIwaveAniView {
		return <FUIwaveAniView><any>(fairygui.UIPackage.createObject("roomScene","waveAniView"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_n0 = <fairygui.GGraph><any>(this.getChildAt(0));
	}
}