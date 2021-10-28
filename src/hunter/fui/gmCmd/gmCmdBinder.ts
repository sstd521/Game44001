/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import FUIGMCmdItemView from "./FUIGMCmdItemView";
import FUIGmView from "./FUIGmView";
import FUIGmViewContent from "./FUIGmViewContent";
import FUILongBtn from "./FUILongBtn";
import FUIGmBtn from "./FUIGmBtn";
import FUIGmCmdBtn from "./FUIGmCmdBtn";

export default class gmCmdBinder{
	public static bindAll():void {
		fairygui.UIObjectFactory.setPackageItemExtension(FUIGMCmdItemView.URL, FUIGMCmdItemView);
		fairygui.UIObjectFactory.setPackageItemExtension(FUIGmView.URL, FUIGmView);
		fairygui.UIObjectFactory.setPackageItemExtension(FUIGmViewContent.URL, FUIGmViewContent);
		fairygui.UIObjectFactory.setPackageItemExtension(FUILongBtn.URL, FUILongBtn);
		fairygui.UIObjectFactory.setPackageItemExtension(FUIGmBtn.URL, FUIGmBtn);
		fairygui.UIObjectFactory.setPackageItemExtension(FUIGmCmdBtn.URL, FUIGmCmdBtn);
	}
}