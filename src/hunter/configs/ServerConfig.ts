import { ServerInfo } from "../moduleContexts/loginModule/views/ServerItemView";

/*
* 服务器配置;
*/
    /**
     * 正式的服务器信息
     */
    export const serverInfo: {} = {
        serverName: "",
        serverIp: "",
        serverPort: ""
    }

    // DEBUG服务器列表
    export const debugServerList: ServerInfo[] =
        [
            {
                serverName: "45",
                serverIp: "ws://10.0.0.45",
                serverPort: 9490
            },

            {
                serverName: "姚洋",
                serverIp: "ws://10.0.0.31",
                serverPort: 9490
            },
            {
                serverName: "测试1",
                serverIp: "ws://10.0.0.31",
                serverPort: 9490
            },
            {
                serverName: "测试2",
                serverIp: "ws://10.0.0.31",
                serverPort: 9491
            }
        ]