import BrizecurveInfo from "../../data/tpls/BrizecurveList";

/**
 * n阶贝塞尔曲线
 */
export default class Brizecurve {
    public pathEffect: {percent: number, time: number, effectLabel: string}[] = [];
    public totalTime: number;
    public points: Laya.Point[] = [];
    public pointA: Laya.Point;
    public pointB: Laya.Point;
    public pointC: Laya.Point;
    public pointD: Laya.Point;
    constructor() {
    }

    /**
     * 根据路径id,初始化路径信息
     * @param pathId 
     */
    init(pathId: number) {
        let brizecurveInfo = BrizecurveInfo.getData(pathId);
        let points = brizecurveInfo.points;
        if(points) {
            for(let j = 0; j < points.length; j++) {
                this.points.push(new Laya.Point(points[j][0], points[j][1]));
            }
        }
        else {
            //兼容旧配置(固定三阶贝塞尔)
            this.pointA = new Laya.Point(brizecurveInfo.pointA[0], brizecurveInfo.pointA[1]);
            this.pointB = new Laya.Point(brizecurveInfo.pointB[0], brizecurveInfo.pointB[1]);
            this.pointC = new Laya.Point(brizecurveInfo.pointC[0], brizecurveInfo.pointC[1]);
            this.pointD = new Laya.Point(brizecurveInfo.pointD[0], brizecurveInfo.pointD[1]);
            this.points.push(this.pointA, this.pointB, this.pointC, this.pointD);
        }
        this.totalTime = brizecurveInfo.totalTime;
        for(let i = 0; i < brizecurveInfo.percent.length; i++) {
            let nPercent = brizecurveInfo.percent[i];
            let nTime = brizecurveInfo.times[i];
            let nEffectLabel = brizecurveInfo.effectLabel[i];
            this.pathEffect.push({percent: nPercent, time: nTime, effectLabel: nEffectLabel});
        }
        this.coefficient = this.brizeCoefficient(this.points.length);
    }

    /**
     * 根据百分比t获取对应坐标点(n阶贝塞尔)
     */
    getPointByT(t: number): Laya.Point {
        let points = this.points;
        let a = this.coefficient[0];
        let b = this.coefficient[1];
        let c = this.coefficient[2];
        let x: number = 0;
        let y: number = 0;
        for(let i = 0; i < a.length; i++) {
            x += a[i] * points[i].x * Math.pow(1-t, b[i]) * Math.pow(t, c[i]);
            y += a[i] * points[i].y * Math.pow(1-t, b[i]) * Math.pow(t, c[i]);
        }
        return new Laya.Point(x, y);
    }

    private coefficient: any[];
    /**
     * n阶贝赛尔曲线系数
     * @param n 
     */
    private brizeCoefficient(n: number) {
        let a = this.pascalTriangle(n);
        let b: number[] = [];
        let c: number[] = [];
        for(let i = 0; i < n; i++) {
            b.push(n-1-i);
            c.push(i);
        }
        return [a,b,c];
    }

    /**
     * 杨辉三角
     * @param n 
     */
    private pascalTriangle(n: number): number[] {
        if(n == 1) return [1];
        let arr: number[] = [];
        arr.push(1);
        let lastPascalTriangle: number[] = this.pascalTriangle(n-1);
        for(let i = n-1; i > 1; i--) {
           let Ai = lastPascalTriangle[i-1-1] + lastPascalTriangle[i-1];
            arr.push(Ai); 
        }
        arr.push(1);
        return arr;
    }
}