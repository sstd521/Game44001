export enum VideoType {
    /**
     * LAYA原生动画（通过其IDE制作)
     */
    LayaAnimation = 1,

    /**
     * 骨骼动画
     */
    Skeleton = 2,

    /**
     * 由fairyGUI的加载器:GLoader实现的播放器，一般用于播放帧动画
     */
    GLoader = 3,

    ExtendAnimation = 4,

    ExtendSkeleton = 5
}