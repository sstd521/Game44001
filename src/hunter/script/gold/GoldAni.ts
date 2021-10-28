import Gold from "./Gold";
import GoldUtils from "./GoldUtils";

export default class GoldAni {
    /**任务执行器 */
    private task: riggerIOC.TaskExecutor = null;
    /**金币原始位置 */
    private pos: Laya.Point = null;
    /**金币结束位置 */
    private endPos: Laya.Point = null;
    /**金币所需数量 */
    private needCount: number = 0;
    /**容器 */
    private context: fairygui.GComponent = null;
    /**金币组 */
    private goldArr: Gold[] = [];

    /**资源路径 */
    private url: string = '';

    constructor() { this.init(); }

    /**初始化 */
    init() {
        this.task = new riggerIOC.TaskExecutor();
    }

    /**设置数据 */
    setData(pos: Laya.Point, endPos: Laya.Point, needCount: number = 8, url: string, context: fairygui.GComponent) {
        this.pos = pos;
        this.endPos = endPos;
        this.url = url;
        this.context = context;
        this.needCount = needCount;  //暂定8，需要根据鱼类型决定
    }

    /**开始播放 */
    async play(cb?: Laya.Handler) {
        var gold: Gold = null;
        var pointArr = GoldUtils.createPos(this.pos, this.needCount);
        var doneHandle: riggerIOC.Handler = null;
        var cancelHandle: riggerIOC.Handler = null;
        var lock: riggerIOC.TaskExecutorLock = new riggerIOC.TaskExecutorLock(this.needCount);
        lock.wait();

        // 生成金币任务
        for (var i = 0, len = this.needCount; i < len; i++) {

            // 设置单个完成回调
            doneHandle = riggerIOC.Handler.create(this, () => {
                lock.done();
            })

            // 设置单个取消回调
            cancelHandle = riggerIOC.Handler.create(this, (gold: Gold) => {
                gold.destory();
                gold = null;
                lock.cancel();
            });

            gold = new Gold(this.url);
            gold.setData(pointArr[i], this.endPos, this.context);
            this.goldArr.push(gold);
            this.task.add(gold, doneHandle, null, cancelHandle, [gold]);
        }
        // console.log(`createCoinLength==${this.goldArr.length}`);

        this.task.executeAsync(20);
        await lock.wait();

        cb && cb.run();
        this.clearGoldArr();
        this.destory();
    }

    /**清理金币组 */
    clearGoldArr() {
        var arr = this.goldArr;
        // console.log(`clearCoinLength==${arr.length}`);
        for (var i = 0, len = arr.length; i < len; i++) {
            arr[i] && arr[i].destory();
            arr[i] = null;
        }
        this.goldArr = null;
    }

    /**析构 */
    destory(): void {
        this.task = null;
        this.pos = null;
        this.endPos = null;
        this.context = null;
        this.goldArr = null;
    }
}