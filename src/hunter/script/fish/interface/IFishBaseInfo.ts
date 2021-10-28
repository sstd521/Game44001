import * as protocol from '../../../protocol/protocols/protocols';
export interface IFishBaseInfo {
    //鱼ID
    fishId: number;

    //鱼类型
    fishTypeId: number;

    //出生时间
    creatTime: number;

    //路径Id
    pathId: number;

    //x偏移
    offsetX: number;

    //y偏移
    offsetY: number;

    //冰冻列表
    frozenList: protocol.Frozen[];
}