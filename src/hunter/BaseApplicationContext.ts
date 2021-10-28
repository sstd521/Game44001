import AssetsContext from "./moduleContexts/assetsModule/AssetsContext";
import LoginContext from "./moduleContexts/loginModule/LoginContext";
import EntryContext from "./moduleContexts/entryModule/entryContext";
import RoomContext from "./moduleContexts/roomModule/RoomContext";
import FightContext from "./moduleContexts/fightModule/FightContext";
import PlayerContext from "./moduleContexts/playerModule/PlayerContext";
import BriefContext from "./moduleContexts/briefModule/BriefContext";
import SoundContext from "./moduleContexts/soundModule/SoundContext";

/**
* 捕猎游戏的上下文
*/
export default class BaseApplicationContext extends riggerIOC.ApplicationContext {

	constructor() {
		super();
	}

	bindInjections(): void {
		this.customFairyguiGButtonFunction();
		this.customFairyguiGSliderFunction();
	}

	bindCommands(): void {
		
	}

	registerModuleContexts(): void {
		// 资源模块
		this.addModuleContext(AssetsContext);
		// 声音模块
		this.addModuleContext(SoundContext);
		// 人物模块
		this.addModuleContext(PlayerContext);
		// 登陆模块
		this.addModuleContext(LoginContext);
		//大厅模块
		this.addModuleContext(EntryContext);

		// //帮助模块
		// this.addModuleContext(help.HelpContext);
		// // 简要模块
		this.addModuleContext(BriefContext);
		// // 主场景模块
		// // this.addModuleContext(mainScene.MainSceneContext);
		// 房间模块
		this.addModuleContext(RoomContext);
		// 战斗模块
		this.addModuleContext(FightContext);
		// // 菜单模块
		// this.addModuleContext(menu.MenuContext);
		console.log(`=====BaseApplicationContext done!=====`);
	}

	customFairyguiGButtonFunction() {
		let oldSetState = fairygui.GButton.prototype["setState"];
		fairygui.GButton.prototype["setState"] = function (val: string) {
			if (!this.displayObject.getStyle()) return;
			oldSetState.apply(this, [val]);
			// 作自己的修改
			if (this._downEffect == 2) {
				if (val ==/*CLASS CONST:fairygui.GButton.DOWN*/"down" || val ==/*CLASS CONST:fairygui.GButton.SELECTED_OVER*/"selectedOver" || val ==/*CLASS CONST:fairygui.GButton.SELECTED_DISABLED*/"selectedDisabled") {
					if (!this._treatedCustom) {
						var hitW = this.width / (this.width * this.scaleX) * this.width;
						var hitH = this.height / (this.height * this.scaleY) * this.height;
						var hitX = (this.width - hitW) * 0.5;
						var hitY = (this.height - hitH) * 0.5;
						this.displayObject.hitArea = new Laya.Rectangle(hitX, hitY, hitW, hitH);
						this._treatedCustom = true;
					}
				}
				else {
					if (this._treatedCustom) {
						this.displayObject.hitArea = null;
						this._treatedCustom = undefined;
					}
				}
			}
		}
	}

	customFairyguiGSliderFunction() {
		let oldSetState = fairygui.GSlider.prototype["updateWidthPercent"];
		fairygui.GSlider.prototype["updateWidthPercent"] = function (percent: Number) {
			// 作自己的修改
			if (percent <= 0) {
				percent = 0.005;  //禁止进度条伸缩部分宽度为0
			}
			oldSetState.apply(this, [percent]);
		}
	}
}