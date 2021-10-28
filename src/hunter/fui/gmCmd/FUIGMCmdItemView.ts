/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import FUIGmCmdBtn from "./FUIGmCmdBtn";

export default class FUIGMCmdItemView extends fairygui.GComponent {

	public m_btn:FUIGmCmdBtn;

	public static URL:string = "ui://lnswovbz8eoc2";

	public static createInstance():FUIGMCmdItemView {
		return <FUIGMCmdItemView><any>(fairygui.UIPackage.createObject("gmCmd","GMCmdItemView"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_btn = <FUIGmCmdBtn><any>(this.getChildAt(0));
	}
}