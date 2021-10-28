/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import FUILoadBarView from "./FUILoadBarView";

export default class FUILoadingContentView extends fairygui.GComponent {

	public m_barView:FUILoadBarView;
	public m_logoBox:fairygui.GComponent;

	public static URL:string = "ui://g2ixeje8ccfym";

	public static createInstance():FUILoadingContentView {
		return <FUILoadingContentView><any>(fairygui.UIPackage.createObject("loading","LoadingContentView"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_barView = <FUILoadBarView><any>(this.getChildAt(0));
		this.m_logoBox = <fairygui.GComponent><any>(this.getChildAt(1));
	}
}