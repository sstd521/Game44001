/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import FUILoopBackgroundView_1 from "./FUILoopBackgroundView_1";
import FUIwaveAniView from "./FUIwaveAniView";
import FUILoopBackgroundView_2 from "./FUILoopBackgroundView_2";

export default class FUIBackgroundView extends fairygui.GComponent {

	public m_bg1_1:FUILoopBackgroundView_1;
	public m_bg2_1:FUILoopBackgroundView_1;
	public m_waveAniView:FUIwaveAniView;
	public m_bg1_2:FUILoopBackgroundView_2;
	public m_bg2_2:FUILoopBackgroundView_2;
	public m_t0:fairygui.Transition;
	public m_t1:fairygui.Transition;

	public static URL:string = "ui://0lwk28v89lp39";

	public static createInstance():FUIBackgroundView {
		return <FUIBackgroundView><any>(fairygui.UIPackage.createObject("roomScene","BackgroundView"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_bg1_1 = <FUILoopBackgroundView_1><any>(this.getChildAt(0));
		this.m_bg2_1 = <FUILoopBackgroundView_1><any>(this.getChildAt(1));
		this.m_waveAniView = <FUIwaveAniView><any>(this.getChildAt(2));
		this.m_bg1_2 = <FUILoopBackgroundView_2><any>(this.getChildAt(3));
		this.m_bg2_2 = <FUILoopBackgroundView_2><any>(this.getChildAt(4));
		this.m_t0 = this.getTransitionAt(0);
		this.m_t1 = this.getTransitionAt(1);
	}
}