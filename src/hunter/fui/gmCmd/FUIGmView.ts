/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import FUIGmViewContent from "./FUIGmViewContent";

export default class FUIGmView extends fairygui.GComponent {

	public m_content:FUIGmViewContent;

	public static URL:string = "ui://lnswovbz8eoc3";

	public static createInstance():FUIGmView {
		return <FUIGmView><any>(fairygui.UIPackage.createObject("gmCmd","GmView"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_content = <FUIGmViewContent><any>(this.getChildAt(0));
	}
}