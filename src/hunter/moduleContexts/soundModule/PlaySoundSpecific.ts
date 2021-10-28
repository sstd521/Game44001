import { PlaySoundType } from "../../definitions/PlaySoundType";
import { SoundOperateType } from "./SoundOperateType";

/**
* 声音播放设置
*/
export default class PlaySoundSpecific {
	/**
	  * 将要操作的声音的地址
	  */
	url: string;

	/**
	  * 声音类型（背景，音效，对话),默认为音效
	  */
	soundType: PlaySoundType = PlaySoundType.Effect;


	/**
	  * 要对声音执行何种操作
	  */
	operateType?: SoundOperateType = SoundOperateType.Play;

	/**
	  * 循环次数(0表示无限循环)
	  * 只有当操作类型为播放时有效
	  */
	loops?: number;

	/**
	  * 播放完成时的回调
	  * 只有当操作类型为播放时有效
	  * 
	  */
	completeHandler?: Laya.Handler;

	constructor(url: string, soundType: PlaySoundType = PlaySoundType.Effect, loops?: number, completeHandler?: Laya
		.Handler, operateType: SoundOperateType = SoundOperateType.Play) {
		this.url = url;
		this.soundType = soundType;
		this.loops = loops;
		this.completeHandler = completeHandler;
		this.operateType = operateType;

	}
}