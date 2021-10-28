export enum LogLevel {
    Error = 1,
    Warning = 2,
    Debug = 3,
    Info = 4
}

export default class Debug {

    private static logLevel:LogLevel = LogLevel.Debug;
    public static IS_DEBUG: boolean = true;

    constructor() { 
    }

    public static Error(message:string, ...optionalParams: any[]) {
        if (Debug.IS_DEBUG) {
            console.error(message, ...optionalParams);  
        }
    }

    public static Warning(message:string, ...optionalParams: any[]) {
        if (Debug.IS_DEBUG) {
            console.warn(message, ...optionalParams); 
        }
    }

    public static Debug(message:string, ...optionalParams: any[]) {
        if (Debug.IS_DEBUG) {
            console.debug(message, ...optionalParams); 
        }
    }

    public static Info(message:string, ...optionalParams: any[]) {
        if (Debug.IS_DEBUG) {
            console.info(message, ...optionalParams); 
        }
    }

    public static log(message: string, ...optionalParams: any[]) {
        if(Debug.IS_DEBUG) {
            console.log(message, ...optionalParams);
        }
    }
}

