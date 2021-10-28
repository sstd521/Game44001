/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import FUIBatteryView from "./FUIBatteryView";
import FUIlockBtn from "./FUIlockBtn";
import FUIunLockBtn from "./FUIunLockBtn";

export default class FUIBulletView extends fairygui.GComponent {

	public m_c1:fairygui.Controller;
	public m_attackModelControl:fairygui.Controller;
	public m_player1:FUIBatteryView;
	public m_player2:FUIBatteryView;
	public m_player3:FUIBatteryView;
	public m_player4:FUIBatteryView;
	public m_lockBtn:FUIlockBtn;
	public m_autoFireBtn:FUIunLockBtn;
	public m_lockTipLoader:fairygui.GLoader;
	public m_autoTipLoader:fairygui.GLoader;
	public m_goldPosition:fairygui.GImage;
	public m_attackModelAniView:fairygui.GComponent;

	public static URL:string = "ui://0lwk28v89lp3g";

	public static createInstance():FUIBulletView {
		return <FUIBulletView><any>(fairygui.UIPackage.createObject("roomScene","BulletView"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_c1 = this.getControllerAt(0);
		this.m_attackModelControl = this.getControllerAt(1);
		this.m_player1 = <FUIBatteryView><any>(this.getChildAt(0));
		this.m_player2 = <FUIBatteryView><any>(this.getChildAt(1));
		this.m_player3 = <FUIBatteryView><any>(this.getChildAt(2));
		this.m_player4 = <FUIBatteryView><any>(this.getChildAt(3));
		this.m_lockBtn = <FUIlockBtn><any>(this.getChildAt(4));
		this.m_autoFireBtn = <FUIunLockBtn><any>(this.getChildAt(5));
		this.m_lockTipLoader = <fairygui.GLoader><any>(this.getChildAt(6));
		this.m_autoTipLoader = <fairygui.GLoader><any>(this.getChildAt(7));
		this.m_goldPosition = <fairygui.GImage><any>(this.getChildAt(8));
		this.m_attackModelAniView = <fairygui.GComponent><any>(this.getChildAt(9));
	}
}