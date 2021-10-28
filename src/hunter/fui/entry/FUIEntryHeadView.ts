/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class FUIEntryHeadView extends fairygui.GComponent {

	public m_n0:fairygui.GImage;
	public m_exeRect:fairygui.GImage;
	public m_headImg:fairygui.GLoader;
	public m_exeModule:fairygui.GImage;
	public m_n8:fairygui.GImage;
	public m_lvNum:fairygui.GTextField;
	public m_idText:fairygui.GTextField;
	public m_persentText:fairygui.GTextField;
	public m_n5:fairygui.GGroup;

	public static URL:string = "ui://5xl6v9kdsxcxb6";

	public static createInstance():FUIEntryHeadView {
		return <FUIEntryHeadView><any>(fairygui.UIPackage.createObject("entry","EntryHeadView"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_n0 = <fairygui.GImage><any>(this.getChildAt(0));
		this.m_exeRect = <fairygui.GImage><any>(this.getChildAt(1));
		this.m_headImg = <fairygui.GLoader><any>(this.getChildAt(2));
		this.m_exeModule = <fairygui.GImage><any>(this.getChildAt(3));
		this.m_n8 = <fairygui.GImage><any>(this.getChildAt(4));
		this.m_lvNum = <fairygui.GTextField><any>(this.getChildAt(5));
		this.m_idText = <fairygui.GTextField><any>(this.getChildAt(6));
		this.m_persentText = <fairygui.GTextField><any>(this.getChildAt(7));
		this.m_n5 = <fairygui.GGroup><any>(this.getChildAt(8));
	}
}