/**
 * SoundManager
 */
import Utils from '../utils/Utils';
import MyApplication from '../MyApplication';
import AssetsUtils from '../utils/AssetsUtils';
import * as GameEventNames from '../configs/GameEventNames';
import { PlaySoundType } from '../definitions/PlaySoundType';
export default class SoundManager implements SimpleManagerTemplate {

    public static get instance(): SoundManager {
        if (!SoundManager._instance) {
            SoundManager._instance = new SoundManager();
        }
        return SoundManager._instance;
    }
    private static _instance: SoundManager;

    /**
     * 是否已经静音(背景音乐)
     */
    public get musicMuted(): boolean {
        return this._musicMuted;
    }
    private _musicMuted: boolean = false;

    public ismanualColseMusic: boolean = false;

    /**
     * 背景音乐的音量
     */
    public get musicVolume(): number {
        return Laya.SoundManager.musicVolume;
    }
    public set musicVolume(v: number) {
        Laya.SoundManager.setMusicVolume(v);
        if (v <= 0) {
            // this._musicMuted = Laya.SoundManager.musicMuted = true;
            this._musicMuted = true;
        }
        else {
            // this._musicMuted = Laya.SoundManager.musicMuted = false;
            this._musicMuted = false;
        }
    }

    /**
     * 音效是否静音了
     */
    public get soundMuted(): boolean {
        return this._soundMuted;
    }
    private _soundMuted: boolean = false;
    /**
     * 游戏音效的音量
     */
    public get soundVolume(): number {
        return Laya.SoundManager.soundVolume;
    }
    public set soundVolume(v: number) {
        Laya.SoundManager.setSoundVolume(v);
        if (v <= 0) {

            // this._soundMuted = Laya.SoundManager.soundMuted = true;
            this._soundMuted = true;
        }
        else {
            // this._soundMuted = Laya.SoundManager.soundMuted = false;
            this._soundMuted = false;
        }
    }

    /**
     * 音效音量
     */
    public get effectVolume(): number {
        return this.mEffectVolume;
    }
    public set effectVolume(v: number) {
        this.mEffectVolume = v;
    }
    private mEffectVolume: number = 1;

    /**
     * 对话音量
     */
    public get dialogVolume(): number {
        return this.mDialogVolume;
    }
    public set dialogVolume(v: number) {
        this.mDialogVolume = v;
    }
    private mDialogVolume: number = 1;

    constructor() {
    }

    /**
    * 初始化接口
    */
    init() {
        Laya.SoundManager.autoStopMusic = false;
        // 初始化游戏的背景音乐
        this._initMusic();
        // this._initSoundEffect();
        // this._initVolumn();
        // this.playBGM();
        Laya.stage.on(laya.events.Event.BLUR, this, this._stageOnBlur);
        Laya.stage.on(laya.events.Event.FOCUS, this, this._stageOnFocus);
        Laya.stage.on(laya.events.Event.VISIBILITY_CHANGE, this, this._visibilityChange);
    }

    /**
     * 释放
     */
    dispose() {
        Laya.stage.off(laya.events.Event.BLUR, this, this._stageOnBlur);
        Laya.stage.off(laya.events.Event.FOCUS, this, this._stageOnFocus);
        Laya.stage.off(laya.events.Event.VISIBILITY_CHANGE, this, this._visibilityChange);
    }

    /**
     * 将指定名称的音效设定到指定按钮
     */
    // public setBtnSound(btn: fairygui.GButton, soundName: string) {
    //     let url: string = fairygui.UIPackage.getItemURL(Application.instance.mainModuleName, soundName);
    //     if (!url) return;

    //     btn.sound = url;
    // }

    /**
     * 同时设置游戏背景音乐及音效的音量
     */
    public setMusicAndSoundVolumn(v: number) {
        this._doSetMusicAndSoundVolumn(v);
        if (v > 0) {
            SoundManager.instance.ismanualColseMusic = false;
            Utils.setDefaultAudioStatus(true);
        }
        else {
            SoundManager.instance.ismanualColseMusic = true;
            Utils.setDefaultAudioStatus(false);
        }
        rigger.service.EventService.instance.dispatchEvent(GameEventNames.EVENT_GAME_SOUND_STATUS_UPDATED, SoundManager.instance);
        if (!Laya.stage.isFocused) {
            this._stageOnBlur();
        }
    }

    /**
     * 生成背景音乐地址
     */
    // public makeBGMUrls(): string[] {
    //     if (!Application.instance.registeredBGMS) return [AssetsUtils.makeSoundUrl(AssetsConfig.GAME_BACK_MUSIC)];
    //     let ret: string[] = [];
    //     let len: number = Application.instance.registeredBGMS.length;
    //     for (var i: number = 0; i < len; ++i) {
    //         ret.push(AssetsUtils.makeSoundUrl(Application.instance.registeredBGMS[i]));
    //     }
    //     return ret;
    // }

    /**
     * @public
     * @for SoundManager
     * @method playSound
     * @param {string} soundName 声音的名称，一般配置在AssetsConfigs中
     * @param {number} [loop=0] 声音的循环次数，为0表示无限循环
     * @return {SoundChannel}
     */
    public playSound(soundUrl: string, soundType: PlaySoundType = PlaySoundType.Effect, loops?, completeHandler?:Laya.Handler): Laya.SoundChannel {
        // let url: string = AssetsUtils.makeSoundUrl(soundName, pkgName);
        if (!soundUrl) return null;
        // if(this._isblurPaused) return null; 
        let cha:Laya.SoundChannel = Laya.SoundManager.playSound(soundUrl, loops, completeHandler);
        let volume:number = this.getVolumeBySoundType(soundType);
        cha && (cha.volume = volume);
        
        return cha;
    }

    /**
     * 停止声音播放（包括背景音乐和音效）。
     * @param {string} soundName 声音的名称，一般配置在AssetsConfigs中
     */
    public stopSound(soundName: string, pkgName: string): void {
        let url: string = AssetsUtils.makeSoundUrl(soundName, pkgName);
        if (!url) return null;

        Laya.SoundManager.stopSound(url);
    }

    /**
     * 停止背景音乐
     */
    public stopBGM():void{
        if(this._bgmSoundChannel) this._bgmSoundChannel.stop();
    }

    /**
     * 暂停背景音乐
     */
    public pauseBGM():void{
        if(this._bgmSoundChannel) this._bgmSoundChannel.pause();
    }

    public resumeBGM():void{
        this._bgmSoundChannel && this._bgmSoundChannel.resume();
    }

    /*private _lastPlayAnimationSoundTime:number = 0;
    private _minIntervalAnimationSound:number = 10000;*/
    private _lastAnimationSoundName: string = null;




    /**
     * 初始化整个游戏的背景音乐
     */
    private _bgmUrls: string[] = [];
    private _bgmSoundChannel: Laya.SoundChannel = null;
    private _initMusic() {
        // Laya.SoundManager['useAudioMusic'] = false;
        Laya.SoundManager.useAudioMusic = false;
        this._bgmUrls = [""];
    }

    public set bgmUrls(value: string | string[]) {
        // if(this._bmgUrl) Laya.SoundManager.stopMusic();
        if (!value) return;
        if (Utils.isString(value)) {
            value = [value];
        }
        this._bgmUrls = value;
        this.playBGM();
    }

    public playBGM() {
        // 获取背景音乐名
        if (this._bgmUrls && this._bgmUrls.length > 0) {
            this._musicIdx = Utils.random(0, this._bgmUrls.length - 1);
            if (this._bgmSoundChannel) {
                this._bgmSoundChannel.stop();
            }

            this._bgmSoundChannel = Laya.SoundManager.playMusic(this._bgmUrls[this._musicIdx], 1, Laya.Handler.create(this, this._onBMGComplete));
        }
        else{
            this._bgmSoundChannel.stop();
        }
    }

    private _onBMGComplete() {
        this.playBGM();
    }




    /**
     * 初始化游戏音效，这里初始化的是一个通用配置，各个界面还可以自己初始本界面的
     */
    private _initSoundEffect() {
    }

    private _initVolumn() {
        if (Utils.getDefaultAudioStatus()) {
            this.ismanualColseMusic = false;
            this._doSetMusicAndSoundVolumn(50);
        }
        else {
            this.ismanualColseMusic = true;
            this._doSetMusicAndSoundVolumn(0);
        }
    }

    private _doSetMusicAndSoundVolumn(v: number) {
        // this.musicVolume = v;
        // this.soundVolume = v;
        // SoundManager.instance.musicVolume = v;
        // SoundManager.instance.soundVolume = v;
        // SoundManager.instance.effectVolume = v;
        // SoundManager.instance.dialogVolume = v;
        if(v == 0) {
            SoundManager.instance.musicVolume = v;
            SoundManager.instance.soundVolume = v;
            SoundManager.instance.effectVolume = v;
        }
        else {
            SoundManager.instance.musicVolume = Laya.LocalStorage.getItem("musicVol") ? parseInt(Laya.LocalStorage.getItem("musicVol")) / 100 : 1;
            SoundManager.instance.soundVolume = Laya.LocalStorage.getItem("soundVol") ? parseInt(Laya.LocalStorage.getItem("soundVol")) / 100 : 1;
            SoundManager.instance.effectVolume = Laya.LocalStorage.getItem("soundVol") ? parseInt(Laya.LocalStorage.getItem("soundVol")) / 100 : 1;
        }
    }

    private _isblurPaused: boolean = false;
    private _position: number = 0;
    private _musicIdx: number = 0;
    private _visibilityChange() {
        if (Laya.stage.isVisibility) {
            this._stageOnFocus();
        } else {
            this._stageOnBlur();
        }
    }

    private _stageOnBlur() {
        if (!SoundManager.instance.ismanualColseMusic) {
            SoundManager.instance._doSetMusicAndSoundVolumn(0);
            // if (this._bgmSoundChannel) {
            //     this._bgmSoundChannel.pause();
            // }
            if (this._bgmSoundChannel) {
                if (this._bgmSoundChannel instanceof Laya.WebAudioSoundChannel) {
                    this._bgmSoundChannel.pause();
                } else if(this._bgmSoundChannel['_audio']) {
                    this._bgmSoundChannel.pause();
                }
            }
        }
    }

    private _stageOnFocus() {
        if (!Laya.SoundManager['_isActive']) {
            Laya.SoundManager['_isActive'] = true;
            this.playBGM();
        }
        if (!SoundManager.instance.ismanualColseMusic) {
            // console.log(Laya.SoundManager._tMusic);
            let cfg: rigger.config.MyApplicationConfig = MyApplication.instance.getConfig<rigger.config.MyApplicationConfig>();
            SoundManager.instance._doSetMusicAndSoundVolumn(cfg.defaultVolumn);
            if (this._bgmSoundChannel) {
                if (SoundManager.instance.musicVolume > 0) {
                    if (this._bgmSoundChannel instanceof Laya.WebAudioSoundChannel) {
                        this._bgmSoundChannel['_volume'] = SoundManager.instance.musicVolume;
                        if (!this._bgmSoundChannel['audioBuffer']) {
                            this.playBGM();
                        }
                    } else {
                        this._bgmSoundChannel['_audio']['volume'] = SoundManager.instance.musicVolume;
                    }
                }
                else {
                    if (this._bgmSoundChannel instanceof Laya.WebAudioSoundChannel) {
                        this._bgmSoundChannel['_volume'] = 0;
                    } else {
                        this._bgmSoundChannel['_audio']['volume'] = 0;

                    }
                }
                if (this._bgmSoundChannel instanceof Laya.WebAudioSoundChannel) {
                    this._bgmSoundChannel.resume();
                } else {
                    if (this._bgmSoundChannel['_currentTime'] <= 0) {
                        this.playBGM();
                    } else {
                        this._bgmSoundChannel.resume();
                    }
                }
            }
        }

    }

    private getVolumeBySoundType(soundType: PlaySoundType): number {
        switch (soundType) {
            case PlaySoundType.BGM:
                return SoundManager.instance.musicVolume;
            case PlaySoundType.Effect:
                return SoundManager.instance.effectVolume;
            case PlaySoundType.Dialog:
                return SoundManager.instance.dialogVolume;
            default:
                break;
        }
    }
}