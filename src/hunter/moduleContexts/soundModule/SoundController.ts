import PlaySoundSpecific from "./PlaySoundSpecific";
import SoundManager from "../../manager/SoundManager";
import { PlaySoundType } from "../../definitions/PlaySoundType";
import Utils from "../../utils/Utils";
import SceneNames from "../../definitions/SceneName";
import AssetsUtils from "../../utils/AssetsUtils";
import SoundContext from "./SoundContext";
import SoundEvents from "./SoundEvents";

/**
* 场景背景音乐的策略接口
*/
export default class SoundController {
    public events: {};
    constructor() {
        // this.registerEvent();
    }

    /** 
     * 注册声音事件时的回调
     * 返回需要注册的事件列表
     * 
     */
    // protected onRegisterEvent(): string[] {
    // 	return null;
    // }

    /**
     * 进入场景时的回调
     * 返回新的背景音乐地址列表
     * 如果不发生任何变化，请返回null
     * @param scene 
     * @param oldScene 
     */
    protected onEnterScene(scene: string | number, oldScene: string | number): PlaySoundSpecific[] {
        switch (scene) {
            case SceneNames.LobbyScene:
                return [new PlaySoundSpecific(AssetsUtils.makeSoundUrl("lobbyBgm", "loading"), PlaySoundType.BGM, 0)];
            case SceneNames.RoomScene:
                return [new PlaySoundSpecific(AssetsUtils.makeSoundUrl("roomBgm", "loading"), PlaySoundType.BGM, 0)];
            default:
                return null;
        }
    }

    /**
     * 有特定时间发生时的回调
     * 返回新的背景音乐地址列表
     * 如果不发生任何变化，请返回null
     * @param scene 
     * @param event 
     * @param data 
     */
    protected onEvent(event: string | number, ...data: any[]): PlaySoundSpecific[] {
        switch (event) {
            case SoundEvents.BULLET:
                return [new PlaySoundSpecific(AssetsUtils.makeSoundUrl("bullet", "loading"), PlaySoundType.Effect)];
            case SoundEvents.BOOM_FISH:
                return [new PlaySoundSpecific(AssetsUtils.makeSoundUrl("boomFish", "loading"), PlaySoundType.Effect)];
            case SoundEvents.CATCH_ALL:
                return [new PlaySoundSpecific(AssetsUtils.makeSoundUrl("catchAll", "loading"), PlaySoundType.Effect)];
            case SoundEvents.COIN_IN:
                return [new PlaySoundSpecific(AssetsUtils.makeSoundUrl("coinIn", "loading"), PlaySoundType.Effect)];
            case SoundEvents.COIN_JUMP:
                return [new PlaySoundSpecific(AssetsUtils.makeSoundUrl("coinJump", "loading"), PlaySoundType.Effect)];
            case SoundEvents.FISH_TIDE:
                return [new PlaySoundSpecific(AssetsUtils.makeSoundUrl("fishTide", "loading"), PlaySoundType.Effect)];
            case SoundEvents.FISH_IN:
                return [new PlaySoundSpecific(AssetsUtils.makeSoundUrl("19_20fishIn", "loading"), PlaySoundType.Effect)];
            case SoundEvents.FISH_DEAD:
                return [new PlaySoundSpecific(AssetsUtils.makeSoundUrl("fishDead", "loading"), PlaySoundType.Effect)];
            case SoundEvents.ICE_FISH:
                return [new PlaySoundSpecific(AssetsUtils.makeSoundUrl("iceFish", "loading"), PlaySoundType.Effect)];
            default:
                break;
        }
        return null;
    }

    /**
     * 注册事件
     * 返回需要注册的事件
     * @param event 
     */
    // private registerEvent(): void {
    // 	if (!this.events) this.events = {};

    // 	// 预注册一些声音事件
    // 	this.events[SoundEvents.StartDeelCards] = true;
    // 	this.events[SoundEvents.GiveDiscarding] = true;
    // 	this.events[SoundEvents.MinRemainedCardsNum] = true;
    // 	this.events[SoundEvents.ShowFightOverView] = true;
    // 	this.events[SoundEvents.TimeOutAlarm] = true;

    // 	let add: string[] = this.onRegisterEvent();
    // 	if (add && add.length > 0) {
    // 		for (var i: number = 0; i < add.length; ++i) {
    // 			this.events[add[i]] = true;
    // 		}
    // 	}
    // }


    /**
     * 进入场景
     * 返回新的背景音乐地址
     * @param scene 
     * @param oldScene 
     */
    enterScene(scene: string | number, oldScene: string | number): void {
        let specs: PlaySoundSpecific[] = this.onEnterScene(scene, oldScene);
        if (!specs || specs.length <= 0) return;

        // 提取出背景声音
        // 提取出背景声音
        let bgmUrls: string[] = [];
        let effects: PlaySoundSpecific[] = [];
        let dialogs: PlaySoundSpecific[] = [];
        this.filterSoundSpecs(specs, bgmUrls, effects, dialogs);

        this.applySound(bgmUrls, effects, dialogs);

    }

    /**
     * 派发特定事件
     * 返回新的背景音乐地址列表
     * @param scene 
     * @param event 
     * @param data 
     */
    dispatch(event: string | number, ...data: any[]): void {
        let specs: PlaySoundSpecific[] = this.onEvent(event, ...data);
        if (!specs || specs.length <= 0) return;

        // 提取出背景声音
        let bgmUrls: string[] = [];
        let effects: PlaySoundSpecific[] = [];
        let dialogs: PlaySoundSpecific[] = [];
        this.filterSoundSpecs(specs, bgmUrls, effects, dialogs);

        this.applySound(bgmUrls, effects, dialogs);
    }

    /**
     * 应用声音()
     * @param bgmUrls 
     * @param nonBgmSpecs 
     */
    protected applySound(bgmUrls: string[], effects: PlaySoundSpecific[], dialogs: PlaySoundSpecific[]) {
        // 背景
        if (bgmUrls && bgmUrls.length > 0) {
            SoundManager.instance.bgmUrls = bgmUrls;
        }

        if (effects && effects.length > 0) {
            if (effects.length === 1) {
                SoundManager.instance.playSound(effects[0].url, PlaySoundType.Effect, effects[0].loops, effects[0].completeHandler);
            }
            else {
                // 随机一个
                let idx: number = Utils.random(0, effects.length - 1);
                SoundManager.instance.playSound(effects[idx].url, PlaySoundType.Effect, effects[idx].loops, effects[idx].completeHandler);

            }
        }

        if (dialogs && dialogs.length > 0) {
            if (dialogs.length === 1) {
                SoundManager.instance.playSound(dialogs[0].url, PlaySoundType.Dialog, dialogs[0].loops, dialogs[0].completeHandler);
            }
            else {
                // 随机一个
                let idx: number = Utils.random(0, effects.length - 1);
                SoundManager.instance.playSound(dialogs[idx].url, PlaySoundType.Dialog, dialogs[idx].loops, dialogs[idx].completeHandler);
            }
        }
    }

    private filterSoundSpecs(specs: PlaySoundSpecific[], bgmUrls: string[], effects: PlaySoundSpecific[], dialogs: PlaySoundSpecific[]): void {
        if (specs) {
            // 提取出背景声音
            for (var i: number = 0; i < specs.length; ++i) {
                switch (specs[i].soundType) {
                    case PlaySoundType.BGM:
                        bgmUrls.push(specs[i].url);
                        break;
                    case PlaySoundType.Effect:
                        effects.push(specs[i]);
                        break;
                    case PlaySoundType.Dialog:
                        effects.push(specs[i]);
                        break;
                    default:
                        break;
                }
            }
        }
    }
}