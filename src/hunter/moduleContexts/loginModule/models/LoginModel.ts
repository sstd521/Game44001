/**
* name 
*/
import * as protocol from "../../../protocol/protocols/protocols";
import inject = riggerIOC.inject;
export default class LoginModel extends riggerIOC.Model {

	public get loginInfo(): protocol.LoginResp {
		return this.mLoginInfo;
	}
	public set loginInfo(info: protocol.LoginResp) {
		this.mLoginInfo = info;

	}

	private mLoginInfo: protocol.LoginResp;
	public initiallizied: boolean = false;

	constructor() {
		super();
	}

	dispose() {
		
	}


}