import Utils from "../../../utils/Utils";

/**
* name 
*/
export default class GameReportCommand extends riggerIOC.Command {

	constructor() {
		super();
	}

	execute() {
		Utils.IS_SHOW_LOG = true;
		this.done();
	}
}