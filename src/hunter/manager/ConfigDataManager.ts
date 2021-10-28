/**
 * ConfigDataManager
 * 因为新的配置数据组织结构要求动态生成数据类，因此使用此类集中管理配置数据
 */
export default class ConfigDataManager implements SimpleManagerTemplate {
    public static get instance() : ConfigDataManager 
    {
        if (!ConfigDataManager._instance) {
            ConfigDataManager._instance = new ConfigDataManager();
        }
        return ConfigDataManager._instance;
    }
    private static _instance:ConfigDataManager = null;

    init() {
        
    }

    dispose()
    {
        
    }

   

}