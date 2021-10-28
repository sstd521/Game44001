import NormalFish from "../fishScript/NormalFish";
import FUINormalFish from "../../../fui/roomScene/FUINormalFish";
import AbstractFish from "../fishScript/AbstractFish";
import FUITriStarFish from "../../../fui/roomScene/FUITriStarFish";
import FUIFourFish from "../../../fui/roomScene/FUIFourFish";
import TriStarFish from "../fishScript/TriStarFish";
import FourFish from "../fishScript/FourFish";

export default class FishUtils {
    /**
     * 普通鱼标识
     */
    public static normalFishSignal: string = 'NORMAL_FISH_SIGNAL';

    /**大三元标识 */
    public static triStarFishSignal: string = 'TRISTAR_FISH_SIGNAL';

    /**大四喜标识 */
    public static fourFishSIgnal: string = 'FOUR_FISH_SIGNAL';

    /**
     * 获取一只普通鱼的Ui实例
     */
    public static getNormalFish(): FUINormalFish {
        return rigger.service.PoolService.getItemByCreateFun(FishUtils.normalFishSignal, FishUtils.createNormalFish);
    }

    /**获取一只大三元的Ui实例 */
    public static getTriStarFish(): FUITriStarFish {
        return rigger.service.PoolService.getItemByCreateFun(FishUtils.triStarFishSignal, FishUtils.creatTriStarFish);
    }

    /**获取一只大四喜的Ui实例 */
    public static getFourFish(): FUIFourFish {
        return rigger.service.PoolService.getItemByCreateFun(FishUtils.fourFishSIgnal, FishUtils.creatFourFish);
    }

    /**
     * 回收
     * @param fish 
     */
    public static recoverFish(fish: fairygui.GObject) {
        fish.data = null;
        fish.removeFromParent();
        if(fish instanceof FUINormalFish) {
            return rigger.service.PoolService.recover(FishUtils.normalFishSignal, fish);
        }
        else if(fish instanceof FUITriStarFish) {
            return rigger.service.PoolService.recover(FishUtils.triStarFishSignal, fish);
        }
        else if(fish instanceof FUIFourFish) {
            return rigger.service.PoolService.recover(FishUtils.fourFishSIgnal, fish);
        }
        else {
            console.log(` Fish recovery failure.`);
            console.log(fish);
            console.log(` Fish recovery failure.`);
        }
    }

    // /**
    //  * 回收
    //  * @param fish 
    //  */
    // public static recoverNormalFish(fish: any) {
    //     // console.log(`recoverFish`);
    //     console.log(typeof(fish));
    //     console.log(fish instanceof FUINormalFish);
    //     fish.data = null;
    //     fish.removeFromParent();
    //     return rigger.service.PoolService.recover(FishUtils.normalFishSignal, fish);
    // }


    public static createNormalFish(): FUINormalFish {
        //实例
        let fish: FUINormalFish = FUINormalFish.createInstance();
        fish.displayObject.addComponent(NormalFish);
        return fish;
    }

    public static creatTriStarFish(): FUITriStarFish {
        let fish: FUITriStarFish = FUITriStarFish.createInstance();
        fish.displayObject.addComponent(TriStarFish);
        return fish;
    }

    public static creatFourFish(): FUIFourFish {
        let fish: FUIFourFish = FUIFourFish.createInstance();
        fish.displayObject.addComponent(FourFish);
        return fish;
    }
}