import CommandCodes from "../protocol/CommandCodes";

/**
 * Decorator
 */
export default class DecoratorUtil {
    constructor(parameters) {

    }

    /**
     * 反向映射装饰器,即以字段的值为键，以字段的键为值建立一个新的字段，只推荐常量用
     */
    public static retrievAble(v?: number) {
        return function (target: any, keyStr: string) {
            // console.log(`key str:${keyStr}, v:${v}`);
            v = v || target[keyStr];
            target[v] = keyStr;
        }
    }

    /**
     * 协议的请求装饰器
     */
    public static protocolRequest(spec: any) {
        return Reflect.metadata("protocol_request", spec);
    }

    /**
     * 协议的应答装饰器
     */
    public static protocolResponse(spec: any) {
        return Reflect.metadata("protocol_response", spec);
    }

    public static protocolResponseSignal(signalCls: any) {
        let signal = new signalCls();
        riggerIOC.InjectionBinder.instance.bind(signalCls).toValue(signal);
        return Reflect.metadata("protocol_response_signal", signal);
    }

    /**
     * 协议的协议名装饰器
     */
    public static protocolName(name: string) {
        return Reflect.metadata("protocol_name", name);
    }

    /**
     * 从元数据中获取协议号对应的请求类名
     */
    public static getProtocolRequestClassName(code: number): string {
        return Reflect.getMetadata("protocol_request", CommandCodes, CommandCodes[code]);
    }
    // public getMetaData(target:any, )

    /**
     * 从元数据中获取协议号对应的应答类名
     */
    public static getProtocolResponseClassName(code: number): any {
        // console.log(`get protocol cls, code:${code} ret:${Reflect.getMetadata("protocol_response", CommandCodes, CommandCodes[code])}`);

        return Reflect.getMetadata("protocol_response", CommandCodes, CommandCodes[code]);
    }

    public static getProtocolResponseSignal(code:number):any{
        return Reflect.getMetadata("protocol_response_signal", CommandCodes, CommandCodes[code]);
    }

    /**
     * 获取协议号对应的协议文件名
     */
    public static getProtocolName(code: number): string {
        // console.log(`get protocol name, ret:${Reflect.getMetadata("protocol_name", CommandCodes, CommandCodes[code])}`);

        return Reflect.getMetadata("protocol_name", CommandCodes, CommandCodes[code]);
    }
}