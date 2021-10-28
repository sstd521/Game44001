/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import FUIServerContext from "./FUIServerContext";
import FUIEnterView from "./FUIEnterView";

export default class FUIServerListView extends fairygui.GComponent {

	public m_bgGraphic:fairygui.GGraph;
	public m_context:FUIServerContext;
	public m_enter:FUIEnterView;

	public static URL:string = "ui://liobtiy98eoc5";

	public static createInstance():FUIServerListView {
		return <FUIServerListView><any>(fairygui.UIPackage.createObject("loginUi","ServerListView"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_bgGraphic = <fairygui.GGraph><any>(this.getChildAt(0));
		this.m_context = <FUIServerContext><any>(this.getChildAt(1));
		this.m_enter = <FUIEnterView><any>(this.getChildAt(2));
	}
}