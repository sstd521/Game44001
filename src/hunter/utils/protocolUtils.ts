import NetworkChannelNames from "../definitions/NetworkChannelNames";

/*
* name;
*/
export default class protocolUtils {
    public static sendProtocolSync<T>(code: number, data, respSignalCls: any, channel?: string | number): Promise<T> {
        channel = channel || NetworkChannelNames.GameChannel;
        return new Promise<T>((resolve) => {
            let signal: riggerIOC.Signal<any>
                = riggerIOC.InjectionBinder.instance.bind(respSignalCls).getInstance<riggerIOC.Signal<any>>();
            signal.once(null, (resp) => {
                return resolve(resp);
            })
            rigger.service.NetworkService.instance.send(channel, code, data);
        })
    }

    constructor() {

    }
}