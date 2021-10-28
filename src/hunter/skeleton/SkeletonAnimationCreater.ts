/**
 * AnimationCreater
 */
module Common {
    class SkeletonAnimationCreater {

        private _dataPath: string;
        // private _texturePath:string;
        private _factory: laya.ani.bone.Templet;
        private _data: Object;
        private _listener: Function;
        private _caller: any;

        constructor() {
            this._data = new Object();
            this._dataPath = null;
            // this._texturePath = null;
            this._factory = new laya.ani.bone.Templet();
            this._data = new Object();
            this._listener = null;
            this._caller = null;

        }

        public create(dp: string, caller: any, listener: Function) {
            this._dataPath = dp;
            // this._texturePath = tp;
            this._listener = listener;
            this._caller = caller;

            this._create();
        }

        private _create() {
            if (this._dataPath == null) {
                return;
            }


            this._factory.on(laya.events.Event.COMPLETE, this, this._onParseCompleted);
            this._factory.loadAni(this._dataPath);
        }


        private _onParseCompleted(): void {
            if (null == this._listener) {
                return;
            }

            this._listener.apply(this._caller, [this._factory.buildArmature(1)]);
        }


    }
}
