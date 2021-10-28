import Utils from "../../../utils/Utils";

/**
* name 
*/
export default class ReturnToLobbyCommand extends riggerIOC.Command {
	constructor() {
		super();
	}

	execute() {
		Utils.returnToLobby();
		this.done();
	}
}