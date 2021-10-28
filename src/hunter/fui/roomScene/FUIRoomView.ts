/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import FUIBackgroundView from "./FUIBackgroundView";
import FUIContentView from "./FUIContentView";

export default class FUIRoomView extends fairygui.GComponent {

	public m_bg:FUIBackgroundView;
	public m_content:FUIContentView;

	public static URL:string = "ui://0lwk28v89lp38";

	public static createInstance():FUIRoomView {
		return <FUIRoomView><any>(fairygui.UIPackage.createObject("roomScene","RoomView"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.m_bg = <FUIBackgroundView><any>(this.getChildAt(0));
		this.m_content = <FUIContentView><any>(this.getChildAt(1));
	}
}