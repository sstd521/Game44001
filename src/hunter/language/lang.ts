/**多语言 */
export default class Lang
{
	private static _languageLists:Array<string> = [
		// LanguageType.ZH_CN 简体中文
		"zh-cn",
		// LanguageType.ZH_HK 繁体中文
		// "zh-hk",
		// LanguageType.EN_US 英文
		"en-us"
	];

	/**获取多语言列表*/
	static get languageLists():Array<string>
	{
		return Lang._languageLists;
	}

	// /**获取多语言列表*/
	// static set languageLists(languageLists:Array<string>)
	// {
	// 	// 不开放对外入口，上面已经直接配置好固定的多语言列表（公共库统一）
	// }


	// 如果语言类型不在已配置的语言列表内，则取语言列表的第一项为默认语言类型（如：简体中文）
	private static _language:string;

	/**获取当前语言类型*/
	static get language():string
	{
		return Lang._language ? Lang._language : Lang._languageLists[0];
	}
	
	/**设置语言类型*/
	static set language(languageType:string)
	{
		if(Lang._languageLists && Lang._languageLists.indexOf(languageType)!=-1)
		{
			Lang._language = languageType;
		}
		else
		{
			Lang._language = Lang._languageLists[0];
		}
	}

	private static _packName:string;

	/**获取当前语言资源分包对应的包名 */
	static get packName():string
	{
		return Lang._packName || (Lang._packName = "Lang_" + Lang.formatLangType(Lang.language));
	}
	
	/**格式化语言类型，如：zh-cn ==> zh_cn */
	static formatLangType(langType:string):string
	{
		return langType.replace(/-/g, "_");
	}
}