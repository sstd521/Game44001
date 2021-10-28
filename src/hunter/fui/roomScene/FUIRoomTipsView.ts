/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import FUImenuView from "./FUImenuView";
import FUITipsView from "./FUITipsView";

export default class FUIRoomTipsView extends fairygui.GComponent {

	public m_n1:fairygui.GMovieClip;
	public m_menuView:FUImenuView;
	public m_tipsView:FUITipsView;
	public m_t0:fairygui.Transition;

	public static URL:string = "ui://0lwk28v8glv2o";

	public static createInstance():FUIRoomTipsView {
		return <FUIRoomTipsView><any>(fairygui.UIPackage.createObject("roomScene","RoomTipsView"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_n1 = <fairygui.GMovieClip><any>(this.getChildAt(0));
		this.m_menuView = <FUImenuView><any>(this.getChildAt(1));
		this.m_tipsView = <FUITipsView><any>(this.getChildAt(2));
		this.m_t0 = this.getTransitionAt(0);
	}
}