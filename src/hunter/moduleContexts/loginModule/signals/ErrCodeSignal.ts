/**
* 错误码
*/
import * as protocol from "../../../protocol/protocols/protocols";
export default class ErrCodeSignal extends riggerIOC.Signal<protocol.ErrResp>{
	constructor() {
		super();
	}
}