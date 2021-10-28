/*
* name;
*/
export default class EventServiceUtil{
    constructor(){

    }

    public static addEventListener(eventName: string | number, obj: any, caller: any, handler: Function):void{
        rigger.service.EventService.instance.addEventListener(eventName, obj, caller, handler);
    }

    public static removeEventListener(eventName: any, obj: any, caller: any, handler: Function):void{
        rigger.service.EventService.instance.removeEventListener(eventName, obj, caller, handler);        
    }

    public static addProtocolListener(protocolCode:number, caller:any, handler:Function):void{
        rigger.service.EventService.instance.addEventListener(protocolCode, rigger.service.NetworkService.serviceName, caller, handler);
    }

    public static removeProtocolListener(protocolCode:number, caller:any, handler:Function):void{
        rigger.service.EventService.instance.removeEventListener(protocolCode, rigger.service.NetworkService.serviceName, caller, handler);
    }
}