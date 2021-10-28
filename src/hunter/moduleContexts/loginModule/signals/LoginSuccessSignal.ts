/**
* name 
*/
import * as protocol from "../../../protocol/protocols/protocols";
export default class LoginSuccessSignal extends riggerIOC.Signal<protocol.LoginResp>{
	constructor() {
		super();
	}
}