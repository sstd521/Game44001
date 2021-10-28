/**
 * 公用加载界面
 */
import AbstractLoadingView from './AbstractLoadingView';
import Utils from '../../../../utils/Utils';
import FUILoadingView from '../../../../fui/loading/FUILoadingView';
import { ScreenMode } from '../../../../definitions/ScreenMode';
import VideoPlayerView, { VideoPlayerViewParams } from '../../../../commonView/VideoPlayerView';
import { VideoType } from '../../../../definitions/VideoType';
import inject = riggerIOC.inject;
import RoomViewLoadSignal from '../../../roomModule/signals/RoomViewLoadSignal';
export default class LoadingView extends AbstractLoadingView<FUILoadingView>{

    constructor() {
        super();
        this.isCache = false;
    }

    public static getUrl(): string {
        return FUILoadingView.URL;
    }

    onInit() {
        this.initLogo();
        // Laya.stage.frameRate = 'fast';
        this.progressMaskWidth(1);
    }

    /**生成logo动画 */
    initLogo() {
        // logo
        var loadingVideoPlayer = new VideoPlayerView();
        let params: VideoPlayerViewParams = new VideoPlayerViewParams();
        params.url = "res/spine/loading/loading.sk";
        params.type = VideoType.Skeleton;
        params.screenMode = ScreenMode.None;
        loadingVideoPlayer.init(params);
        loadingVideoPlayer.setScale(1, 1);
        loadingVideoPlayer.play("1", true);
        loadingVideoPlayer.setXY(0, 0);
        this.contentPane.m_content.m_logoBox.addChild(loadingVideoPlayer);
    }

    layout() {
        // lbg
        let lbgGroup = new riggerLayout.Group(this.contentPane.m_bgl);
        lbgGroup.name = "lbgGroup";
        lbgGroup.horizontalCenter = 0;
        lbgGroup.verticalCenter = 0;
        lbgGroup.width = riggerLayout.LayoutSpec.create(1334 / 750, -1, "100%");
        lbgGroup.height = riggerLayout.LayoutSpec.create(1, 1334 / 750, "100%");
        RiggerLayout.layer.addChild(lbgGroup);

        let contentGroup: riggerLayout.Group = new riggerLayout.Group(this.contentPane.m_content);
        contentGroup.horizontalCenter = 0;
        contentGroup.verticalCenter = 0;
        contentGroup.width = riggerLayout.LayoutSpec.create(-1, 1334 / 750, '95%');
        contentGroup.height = riggerLayout.LayoutSpec.create(1334 / 750, -1, '95%');
        RiggerLayout.layer.addChild(contentGroup);

    }

    removeLayout() {
        RiggerLayout.layer.remove(this.contentPane.m_bgl);
        RiggerLayout.layer.remove(this.contentPane.m_content);
    }

    onShown() {
        super.onShown();
    }

    onHide() {
        super.onHide();
        this.removeLayout();
        // Laya.stage.frameRate = 'slow';
    }

    protected get progress(): number {
        // return 0;
        return this.currentV;
    }

    /**
     * 进度值
     */
    protected set progress(v: number) {
        // this.contentPane.m_content.m_barView.value = v;
        this.progressMaskWidth(v);
    }

    private currentV: number = 0;
    /**
     * 进度条遮罩宽度
     * @param v 
     */
    private progressMaskWidth(v: number) {
        v = Math.ceil(v);
        if(v >= 100) v = 100;
        this.currentV = v;
        let ratio = v / 100;
        let width = this.contentPane.m_content.m_barView.m_barMaskView.m_bar.width * ratio;
        this.contentPane.m_content.m_barView.m_barMaskView.m_mask.width = width;
        this.contentPane.m_content.m_barView.m_barMaskView.width = width;
        this.contentPane.m_content.m_barView.m_title.text = `${v}%`;
    }
}
