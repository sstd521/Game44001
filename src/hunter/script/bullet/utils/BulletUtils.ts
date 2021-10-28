import FUIBullet from "../../../fui/roomScene/FUIBullet";
import NormalBullet from "../bulletScript/NormalBullet";

export default class BulletUtils {
    constructor() {
    }

    public static bulletSignal: string = 'BULLET_SIGNAL';

    /**
     * 普通子弹实例
     */
    public static getBullet(): FUIBullet {
        return rigger.service.PoolService.instance.getItemByCreateFun(BulletUtils.bulletSignal, BulletUtils.creatBullet);
    }

    /**
     * 回收
     * @param bullet 
     */
    public static recoverBullet(bullet: FUIBullet) {
        // console.log(`recoverBullet`);
        bullet.removeFromParent();
        rigger.service.PoolService.instance.recover(this.bulletSignal, bullet);
    }

    public static creatBullet(): FUIBullet {
        //实例
        let bullet: FUIBullet = FUIBullet.createInstance();
        bullet.displayObject.addComponent(NormalBullet);
        return bullet;
    }

}