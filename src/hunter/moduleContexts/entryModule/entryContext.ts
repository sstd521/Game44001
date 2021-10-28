/**
* 大厅上下文
*/
import EntryServer from "./servers/EntryServer";
import EntryView from "./views/EntryView";
import openReportSignal from "./signals/openReportSignal";
import openReportCommand from "./commands/openReportCommand";
import OpenHelpViewSignal from "./signals/OpenHelpViewSignal";
import OpenSetViewSignal from "./signals/OpenSetViewSignal";
import OpenHelpCommand from "./commands/OpenHelpCommand";
import OpenSetCommand from "./commands/OpenSetCommand";


export default class EntryContext extends riggerIOC.ModuleContext {

    constructor(appContext: riggerIOC.ApplicationContext) {
        super(appContext);
    }

    dispose() {
        super.dispose();
    }

    bindInjections(): void {
        this.injectionBinder.bind(EntryView).toSingleton();
        this.injectionBinder.bind(EntryServer).toSingleton();
        this.injectionBinder.bind(openReportSignal).toSingleton();
        this.injectionBinder.bind(OpenHelpViewSignal).toSingleton();
        this.injectionBinder.bind(OpenSetViewSignal).toSingleton();
    }

    bindCommands(): void {
        this.commandBinder.bind(openReportSignal).to(openReportCommand);
        this.commandBinder.bind(OpenHelpViewSignal).to(OpenHelpCommand);
        this.commandBinder.bind(OpenSetViewSignal).to(OpenSetCommand);
    }

    bindMediators(): void {
        
    }

    onStart(): void {
        this.doneCommand.execute();
    }
}