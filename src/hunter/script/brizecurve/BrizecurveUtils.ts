/**
 * 关于贝塞尔曲线的工具类
 */
import EaseFun from "./EaseFun/EaseFun";
export default class BrizecurveUtils {
    /**
     * 根据当前时间获取对应的路程百分比t
     * @param pathEffect 
     * @param currentTime 
     */
    public static getPercentByTime(pathEffect: {percent: number, time: number, effectLabel: string}[], currentTime: number) {
        let oldStateTime: number = 0;
        let oldStatePercent: number = 0;
        for(let i= 0; i < pathEffect.length; i++) {
            if(currentTime > oldStateTime + pathEffect[i].time) {  // 阶段 i 已经完成
                oldStatePercent += pathEffect[i].percent;
                oldStateTime += pathEffect[i].time;
                if(i < pathEffect.length - 1) {
                    continue;
                }
                else {
                    return 1;
                }
            } 
            let t = EaseFun[pathEffect[i].effectLabel](currentTime - oldStateTime, 0, 1, pathEffect[i].time) * pathEffect[i].percent + oldStatePercent;
            t = Number(t.toFixed(3));
            return t;
        }
    }
}