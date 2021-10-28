import FUIwaveAniView from "../../../fui/roomScene/FUIwaveAniView";
import VideoPlayerView, { VideoPlayerViewParams } from "../../../commonView/VideoPlayerView";
import { VideoType } from "../../../definitions/VideoType";
import { ScreenMode } from "../../../definitions/ScreenMode";

export class BgWaveAniView extends FUIwaveAniView {
	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
        super.constructFromXML(xml);
        this.initBgWaveAni();
    }
    
    initBgWaveAni() {
        let videoPlayer1: VideoPlayerView = new VideoPlayerView();
        let videoPlayer2: VideoPlayerView = new VideoPlayerView();

        let params: VideoPlayerViewParams = new VideoPlayerViewParams();
        params.url = "res/spine/bgWaveAni/water.sk";
        params.type = VideoType.Skeleton;
        params.screenMode = ScreenMode.None;

        videoPlayer1.init(params);
        videoPlayer1.setScale(1, 1);
        videoPlayer1.play("1", true);
        videoPlayer1.setXY(650, 500);

        videoPlayer2.init(params);
        videoPlayer2.setScale(1, 1);
        videoPlayer2.play("2", true);
        videoPlayer2.setXY(800 , 200);

        this.addChild(videoPlayer1);
        this.addChild(videoPlayer2);
    }
}