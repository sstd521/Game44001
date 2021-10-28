/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import FUIEnterBtn from "./FUIEnterBtn";

export default class FUIEnterView extends fairygui.GComponent {

	public m_startBtn:FUIEnterBtn;
	public m_token_txt:fairygui.GTextField;
	public m_token_input:fairygui.GTextInput;

	public static URL:string = "ui://liobtiy99lp37";

	public static createInstance():FUIEnterView {
		return <FUIEnterView><any>(fairygui.UIPackage.createObject("loginUi","EnterView"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_startBtn = <FUIEnterBtn><any>(this.getChildAt(0));
		this.m_token_txt = <fairygui.GTextField><any>(this.getChildAt(1));
		this.m_token_input = <fairygui.GTextInput><any>(this.getChildAt(2));
	}
}