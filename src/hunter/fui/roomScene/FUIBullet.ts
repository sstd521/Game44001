/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class FUIBullet extends fairygui.GComponent {

	public m_bulletLoader:fairygui.GLoader;

	public static URL:string = "ui://0lwk28v89lp3e";

	public static createInstance():FUIBullet {
		return <FUIBullet><any>(fairygui.UIPackage.createObject("roomScene","Bullet"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_bulletLoader = <fairygui.GLoader><any>(this.getChildAt(0));
	}
}