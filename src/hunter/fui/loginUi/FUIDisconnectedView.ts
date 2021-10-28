/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import FUIOkBtn from "./FUIOkBtn";

export default class FUIDisconnectedView extends fairygui.GComponent {

	public m_n0:fairygui.GImage;
	public m_okBtn:FUIOkBtn;
	public m_n2:fairygui.GImage;

	public static URL:string = "ui://liobtiy9glv28";

	public static createInstance():FUIDisconnectedView {
		return <FUIDisconnectedView><any>(fairygui.UIPackage.createObject("loginUi","DisconnectedView"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_n0 = <fairygui.GImage><any>(this.getChildAt(0));
		this.m_okBtn = <FUIOkBtn><any>(this.getChildAt(1));
		this.m_n2 = <fairygui.GImage><any>(this.getChildAt(2));
	}
}