/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import FUIautoHuntSelectBtn from "./FUIautoHuntSelectBtn";
import FUIcloseBtn from "./FUIcloseBtn";

export default class FUIAutoHuntTipsView extends fairygui.GComponent {

	public m_n6:fairygui.GImage;
	public m_n1:fairygui.GImage;
	public m_n2:fairygui.GImage;
	public m_cancelBtn:FUIautoHuntSelectBtn;
	public m_enterBtn:FUIautoHuntSelectBtn;
	public m_closeBtn:FUIcloseBtn;

	public static URL:string = "ui://0lwk28v8adx676t";

	public static createInstance():FUIAutoHuntTipsView {
		return <FUIAutoHuntTipsView><any>(fairygui.UIPackage.createObject("roomScene","AutoHuntTipsView"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_n6 = <fairygui.GImage><any>(this.getChildAt(0));
		this.m_n1 = <fairygui.GImage><any>(this.getChildAt(1));
		this.m_n2 = <fairygui.GImage><any>(this.getChildAt(2));
		this.m_cancelBtn = <FUIautoHuntSelectBtn><any>(this.getChildAt(3));
		this.m_enterBtn = <FUIautoHuntSelectBtn><any>(this.getChildAt(4));
		this.m_closeBtn = <FUIcloseBtn><any>(this.getChildAt(5));
	}
}