/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class FUIRankItem extends fairygui.GComponent {

	public m_c1:fairygui.Controller;
	public m_isMe:fairygui.Controller;
	public m_n10:fairygui.GImage;
	public m_n23:fairygui.GImage;
	public m_rankImg:fairygui.GLoader;
	public m_n14:fairygui.GImage;
	public m_n15:fairygui.GImage;
	public m_headImg:fairygui.GLoader;
	public m_name:fairygui.GTextField;
	public m_n16:fairygui.GImage;
	public m_n17:fairygui.GImage;
	public m_goldNum:fairygui.GTextField;
	public m_numBg:fairygui.GImage;
	public m_rankNum:fairygui.GTextField;
	public m_myIcon:fairygui.GImage;

	public static URL:string = "ui://75q2l4muqw20t";

	public static createInstance():FUIRankItem {
		return <FUIRankItem><any>(fairygui.UIPackage.createObject("briefUI","RankItem"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_c1 = this.getControllerAt(0);
		this.m_isMe = this.getControllerAt(1);
		this.m_n10 = <fairygui.GImage><any>(this.getChildAt(0));
		this.m_n23 = <fairygui.GImage><any>(this.getChildAt(1));
		this.m_rankImg = <fairygui.GLoader><any>(this.getChildAt(2));
		this.m_n14 = <fairygui.GImage><any>(this.getChildAt(3));
		this.m_n15 = <fairygui.GImage><any>(this.getChildAt(4));
		this.m_headImg = <fairygui.GLoader><any>(this.getChildAt(5));
		this.m_name = <fairygui.GTextField><any>(this.getChildAt(6));
		this.m_n16 = <fairygui.GImage><any>(this.getChildAt(7));
		this.m_n17 = <fairygui.GImage><any>(this.getChildAt(8));
		this.m_goldNum = <fairygui.GTextField><any>(this.getChildAt(9));
		this.m_numBg = <fairygui.GImage><any>(this.getChildAt(10));
		this.m_rankNum = <fairygui.GTextField><any>(this.getChildAt(11));
		this.m_myIcon = <fairygui.GImage><any>(this.getChildAt(12));
	}
}