import FUISettingView from "../../../fui/briefUI/FUISettingView";
import SoundManager from "../../../manager/SoundManager";

export default class SettingView extends FUISettingView {
    constructor() {
        super();
    }

    protected constructFromXML(xml: any): void {
        super.constructFromXML(xml);
        this.init();
    }

    private init() {
        this.addEventListener();
        this.initSoundAndMusicVol();
    }

    /**添加监听 */
    addEventListener() {
        this.m_music_slider.on(fairygui.Events.STATE_CHANGED, this, this.handleMusicVolChanged);
        this.m_sound_slider.on(fairygui.Events.STATE_CHANGED, this, this.handleSoundVolChanged);
    }

    /**移除监听 */
    removeEventListener() {
        
    }

    /**初始化音量 */
    initSoundAndMusicVol() {
        let localSoundVol = !isNaN(parseInt(Laya.LocalStorage.getItem("soundVol"))) ? parseInt(Laya.LocalStorage.getItem("soundVol")) : 80;
        let localMusicVol = !isNaN(parseInt(Laya.LocalStorage.getItem("musicVol"))) ? parseInt(Laya.LocalStorage.getItem("musicVol")) : 80;
        this.m_sound_slider.value = localSoundVol;
        this.m_music_slider.value = localMusicVol;
    }

    handleMusicVolChanged() {
        let localMusicVol = this.m_music_slider.value;
        if(localMusicVol <= 0.005) {
            localMusicVol = 0;
        }
        Laya.LocalStorage.setItem("musicVol", `${localMusicVol}`);
        SoundManager.instance.musicVolume = localMusicVol / 100;
    }

    handleSoundVolChanged() {
        let localSoundVol = this.m_sound_slider.value;
        if(localSoundVol <= 0.005) {
            localSoundVol = 0;
        }
        Laya.LocalStorage.setItem("soundVol", `${localSoundVol}`);
        SoundManager.instance.soundVolume = localSoundVol / 100;
        SoundManager.instance.effectVolume = localSoundVol / 100;
    }
}