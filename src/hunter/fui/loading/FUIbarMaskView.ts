/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class FUIbarMaskView extends fairygui.GComponent {

	public m_bar:fairygui.GImage;
	public m_mask:fairygui.GImage;

	public static URL:string = "ui://g2ixeje8ny39r";

	public static createInstance():FUIbarMaskView {
		return <FUIbarMaskView><any>(fairygui.UIPackage.createObject("loading","barMaskView"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_bar = <fairygui.GImage><any>(this.getChildAt(0));
		this.m_mask = <fairygui.GImage><any>(this.getChildAt(1));
	}
}