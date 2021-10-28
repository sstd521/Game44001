/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import FUILoadingContentView from "./FUILoadingContentView";

export default class FUILoadingView extends fairygui.GComponent {

	public m_bgl:fairygui.GImage;
	public m_content:FUILoadingContentView;

	public static URL:string = "ui://g2ixeje8e98g5";

	public static createInstance():FUILoadingView {
		return <FUILoadingView><any>(fairygui.UIPackage.createObject("loading","LoadingView"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_bgl = <fairygui.GImage><any>(this.getChildAt(0));
		this.m_content = <FUILoadingContentView><any>(this.getChildAt(1));
	}
}