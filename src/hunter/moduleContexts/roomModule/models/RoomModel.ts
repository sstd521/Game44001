/**
 * 房间数据
 */
import * as protocol from '../../../protocol/protocols/protocols';
import * as protocolSignals from '../../../protocol/signals/signals';
import FishManager from './FishManager';
import BulletManager from './BulletManager';
import PlayerManager from './PlayerManager';
import inject = riggerIOC.inject;
import FreshFishSignal from '../../fightModule/signals/FreshFishSignal';
export default class RoomModel extends riggerIOC.Model {
    /**鱼刷新*/
    @inject(FreshFishSignal)
    private freshFishSignal: FreshFishSignal;

    public roomType: number = null;
    constructor() {
        super();
        this.addProtocolListener();
    }

    dispose() {
        this.removeProtocolListener();
    }

    private addProtocolListener() {

    }

    private removeProtocolListener() {

    }
    
    initRoomModelInfo(value: protocol.HuntingRoomInfoResp) {
        // let time = new Date();
        // console.log(`initRoomModelInfo====` + time.getTime());
        FishManager.instance.fishInfo = value.monList; //鱼列表
        BulletManager.instance.bulletInfo = value.shellList; //子弹列表
        PlayerManager.instance.playerInfo = value.playerList; //玩家列表

        //派发刷新鱼的信号
        this.freshFishSignal.dispatch(value.monList);
    }

    reset() {
        FishManager.instance.reset();
        BulletManager.instance.reset();
        PlayerManager.instance.reset();
        this.roomType = null;
    }
}