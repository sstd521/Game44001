import UIManager from "../../../manager/UIManager";
import FUIServerListView from "../../../fui/loginUi/FUIServerListView";
import EntryView from "../../../moduleContexts/entryModule/views/EntryView";
import * as protocol from "../../../protocol/protocols/protocols";
import inject = riggerIOC.inject;
import SoundController from "../../soundModule/SoundController";
import SceneNames from "../../../definitions/SceneName";
/**
* 登陆成功的命令
*/
export default class LoginSuccessCommand extends riggerIOC.Command {

	@inject(SoundController)
	private soundController: SoundController;

	constructor() {
		super();
	}

	execute(resp: protocol.LoginResp) {
		//隐藏加载界面、服务器列表选择界面
		UIManager.instance.hideLoadingView();
		UIManager.instance.hideWindowByName(FUIServerListView.URL, UIManager.instance.sceneLayer);

		// 打开界面
		this.soundController.enterScene(SceneNames.LobbyScene, SceneNames.LoginScene);
		UIManager.instance.showWindow(EntryView, true, UIManager.instance.sceneLayer);
		this.done();
	}
}