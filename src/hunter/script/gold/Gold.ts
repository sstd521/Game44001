import GoldUtils from "./GoldUtils";
export default class Gold extends riggerIOC.BaseWaitable {

    /**动画主体 */
    private ani: fairygui.GMovieClip = null;
    /**金币动画宽度 */
    public aniW: number = 0;
    /**金币动画高度 */
    public aniH: number = 0;
    /**起始位置 */
    private startPoint: Laya.Point = null;
    /** 结束位置*/
    private endPoint: Laya.Point = null;
    /**容器 */
    private context: fairygui.GComponent = null;

    constructor(url: string) {
        super();
        this.init(url);
    }

    init(url: string) {
        this.ani = GoldUtils.createGold(url);
        this.aniW = this.ani.width;
        this.aniH = this.ani.height;
    }

    /**设置数据 */
    setData(startPoint: Laya.Point, endPoint: Laya.Point, context: fairygui.GComponent): void {
        this.startPoint = startPoint;
        this.endPoint = endPoint;
        this.context = context;
    }

    /**播放动画 */
    private async playAni() {
        this.ani.pivotX = 0.5;
        this.ani.pivotY = 0.5;
        this.ani.rotation = 0;
        this.ani.playing = true;
        this.ani.setXY(this.startPoint.x, this.startPoint.y);
        this.context.addChild(this.ani);

        var tween = riggerLayaSync.SyncTween.to(this.ani, { y: this.startPoint.y - 100 }, 250, Laya.Ease.linearNone, Laya.Handler.create(this, () => {
            Laya.Tween.clearTween(tween);
        }));
        await tween.wait();

        tween = riggerLayaSync.SyncTween.to(this.ani, { y: this.startPoint.y }, 250, Laya.Ease.backIn);
        await tween.wait();

        var lock = new riggerIOC.TaskExecutorLock(2);
        var lockWaiter = lock.wait();
        var tween2 = Laya.Tween.to(this.ani, { y: this.endPoint.y, ScaleX: 0.2, ScaleY: 0.2, alpha: 0.5 }, 400, Laya.Ease.backIn, Laya.Handler.create(this, () => {
            lock.done();
        }));
        var tween3 = Laya.Tween.to(this.ani, { x: this.endPoint.x, }, 400, null, Laya.Handler.create(this, () => {
            lock.done();
        }));
        await lockWaiter;

        tween && Laya.Tween.clearTween(tween);
        tween2 && Laya.Tween.clearTween(tween2);
        tween3 && Laya.Tween.clearTween(tween3);
        this.done();

        this.destory();
    }

    protected startTask(): Gold {
        this.playAni();
        return this;
    }

    /**析构 */
    destory() {
        this.ani && this.ani.dispose();
        this.ani = null;
        this.startPoint = null;
        this.endPoint = null;
        this.recover();
        super.dispose();
    }


    /**回收 */
    recover(): Gold {
        GoldUtils.recoverGold(this);
        return this;
    }
}