
export default interface ILoadingView  {
    /**
     * 设置进度 
     */
    setProgress(progress: number);

    /**
     * 获取进度
     */
    getProgress(): number
}