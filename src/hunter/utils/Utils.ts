import ConnectService from "../gameServices/connectService/ConnectService";
import { $language } from '../language/LanguageProxy'
import { ScreenMode } from "../definitions/ScreenMode";
import { PlatformAndScreenMode } from "../definitions/PlatformAndScreenMode";
/**
 * Utils
 */
    export default class Utils {
        public static createEventHandler(caller: any, method: Function, args?: Array<any>, once?: boolean) {
            return laya.utils.Handler.create(caller, method, args, once);
        }

        /**
         * 是否打开Log日志
         */
        public static IS_SHOW_LOG: boolean = false;

        public static IS_DEBUG: boolean = false;

        public static IS_SHOW_GUID_VIEW: boolean = true;

        /**
         * 长按时间
         */
        public static LONG_PRESS_TIME:number = 1000;

        /**
         * 将一个64位整型转换成一个int型数组(高低位分离)
         * @public
         * @static
         * @method resoleInt64
         * @param {number} int64 需要转换的64位整型
         * @return {number[]} 一个包含两个32位整型的数组
         */
        public static resoleInt64(int64: number): number[] {
            var s = 2 ** 32;
            var r = int64 % s;
            var d = (int64 - r) / s;
            return [d, r];
        }

        /**
         * 将一个int数据组(高低位)转成一个long型
         * @public
         * @static
         * @method combineInt64
         * @param {number[]} ints 一个包含两个32位整型的数组
         * 
         */
        public static combineInt64(ints: number[]) {
            var s = 2 ** 32;
            return ints[0] * s + ints[1];
        }

        /**
         * 计算方向的角度
         * @public
         */
        public static calculateAngle(x, y): number {
            return Utils.calculateRadian(x, y) * 180 / Math.PI
        }

        /**
         * 计算方向的弧度
         */
        public static calculateRadian(x, y): number {
            return Math.atan2(y, x);
        }

        constructor() {
        }

        /**
         * 从数组中移除某一个元素
         * @public
         * @static
         * @method removeFromArray
         * @param {any[]} arr 需要操作的数组
         * @param {any} ele 需要移除的元素
         * @return {any[]} 移除元素后的新数组
         */
        public static removeFromArray(arr: any[], ele: any):any[] {
            var idx: number = arr.indexOf(ele);
            if (idx >= 0) {
                return Utils.removeAtFromArray(arr, idx);
            }

            return arr;
        }

        /**
         * 从数组查找并返回符合条件的第一个元素的索引，只返回最先查找到的满足条件的元素的索引,如果没找到则返回-1
         * @param arr 要查找的数组
         * @param conditionFun 过滤条件函数,当返回true时，则返回，否则继续查找,该函数第一个参数是数组的元素，第二个参数是当前元素的索引，第三个参数是数组本身
         * @param startIndex 开始查找的索引
         */
        public static findIndexFromArray<T>(arr:T[], conditionFun:(ele:T, idx?:number, arr?:T[]) => boolean, startIndex:number = 0):number
        {
            if(startIndex >= arr.length)
            {
                return -1;
            }

            for(; startIndex < arr.length; ++ startIndex)
            {
                if(conditionFun(arr[startIndex], startIndex, arr))
                {
                    return startIndex;
                }
            }

            return -1;
        }
        

        public static formatCountDown(seconds:number):string
        {
            // console.log("sec:" + seconds);
            
            var h:number = Math.floor(seconds / 3600);
            var mseconds:number = seconds - h * 3600;
            var m:number = Math.floor(mseconds / 60);
            var s:number = mseconds - m * 60;

            return `${this.padLeft( h, 2)}:${this.padLeft(m, 2)}:${this.padLeft(s, 2)}`;
        }

        public static formatCountDown2(seconds:number):string
        {
            // console.log("sec:" + seconds);
            
            // var h:number = Math.floor(seconds / 3600);
            // var mseconds:number = seconds - h * 3600;
            var m:number = Math.floor(seconds / 60);
            var s:number = seconds - m * 60;

            return `${this.padLeft(m, 2)}:${this.padLeft(s, 2)}`;
        }


        /** 12:30:21 ，毫秒级1484139541000 */
        public static formatTimeHMS(time:number):string
        {
            var data:Date = new Date(time);
            var h = data.getHours();
            var m = data.getMinutes();
            var s = data.getSeconds();

            return `${this.padLeft( h, 2)}:${this.padLeft(m, 2)}:${this.padLeft(s, 2)}`;
            // return data.toLocaleDateString();
        }

        /** 12:30 ，毫秒级1484139541000 */
        public static formatTimeHM(time:number):string
        {
            var data:Date = new Date(time);
            var h = data.getHours();
            var m = data.getMinutes();

            return `${this.padLeft( h, 2)}:${this.padLeft(m, 2)}`;
            // return data.toLocaleDateString();
        }

        /** 2016.10.24 ，毫秒级1484139541000 */
        public static formatTimeYMD(time:number):string
        {
            let data:Date = new Date(time);
            let y = data.getFullYear();
            let m = data.getMonth() + 1;
            let d = data.getDate();
            return `${this.padLeft( y, 4)}.${this.padLeft(m, 2)}.${this.padLeft(d, 2)}`;
        }

        /** 格式化时间，66 -> 00:01:06 */
        public static formatTimeHMSatVal(time:number):string
        {
            let array : string[]= [];
            let s : number;
            for(let i = 0; i < 3; i++){
                s = time % 60;
                array.push(s < 10 ? "0" + s : s.toString());
                time = Math.floor(time / 60);
            }
            return `${array[2]}:${array[1]}:${array[0]}`;
        }

        /** 格式化时间, 秒级，xx -> xx天xx小时xx分钟 */
        public static getTimeDHM(time : number){
            let str_m = "m";
            let str_h = "h";
            let str_d = "d";
            let timeArray : string[] = new Array();
            time = Math.ceil(time / 60);
            timeArray.push((time % 60) + str_m);
            time = Math.floor(time / 60);
            if(time != 0){
                timeArray.push((time % 24) + str_h);
                time = Math.floor(time / 24);
                if(time != 0)
                    timeArray.push(time + str_d);
            }
            return timeArray.reverse().join("");
        }

        /**
         * 1月1日，毫秒级1484139541000
         */
        public static formatTimeMD(time:number):string
        {
            var date:Date = new Date(time);
            var m = date.getMonth() + 1;
            var d = date.getDate();
            return `${m}月${d}日`;
        }
        
        public static padLeft(num:number, n:number) 
        {
            return (Array(n).join("0") + num).slice(-n);
        }

        /**
         * 获取当前时间的毫秒数
         */
        // public static currentTimeMillisecode() {
        //     var data:Date = new Date();
        //     return data.getTime();
        // }

        /**
         * 从数组中移除指定位置的元素
         */
        public static removeAtFromArray(arr: Array<any>, idx: number) {
            arr.splice(idx, 1);
            return arr;
        }

        public static makeHtmlWithColorSize(content:string, color:string, fontSize:number):string
        {
            // <span style="color:#7a3d10;font-size:20">战斗力+1955</span>
            return `<span style="color:${color};font-size:${fontSize}">${content}</span>`;
        }

        public static makeHtmlWithColor(content:string, color:string):string
        {
            // <span style="color:#7a3d10">战斗力+1955</span>
            return `<span style="color:${color}">${content}</span>`;
        }
        public static makeHtmlWithSize(content:string, fontSize:number):string
        {
            // <span style="color:#7a3d10">战斗力+1955</span>
            return `<span style="fontSize:${fontSize}">${content}</span>`;
        }
    

        /** 生成一个html图片，一般用于文字与图片同时居中的情况 */
        public static makeHtmlImg(src : string, width?:number, height?:number,left?:number,top?:number){
            var imgStr = `<img src="${src}" `;
            if(width) imgStr += ` width = "${width}" `;
            if(height) imgStr += ` height = "${height}"`;
            if(left) imgStr += ` left = "${left}px"`;
            if(top) imgStr += ` top = "${top}px"`;
            return imgStr + `/>`;
        }
    

        public static stackTrace (count:number = 10) {
            var i = 0;        
            var fun = arguments.callee; 
            console.log("***----------------------------------------** " + (i + 1));
            while (fun && i < count) {
                fun = fun.arguments.callee.caller;  
                console.log(fun); 
                i++;
                console.log("***---------------------------------------- ** " + (i + 1));
            }
        }

        /**
         * 随机:[min, max]
         */
        public static random(min:number, max:number)
        {
            var range:number = max - min;
            var rand = Math.random();
            return min + Math.round(rand * range);
        } 


    

        /** 保留n位小数，不四舍五入，9.8 -> 9.80 */
        private static toFixed(val : number, decimalNum : number){
            if(decimalNum == 0)return val.toString();
            let s = val.toFixed(decimalNum + 1);
            return s.substr(0, s.length - 1);
        }



        /** 取数字文本,向下取整，789 -> 78.9, 4567 -> "456" */
        private static getValStrMax3(val : number){
            let val2 = val % 10;
            let val1 = Math.floor(val / 10);
            if(val1 >= 100)return val1.toString();
            else return val1 + "." + val2;
        }

        /** 返回金币数量的简写形式，保留1位小数位 可选参数物品配置id/物品类型，若不为金币则直接返回 */
        public static getMoneyStr(val : number, goodsType ?: number){
            // if(goodsType && goodsType != ConfigGroup.CONFIG_GROUP_GOODS_SUBTYPE_CURRENCY_GOLD)return val.toString();
            if(val < 1000)
                return val.toString();
            val = val / 1000;
            if(val < 1000)
                return Utils.toFixed(val, 1) + "K";
            return Utils.toFixed(val / 1000, 1) + "M";
        }

        /** 主面板金币显示, 若数值超过1 000 000，则返回1.00M */
        public static getBigMoneyStr(val : number){
            if(val < 1000000)return val.toString();
            return Utils.toFixed(val / 1000000, 2) + "M";
        }

        /** 战斗界面血量显示，若数值超过1 000 000，则返回1.00M, 暂时和金钱的显示一样 */
        public static getBigHPStr(val : number){
            return Utils.getBigMoneyStr(val);
        }

        

        public static getQueryString(name):string {
            var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
            var r = window.location.search.substr(1).match(reg);
            // var r = "?openid=xxxx&openkey=yyyyyy&platform=1".substr(1).match(reg);
            
            if (r != null) {
                return r[2];
            }
            return null;
        }

        /** 设置list的橡皮筋效果 */
        public static setListElastic(list : Laya.List, time = 100, distance = 100){
            if(list.scrollBar){
                list.scrollBar.elasticBackTime = time;
                list.scrollBar.elasticDistance = distance;
            }
        }

        

        // private static _lastLoginPlayerIdKey = "LAST_LOGIN_PLAYER_ID";
        private static _showAudioAlertKey:string = "_showAudioAlertKey";
        private static _defaultAudioStatus:string = "_defaultAudioStatus";

        /**
         * 从本地数据获取是否需要显示开关声音的提示界面
         */
        public static needShowAudioAlert():boolean
        {
            return Laya.LocalStorage.getJSON(Utils._showAudioAlertKey) !== false;
        }

        /**
         * 禁用上线时的声音提示界面
         */
        public static disableShowAudioAlert():void
        {
            Laya.LocalStorage.setJSON(Utils._showAudioAlertKey, false);
        }

        public static enableShowAudioAlert():void
        {
            Laya.LocalStorage.setJSON(Utils._showAudioAlertKey, true);            
        }

        /**
         * 清除游戏本地缓存
         */
        public static clearAudioAlertCache():void
        {
            Laya.LocalStorage.clear();
        }

        /**
         * 默认的声音状态
         */
        public static getDefaultAudioStatus():boolean
        {
            return Laya.LocalStorage.getJSON(Utils._defaultAudioStatus) !== false; 
        }

        /**
         * 设置声音默认状态 
         * @param v 
         */
        public static setDefaultAudioStatus(v:boolean):void
        {
            return Laya.LocalStorage.setJSON(Utils._defaultAudioStatus, v);             
        }

        /** 获得文本的高度，主要用于输入框的高度 */
        public static getTextHeight(text: string, width: number, fontSize: number){
            let labelTemp = new Laya.Label();
            labelTemp.fontSize = fontSize;
            labelTemp.width = width;
            labelTemp.wordWrap = true;
            labelTemp.text = text;
            let height = labelTemp.height;
            labelTemp.destroy();
            return height;
        }

        /** 限制文本容器的文本高度，不超出显示区域，适用于确定高度的容器，比如textInput,label,text */
        public static limitTextHeight(view : Laya.TextInput | any, limitSize ?: number){
            let str = "_utils_lastHeight";
            if(!view[str])view[str] = "";
            if(limitSize)
                if(view.text.length > limitSize)
                    view.text = view.text.substr(0, limitSize);
            if(this.getTextHeight(view.text, view.width, view.fontSize) > view.height)
                view.text = view[str];
            else
                view[str] = view.text;
        }

        /**
         * 判断是不是一个有效的资源url对象
         */
        public static isAssetsUrlObject(url:Object):url is {url:string, type:string}
        {
            return url.hasOwnProperty("url") && url.hasOwnProperty("type");
            // return url["url"] && url["type"];
        }

        /**
         * 判断参数是否是一个字符串
         */
        public static isString(str): str is string
        {
            return typeof str === "string";
        }

        /**
         * 是否是数组
         */
        public static isArray(arr:any):arr is Array<any>
        {
            return arr instanceof Array;
        }
        /**
         * 获取当前屏幕模式:横屏还是竖屏
         */
        public static getScreenMode()
        {
            // return w >= h ? ScreenMode.Landscape : ScreenMode.Portrait;
            
            return Laya.Browser.width >= Laya.Browser.height ? ScreenMode.Landscape : ScreenMode.Portrait;
        }

        public static getPlatformAndScreenMode():PlatformAndScreenMode
        {
            switch (Utils.getScreenMode()) {
                case ScreenMode.Landscape:
                    if(Laya.Browser.onPC)
                    {
                        return PlatformAndScreenMode.PC;
                    }
                    else if(Laya.Browser.onIOS)
                    {
                        return PlatformAndScreenMode.IOSLandscape;
                    }
                    else if(Laya.Browser.onAndroid)
                    {
                        return PlatformAndScreenMode.AndriodLandscape;
                    }
                    else
                    {
                        return PlatformAndScreenMode.OtherLandscape;
                    }
                case ScreenMode.Portrait:
                    if(Laya.Browser.onPC)
                    {
                        return PlatformAndScreenMode.PC;
                    }
                    else if(Laya.Browser.onIOS)
                    {
                        return PlatformAndScreenMode.IOSPortrait;
                    }
                    else if(Laya.Browser.onAndroid)
                    {
                        return PlatformAndScreenMode.AndriodPortrait;
                    }
                    else
                    {
                        return PlatformAndScreenMode.Other;
                    }
                default:
                    return PlatformAndScreenMode.Other;
            }
            
        }

        /**
         * 检查是否为空或未定义
         */
        public static isNullOrUndefined(obj:any)
        {
            return obj === null || obj === undefined;
        }

        /**
         * 字符串是否为空或空串
         */
        public static isNullOrEmpty(str:string):boolean
        {
            return Utils.isNullOrUndefined(str) || str.length <= 0;
        }

        /**
         * 根据自动次数返回字符串
         */
        public static getAutoTimesString(times:number)
        {
            if(times < 0) return $language(102022);// "直到环节";
            return $language(102023).replace("[n]", times.toString()); // "[n]次旋转"
        }

        /**
         * 将金币数转换成显示需要的字符串
         * 
         * @static
         * @public
         * @method convertToShowingCoin
         * @param {number} coin 真实的金币数，一般从服务器或配置中获取
         * @return {string}
         */
        public static convertToShowingCoin(coin:number, place:number = 2):string
        {
            let real:number = coin / 100;
            return Utils.formatMoney(real, place);
            // return Utils.formatMoney((coin / 100));
        }
        
        /**
         * 将金币数转换成显示需要的字符串  当小于1元时取小数，当大于1元时取小数
         * 
         * @static
         * @public
         * @method convertToShowingCoin
         * @param {number} coin 真实的金币数，一般从服务器或配置中获取
         * @return {string}
         */
        public static convertToShowingCoinIntOrFloat(coin:number, place:number = 2):string
        {
            return coin<100?Utils.convertToShowingCoin(coin,place):Utils.convertToShowingCoin(coin,0);
        }

        public static formatMoney(num, places:number = 0, symbol:string = "¥", thousand:string = ",", decimal:string = "."):string
        {
            num = num || 0;
            places = !isNaN(places = Math.abs(places)) ? places : 2;
            symbol = symbol !== undefined ? symbol : "$";
            thousand = thousand || ",";
            decimal = decimal || ".";
            var negative = num < 0 ? "-" : "",
                i:any = parseInt(num = Math.abs(+num || 0).toFixed(places), 10) + "",
                j = (j = i.length) > 3 ? j % 3 : 0;
            return symbol + negative + (j ? i.substr(0, j) + thousand : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand) + (places ? decimal + Math.abs(num - i).toFixed(places).slice(2) : "");
        }

        /**
         * 判断一人数字是否是整数
         * @param num 需要进行判断的数字
         */
        public static isInteger(num:number):boolean
        {
            return 0 === num % 1;
        }

        /**
         * 闪烁屏幕
         */
        public static spangleScreen()
        {
            Laya.stage.alpha = 0.2;
            Laya.Tween.to(Laya.stage, {alpha:1}, 200);
        }

        public static hijack(obj:any, methodName:string, newMethod:Function)
        {
            let old:Function = obj[methodName];
            obj[methodName] = newMethod(old);
        }

        public static isInLobby() {
            let userAgent: string = navigator.userAgent.toLowerCase()
            let isCompanyBrowser: boolean = userAgent.indexOf("jp_runtime/embedded") != -1;
            
            if (isCompanyBrowser) {
                return true;
            }
            return false;
        }

        public static returnToLobby()
        {
            let userAgent: string = navigator.userAgent.toLowerCase()
            // let isCompanyBrowser: boolean = userAgent.indexOf("browser_type/android_app") != -1;
            let isCompanyBrowser: boolean = userAgent.indexOf("jp_runtime/embedded") != -1;

            if (isCompanyBrowser) {
                // window.close();
                postMessage("close", "*");
                document.location.href = "jplobby://cmd=exit";
            }
            else if(Utils.isNullOrEmpty(ConnectService.instance.lobbyUrl)) {
                window.close();
            }
            else {
                history.go(-100);
                window.location.replace(ConnectService.instance.lobbyUrl)
            }
            // if(isCompanyBrowser || Utils.isNullOrEmpty(ConnectService.instance.lobbyUrl)){
            //     window.close();
            // }
            // else{
            //     history.go(-100);
            //     window.location.replace(ConnectService.instance.lobbyUrl)
            //     // window.location.href = rigger.service.ConnectService.instance.lobbyUrl;
            // }
        }

        /**
         * 从数组中获取ID为指定值的对象
         * @param arr 
         * @param id
         */
        static getById(arr:{id:any}[], id:any):any{
            let idx:number = Utils.findIndexFromArray(arr, (ele, i, array) =>{
                return ele.id === id;
            })
            if(idx < 0) return null;

            return arr[idx];
        }

        /**
         * base64 中文解码
         * @param utftext 
         */
        public static utf8_decode(utftext): string {
            let string = "";
            let i = 0;
            let c,c1,c2 = 0;
            let c3;
            while ( i < utftext.length ) {
                c = utftext.charCodeAt(i);
                if (c < 128) {
                    string += String.fromCharCode(c);
                    i++;
                } else if((c > 191) && (c < 224)) {
                    c2 = utftext.charCodeAt(i+1);
                    string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                    i += 2;
                } else {
                    c2 = utftext.charCodeAt(i+1);
                    c3 = utftext.charCodeAt(i+2);
                    string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                    i += 3;
                }
            }
            return string;
        }

        public static log(message?: any, ...optionalParams: any[]): void {
            if(Utils.IS_DEBUG) {
                console.log(message, ...optionalParams);
            }
        }

        public static info(message?: any, ...optionalParams: any[]): void {
            if(Utils.IS_DEBUG) {
                console.info(message, ...optionalParams);
            }
        }

        public static warn(message?: any, ...optionalParams: any[]): void {
            if(Utils.IS_DEBUG) {
                console.warn(message, ...optionalParams);
            }
        }
        
        /**播放金额数字动态效果*/
        static play_Money(money: number, moneyTxt: fairygui.GTextField, callback: Laya.Handler, time: number = 800, startMoney: number = 0): Laya.Tween {
            let moneyObj: Object;
            let moneyTween: Laya.Tween;
            if (money <= 0) {
                moneyTxt.text = Utils.convertToShowingCoin(0);
                callback && callback.run();
                return;
            }

            moneyTween = new Laya.Tween();
            moneyObj = { "money": startMoney };
            moneyTween.to(moneyObj,
                {
                    money: money,
                    update: new Laya.Handler(this, () => { moneyTxt.text = Utils.convertToShowingCoin(moneyObj["money"]); }, null)
                },
                time,
                Laya.Ease.linearNone,
                Laya.Handler.create(this, () => { if (callback) callback.run(); }));
            return moneyTween;
        }

    }