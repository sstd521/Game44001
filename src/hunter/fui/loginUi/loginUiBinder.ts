/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import FUIEnterBtn from "./FUIEnterBtn";
import FUIServerItemView from "./FUIServerItemView";
import FUIServerListView from "./FUIServerListView";
import FUIEnterView from "./FUIEnterView";
import FUIDisconnectedView from "./FUIDisconnectedView";
import FUIOkBtn from "./FUIOkBtn";
import FUIServerContext from "./FUIServerContext";

export default class loginUiBinder{
	public static bindAll():void {
		fairygui.UIObjectFactory.setPackageItemExtension(FUIEnterBtn.URL, FUIEnterBtn);
		fairygui.UIObjectFactory.setPackageItemExtension(FUIServerItemView.URL, FUIServerItemView);
		fairygui.UIObjectFactory.setPackageItemExtension(FUIServerListView.URL, FUIServerListView);
		fairygui.UIObjectFactory.setPackageItemExtension(FUIEnterView.URL, FUIEnterView);
		fairygui.UIObjectFactory.setPackageItemExtension(FUIDisconnectedView.URL, FUIDisconnectedView);
		fairygui.UIObjectFactory.setPackageItemExtension(FUIOkBtn.URL, FUIOkBtn);
		fairygui.UIObjectFactory.setPackageItemExtension(FUIServerContext.URL, FUIServerContext);
	}
}