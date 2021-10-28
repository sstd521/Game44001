declare class LayaTopContainer implements riggerLayout.ITopContainer {
    protected item: Laya.Stage | fairygui.GComponent;
    setItem(item: any): void;
    getDesignWidth(): number;
    getDesignHeight(): number;
    getRealWidth(): number;
    getRealHeight(): number;
    onResize(caller: any, method: Function, args: any[]): void;
    offResize(caller: any, method: Function): void;
    constructor(item: Laya.Stage | fairygui.GComponent);
    dispose(): void;
}
