declare class RiggerLayout {
    static readonly DefaultLayerName: string;
    static readonly TopLayerName: string;
    static readonly SubLayerName: string;
    static readonly InfoBarLayerName: string;
    static layerDict: {};
    /**
     * 默认适配层
     */
    static readonly layer: riggerLayout.Group;
    /**
     * 子舞台
     */
    static readonly subLayer: riggerLayout.Group;
    /**
     * 顶舞台
     */
    static readonly topLayer: riggerLayout.Group;
    /**
     * 添加默认适配层
     * @param layer
     */
    static addDefaultLayer(layer: riggerLayout.Group): void;
    /**
     * 添加一个适配层
     * @param layerName
     * @param layer
     */
    static addLayer(layerName: string | number, layer: riggerLayout.Group): void;
    /**
     * 获取层
     * @param layerName
     */
    static getLayer(layerName: string | number): riggerLayout.Group;
    constructor();
}
