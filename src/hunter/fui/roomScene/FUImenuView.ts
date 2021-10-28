/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import FUImenuBtn from "./FUImenuBtn";
import FUImenuBtnListView from "./FUImenuBtnListView";

export default class FUImenuView extends fairygui.GComponent {

	public m_c1:fairygui.Controller;
	public m_menuBtn:FUImenuBtn;
	public m_menuBtnListView:FUImenuBtnListView;
	public m_expand:fairygui.Transition;
	public m_takeBack:fairygui.Transition;

	public static URL:string = "ui://0lwk28v8poad741";

	public static createInstance():FUImenuView {
		return <FUImenuView><any>(fairygui.UIPackage.createObject("roomScene","menuView"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_c1 = this.getControllerAt(0);
		this.m_menuBtn = <FUImenuBtn><any>(this.getChildAt(0));
		this.m_menuBtnListView = <FUImenuBtnListView><any>(this.getChildAt(1));
		this.m_expand = this.getTransitionAt(0);
		this.m_takeBack = this.getTransitionAt(1);
	}
}