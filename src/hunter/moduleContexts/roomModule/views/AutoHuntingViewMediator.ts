import inject = riggerIOC.inject;
import AutoHuntingView from "./AutoHuntingView";
export default class AutoHuntingViewMediator extends riggerIOC.Mediator {
    /**自动捕鱼设置 */
    @inject(AutoHuntingView)
    private autoHuntingView: AutoHuntingView;

    constructor() {
        super();
    }

    onInit() {
    }

    onShown() {

    }

    onHide() {

    }

    dispose() {

    }
}