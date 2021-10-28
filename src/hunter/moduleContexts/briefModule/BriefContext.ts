import TipView from "./views/TipView";
import BriefServer from "./servers/BriefServer";

/** 简要模块上下文 */
export default class BriefContext extends riggerIOC.ModuleContext {

    constructor(appContext: riggerIOC.ApplicationContext) {
        super(appContext);
    }

    dispose() {

    }

    bindInjections(): void {
        this.injectionBinder.bind(TipView).toSingleton();
        this.injectionBinder.bind(BriefServer).toSingleton();
    }

    bindCommands(): void {
    }

    bindMediators(): void {
    }

    protected onStart() {
        this.doneCommand.execute();
    }
}