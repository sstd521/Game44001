import Gold from "./Gold";
export default class GoldUtils {
    /**
     * 金币标识
     */
    public static GoldSignal: string = 'GOLD_SIGNAL';

    /**
     * 获取一只金币的Ui实例
     */
    public static getGold(): Gold {
        return rigger.service.PoolService.getItemByCreateFun(GoldUtils.GoldSignal, GoldUtils.createGold);
    }

    /**
     * 回收
     * @param gold 
     */
    public static recoverGold(gold: Gold) {
        return rigger.service.PoolService.recover(GoldUtils.GoldSignal, gold);
    }

    public static createGold(url: string): fairygui.GMovieClip {
        // var gold = fairygui.UIPackage.createObject("entry", "goldAni_self").asMovieClip;
        var gold = fairygui.UIPackage.createObjectFromURL(url).asMovieClip;
        return gold;
    }

    /**
     * 生成金币位置组
     * pos 原始位置
     * len 金币个数（2 ，4 ，6， 8）
     */
    public static createPos(pos: Laya.Point, len: number): Laya.Point[] {
        var posArr: Laya.Point[] = [];
        var tempGold = GoldUtils.createGold('ui://5xl6v9kdvv7ubm');
        var w: number = tempGold.width;
        var h: number = tempGold.height;
        var minNum = 4;
        var num = 0;
        var num2 = 1;
        var num3 = 0;
        var count = 0;
        for (var i = 0; i < len; i++) {
            if (len % 2 == 0 && len % 3 != 0) {
                if (count > 3) {
                    count = 0;
                }
                if (len > minNum) {
                    if (i >= len / 2) {
                        num = w;
                    } else {
                        num = 0;
                    }
                }
                if (i % 2 == 0) {
                    num2 = -1;
                } else {
                    num2 = 1;
                }

                if (count < 2) {
                    num3 = 0;
                } else {
                    num3 = h * (-1);
                }
                var x = pos.x + (w / 2 + num) * num2;
                var y = pos.y + num3;
                count++;

            } else if (len % 3 == 0) {
                if (count > 2) {
                    count = 0;
                }
                if (count % 3 == 0) {
                    num2 = 0;
                } else if (count % 2 == 0) {
                    num2 = w;
                } else {
                    num2 = w * (-1);
                }
                if (i > 2) {
                    num3 = h * (-1);
                } else {
                    num3 = 0;
                }
                var x = pos.x + num2;
                var y = pos.y + num3;
                count++;
            }
            posArr.push(new Laya.Point(x, y));
        }

        return posArr;
    }
}