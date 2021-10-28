/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class FUIMaskView extends fairygui.GComponent {

	public m_bgGraph:fairygui.GGraph;

	public static URL:string = "ui://y2ep490wt6ch0";

	public static createInstance():FUIMaskView {
		return <FUIMaskView><any>(fairygui.UIPackage.createObject("commonUI","MaskView"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_bgGraph = <fairygui.GGraph><any>(this.getChildAt(0));
	}
}