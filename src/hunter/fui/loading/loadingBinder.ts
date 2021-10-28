/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import FUILoadingContentView from "./FUILoadingContentView";
import FUILoadingView from "./FUILoadingView";
import FUIDynamicLoadingView from "./FUIDynamicLoadingView";
import FUILoadBarView from "./FUILoadBarView";
import FUIbarMaskView from "./FUIbarMaskView";

export default class loadingBinder{
	public static bindAll():void {
		fairygui.UIObjectFactory.setPackageItemExtension(FUILoadingContentView.URL, FUILoadingContentView);
		fairygui.UIObjectFactory.setPackageItemExtension(FUILoadingView.URL, FUILoadingView);
		fairygui.UIObjectFactory.setPackageItemExtension(FUIDynamicLoadingView.URL, FUIDynamicLoadingView);
		fairygui.UIObjectFactory.setPackageItemExtension(FUILoadBarView.URL, FUILoadBarView);
		fairygui.UIObjectFactory.setPackageItemExtension(FUIbarMaskView.URL, FUIbarMaskView);
	}
}