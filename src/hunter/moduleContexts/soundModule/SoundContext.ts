import SoundController from "./SoundController";
import AssetsUtils from "../../utils/AssetsUtils";
import SoundManager from "../../manager/SoundManager";

/**
* name 
*/
export default class SoundContext extends riggerIOC.ModuleContext {
    constructor(app: riggerIOC.ApplicationContext) {
        super(app);
    }

    /**
     * 绑定注入
     */
    bindInjections(): void {
        // 绑定一个全局的背景音乐策略类
        this.injectionBinder.bind(SoundController).toSingleton();
    }

    /**
     * 绑定命令
     */
    bindCommands(): void {

    }

    /**
     * 绑定界面与Mediator
     */
    bindMediators(): void {

    }


    onStart(): void {
        SoundManager.instance.init();
        // Laya.SoundManager.useAudioMusic = false;
        // fairygui.UIConfig.buttonSound = AssetsUtils.makeSoundUrl("Currency_Button", "ddzLoading");
		// SoundManager.instance.musicVolume = 1;

		SoundManager.instance.musicVolume = Laya.LocalStorage.getItem("musicVol") ? parseInt(Laya.LocalStorage.getItem("musicVol")) / 100 : 1;
		SoundManager.instance.soundVolume = Laya.LocalStorage.getItem("soundVol") ? parseInt(Laya.LocalStorage.getItem("soundVol")) / 100 : 1;
		SoundManager.instance.effectVolume = Laya.LocalStorage.getItem("soundVol") ? parseInt(Laya.LocalStorage.getItem("soundVol")) / 100 : 1;
        this.done();
    }
}