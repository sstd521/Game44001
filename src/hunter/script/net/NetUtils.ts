import FUInet from "../../fui/roomScene/FUInet";

export default class NetUtils {
    constructor() {};

    public static NetSignal: string = 'NET_SIGNAL';

    /**
     * 获取捕捉网
     */
    public static getNet(): FUInet {
        return rigger.service.PoolService.instance.getItemByCreateFun(NetUtils.NetSignal, NetUtils.createNet);
    }

    public static recoverNet(net: FUInet) {
        net.removeFromParent();
        rigger.service.PoolService.instance.recover(NetUtils.NetSignal, net);
    }

    private static createNet(): FUInet {
        let net: FUInet=  FUInet.createInstance();
        return net;
    }
}