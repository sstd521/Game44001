import FUIFullScreenGoldAniView from "../../../fui/roomScene/FUIFullScreenGoldAniView";
import VideoPlayerView, { VideoPlayerViewParams } from "../../../commonView/VideoPlayerView";
import { VideoType } from "../../../definitions/VideoType";
import { ScreenMode } from "../../../definitions/ScreenMode";

export class FullScreenGoldAniView extends FUIFullScreenGoldAniView {
    public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
        super.constructFromXML(xml);
        this.ininGoldAni();
    }
    
    private goldVideoPlayer: VideoPlayerView;
    ininGoldAni() {
        let params: VideoPlayerViewParams = new VideoPlayerViewParams();
        params.url = "res/spine/FullScreenGold/1001.sk";
        params.type = VideoType.Skeleton;
        params.screenMode = ScreenMode.None;
        if(!this.goldVideoPlayer) {
            this.goldVideoPlayer = new VideoPlayerView();
            this.goldVideoPlayer.init(params);
            this.goldVideoPlayer.setScale(1, 1);
            this.goldVideoPlayer.setXY(675, 360);
        }
    }

    private isPlaying: boolean = false;
    playGoldAni() {
        if(this.isPlaying) return;
        if(!this.goldVideoPlayer) this.ininGoldAni();
        this.addChild(this.goldVideoPlayer);
        this.isPlaying = true;
        this.goldVideoPlayer.play("1", false, Laya.Handler.create(this, () => {
            this.isPlaying = false;
            this.goldVideoPlayer && this.goldVideoPlayer.removeFromParent();
        }))
    }

    
}