import Utils from "../../../utils/Utils";
import ConnectService from "../../../gameServices/connectService/ConnectService";

export default class openReportCommand extends riggerIOC.Command {
    constructor() {
        super();
    }

    execute() {
        if(Utils.isInLobby()) {
            let website: string = ConnectService.instance._getMetaValue("recordUrl");
            if(website) {
                document.location.href = `jplobby://cmd=openReport//url=${website}`;
            }
        }
        else {
            Utils.IS_SHOW_LOG = true;
        }
        this.done();
    }
}