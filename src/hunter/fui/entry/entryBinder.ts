/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import FUIEntryView from "./FUIEntryView";
import FUIEntryHeadView from "./FUIEntryHeadView";
import FUIEntryItem from "./FUIEntryItem";
import FUIInfoView from "./FUIInfoView";
import FUIMenuView from "./FUIMenuView";
import FUIMenuBtn from "./FUIMenuBtn";
import FUIbg from "./FUIbg";

export default class entryBinder{
	public static bindAll():void {
		fairygui.UIObjectFactory.setPackageItemExtension(FUIEntryView.URL, FUIEntryView);
		fairygui.UIObjectFactory.setPackageItemExtension(FUIEntryHeadView.URL, FUIEntryHeadView);
		fairygui.UIObjectFactory.setPackageItemExtension(FUIEntryItem.URL, FUIEntryItem);
		fairygui.UIObjectFactory.setPackageItemExtension(FUIInfoView.URL, FUIInfoView);
		fairygui.UIObjectFactory.setPackageItemExtension(FUIMenuView.URL, FUIMenuView);
		fairygui.UIObjectFactory.setPackageItemExtension(FUIMenuBtn.URL, FUIMenuBtn);
		fairygui.UIObjectFactory.setPackageItemExtension(FUIbg.URL, FUIbg);
	}
}