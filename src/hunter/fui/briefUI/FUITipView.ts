/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import FUITipContext from "./FUITipContext";

export default class FUITipView extends fairygui.GComponent {

	public m_context:FUITipContext;

	public static URL:string = "ui://75q2l4muqw2018";

	public static createInstance():FUITipView {
		return <FUITipView><any>(fairygui.UIPackage.createObject("briefUI","TipView"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_context = <FUITipContext><any>(this.getChildAt(0));
	}
}