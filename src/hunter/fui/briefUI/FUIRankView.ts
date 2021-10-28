/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import FUIrankListContentView from "./FUIrankListContentView";

export default class FUIRankView extends fairygui.GComponent {

	public m_c1:fairygui.Controller;
	public m_bg:fairygui.GImage;
	public m_n13:fairygui.GImage;
	public m_n3:fairygui.GImage;
	public m_n4:fairygui.GImage;
	public m_n5:fairygui.GImage;
	public m_n6:fairygui.GImage;
	public m_t1:fairygui.GLoader;
	public m_t0:fairygui.GLoader;
	public m_listContentView:FUIrankListContentView;

	public static URL:string = "ui://75q2l4mufc6p3f";

	public static createInstance():FUIRankView {
		return <FUIRankView><any>(fairygui.UIPackage.createObject("briefUI","RankView"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_c1 = this.getControllerAt(0);
		this.m_bg = <fairygui.GImage><any>(this.getChildAt(0));
		this.m_n13 = <fairygui.GImage><any>(this.getChildAt(1));
		this.m_n3 = <fairygui.GImage><any>(this.getChildAt(2));
		this.m_n4 = <fairygui.GImage><any>(this.getChildAt(3));
		this.m_n5 = <fairygui.GImage><any>(this.getChildAt(4));
		this.m_n6 = <fairygui.GImage><any>(this.getChildAt(5));
		this.m_t1 = <fairygui.GLoader><any>(this.getChildAt(6));
		this.m_t0 = <fairygui.GLoader><any>(this.getChildAt(7));
		this.m_listContentView = <FUIrankListContentView><any>(this.getChildAt(8));
	}
}