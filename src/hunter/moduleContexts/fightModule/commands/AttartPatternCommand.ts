import FightModel, { AttactPattern } from "../models/FightModel";
import inject = riggerIOC.inject;
export default class AttartPatternCommand extends riggerIOC.Command {
    @inject(FightModel)
    private fightModel: FightModel;

    constructor() {
        super();
    }

    execute(pattern: AttactPattern) {
        this.fightModel.attactPattern = pattern;
    }
}