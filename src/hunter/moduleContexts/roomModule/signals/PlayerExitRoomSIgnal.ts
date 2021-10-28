/**
 * 玩家退出房间,参数携带玩家id
 */
export default class PlayerExitRoomSignal extends riggerIOC.Signal<number> {
    constructor() {
        super();
    }
}
