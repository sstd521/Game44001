/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import FUIbarMaskView from "./FUIbarMaskView";

export default class FUILoadBarView extends fairygui.GComponent {

	public m_n11:fairygui.GImage;
	public m_barMaskView:FUIbarMaskView;
	public m_fish:fairygui.GMovieClip;
	public m_title:fairygui.GTextField;

	public static URL:string = "ui://g2ixeje8ny39q";

	public static createInstance():FUILoadBarView {
		return <FUILoadBarView><any>(fairygui.UIPackage.createObject("loading","LoadBarView"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_n11 = <fairygui.GImage><any>(this.getChildAt(0));
		this.m_barMaskView = <FUIbarMaskView><any>(this.getChildAt(1));
		this.m_fish = <fairygui.GMovieClip><any>(this.getChildAt(2));
		this.m_title = <fairygui.GTextField><any>(this.getChildAt(3));
	}
}