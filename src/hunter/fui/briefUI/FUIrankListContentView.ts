/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class FUIrankListContentView extends fairygui.GComponent {

	public m_n15:fairygui.GGraph;
	public m_list:fairygui.GList;

	public static URL:string = "ui://75q2l4mutb5z77j";

	public static createInstance():FUIrankListContentView {
		return <FUIrankListContentView><any>(fairygui.UIPackage.createObject("briefUI","rankListContentView"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_n15 = <fairygui.GGraph><any>(this.getChildAt(0));
		this.m_list = <fairygui.GList><any>(this.getChildAt(1));
	}
}