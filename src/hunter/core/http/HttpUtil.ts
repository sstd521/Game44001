/**
 * HttpUtil
 */
class HttpUtil {
    constructor() {
        
    }

    /**
     * get请求params=[{key, value}]
     */
    public static get(url:string, params:any, caller:any, successHandler: Function, errorHandler:Function) { 
        var data:string = "";
        if (params && params != null) {
             for(var key in params) {
                data += key + "=" + params[key] + "&";
            }
            data = data.substring(0, data.length - 1); 
            HttpUtil.send(url + "?" + data, null, "get", caller, successHandler, errorHandler);
        }  
        else 
        {
            HttpUtil.send(url, null, "get", caller, successHandler, errorHandler);
        }
      
    }

    /**
     * post请求params=[{key, value}]
     */
    public static post(url:string, params:Object, caller:any, successHandler: Function, errorHandler:Function) { 
        var data:string = "";
        if (params && params != null) {
             for(var key in params) {
                data += key + "=" + params[key] + "&";
            }
            data = data.substring(0, data.length - 1); 
        } 
        HttpUtil.send(url, data, "post", caller, successHandler, errorHandler);
    }

    public static send(url:string, params:string, method:string, caller:any, successHandler: Function, errorHandler:Function, responseType?:string ,head?:any[]) {
        alert(url);
        var request:laya.net.HttpRequest = new laya.net.HttpRequest();
        request.on(laya.events.Event.COMPLETE, caller, successHandler, request.data);
        request.on(laya.events.Event.ERROR, caller, errorHandler);
        request.on(laya.events.Event.ERROR, caller, errorHandler);
        request.send(url, params, method, responseType, ["Access-Control-Allow-Origin：* ",]); 
    }

    public static AjaxGet():void {
        
    }
    
}