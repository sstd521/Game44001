/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class FUIShowGoldListView extends fairygui.GComponent {

	public m_n17:fairygui.GGraph;

	public static URL:string = "ui://0lwk28v8uhyn79l";

	public static createInstance():FUIShowGoldListView {
		return <FUIShowGoldListView><any>(fairygui.UIPackage.createObject("roomScene","ShowGoldListView"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_n17 = <fairygui.GGraph><any>(this.getChildAt(0));
	}
}