/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import FUIHelpYuPanel from "./FUIHelpYuPanel";
import FUIHelpPlayPanel from "./FUIHelpPlayPanel";

export default class FUIHelpView extends fairygui.GComponent {

	public m_c1:fairygui.Controller;
	public m_n14:fairygui.GImage;
	public m_n9:fairygui.GImage;
	public m_n7:fairygui.GImage;
	public m_n10:fairygui.GImage;
	public m_top2:fairygui.GLoader;
	public m_top1:fairygui.GLoader;
	public m_top0:fairygui.GLoader;
	public m_list:fairygui.GList;
	public m_n12:FUIHelpYuPanel;
	public m_n13:FUIHelpPlayPanel;

	public static URL:string = "ui://75q2l4muqw20u";

	public static createInstance():FUIHelpView {
		return <FUIHelpView><any>(fairygui.UIPackage.createObject("briefUI","HelpView"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_c1 = this.getControllerAt(0);
		this.m_n14 = <fairygui.GImage><any>(this.getChildAt(0));
		this.m_n9 = <fairygui.GImage><any>(this.getChildAt(1));
		this.m_n7 = <fairygui.GImage><any>(this.getChildAt(2));
		this.m_n10 = <fairygui.GImage><any>(this.getChildAt(3));
		this.m_top2 = <fairygui.GLoader><any>(this.getChildAt(4));
		this.m_top1 = <fairygui.GLoader><any>(this.getChildAt(5));
		this.m_top0 = <fairygui.GLoader><any>(this.getChildAt(6));
		this.m_list = <fairygui.GList><any>(this.getChildAt(7));
		this.m_n12 = <FUIHelpYuPanel><any>(this.getChildAt(8));
		this.m_n13 = <FUIHelpPlayPanel><any>(this.getChildAt(9));
	}
}