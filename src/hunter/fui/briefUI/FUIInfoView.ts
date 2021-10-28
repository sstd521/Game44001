/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import FUItipBtn from "./FUItipBtn";

export default class FUIInfoView extends fairygui.GComponent {

	public m_bg:fairygui.GImage;
	public m_n1:fairygui.GImage;
	public m_n2:fairygui.GImage;
	public m_tip:fairygui.GImage;
	public m_tipBtn:FUItipBtn;
	public m_n5:fairygui.GImage;
	public m_exeRect:fairygui.GImage;
	public m_headImg:fairygui.GLoader;
	public m_exeModule:fairygui.GImage;
	public m_idText:fairygui.GTextField;
	public m_n10:fairygui.GGroup;
	public m_n11:fairygui.GImage;
	public m_n13:fairygui.GImage;
	public m_goldText:fairygui.GTextField;
	public m_n14:fairygui.GGroup;
	public m_n15:fairygui.GTextField;
	public m_n16:fairygui.GTextField;
	public m_exeNum:fairygui.GTextField;
	public m_idNum:fairygui.GTextField;
	public m_lvText:fairygui.GTextField;
	public m_exeText:fairygui.GTextField;

	public static URL:string = "ui://75q2l4musxcx57";

	public static createInstance():FUIInfoView {
		return <FUIInfoView><any>(fairygui.UIPackage.createObject("briefUI","InfoView"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_bg = <fairygui.GImage><any>(this.getChildAt(0));
		this.m_n1 = <fairygui.GImage><any>(this.getChildAt(1));
		this.m_n2 = <fairygui.GImage><any>(this.getChildAt(2));
		this.m_tip = <fairygui.GImage><any>(this.getChildAt(3));
		this.m_tipBtn = <FUItipBtn><any>(this.getChildAt(4));
		this.m_n5 = <fairygui.GImage><any>(this.getChildAt(5));
		this.m_exeRect = <fairygui.GImage><any>(this.getChildAt(6));
		this.m_headImg = <fairygui.GLoader><any>(this.getChildAt(7));
		this.m_exeModule = <fairygui.GImage><any>(this.getChildAt(8));
		this.m_idText = <fairygui.GTextField><any>(this.getChildAt(9));
		this.m_n10 = <fairygui.GGroup><any>(this.getChildAt(10));
		this.m_n11 = <fairygui.GImage><any>(this.getChildAt(11));
		this.m_n13 = <fairygui.GImage><any>(this.getChildAt(12));
		this.m_goldText = <fairygui.GTextField><any>(this.getChildAt(13));
		this.m_n14 = <fairygui.GGroup><any>(this.getChildAt(14));
		this.m_n15 = <fairygui.GTextField><any>(this.getChildAt(15));
		this.m_n16 = <fairygui.GTextField><any>(this.getChildAt(16));
		this.m_exeNum = <fairygui.GTextField><any>(this.getChildAt(17));
		this.m_idNum = <fairygui.GTextField><any>(this.getChildAt(18));
		this.m_lvText = <fairygui.GTextField><any>(this.getChildAt(19));
		this.m_exeText = <fairygui.GTextField><any>(this.getChildAt(20));
	}
}