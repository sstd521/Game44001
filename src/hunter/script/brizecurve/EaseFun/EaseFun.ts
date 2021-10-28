export default class EaseFun {
    constructor() {
    }

    /**
     * 匀速
     * @param t 
     * @param b 
     * @param c 
     * @param d 
     */
    public static linearNone(t: number, b: number, c: number, d: number) {
        return c * (t / d) + b;
    }

    /**
		 * 方法以零速率开始运动，然后在执行时加快运动速度。
		 * Cubic 缓动方程的运动加速大于 Quad 缓动方程。
		 * @param	t 指定当前时间，介于 0 和持续时间之间（包括二者）。
		 * @param	b 指定动画属性的初始值。
		 * @param	c 指定动画属性的更改总计。
		 * @param	d 指定运动的持续时间。
		 * @return 指定时间的插补属性的值。
		 */
    public static cubicIn(t: number, b: number, c: number, d: number): number {
        return c * (t /= d) * t * t + b;
    }

    /**
     * 开始运动时速率为零，先对运动进行加速，再减速直到速率为零。
     * Cubic 缓动方程的运动加速大于 Quad 缓动方程。
     * @param	t 指定当前时间，介于 0 和持续时间之间（包括二者）。
     * @param	b 指定动画属性的初始值。
     * @param	c 指定动画属性的更改总计。
     * @param	d 指定运动的持续时间。
     * @return 指定时间的插补属性的值。
     */
    public static cubicInOut(t: number, b: number, c: number, d: number): number {
        if ((t /= d * 0.5) < 1) return c * 0.5 * t * t * t + b;
        return c * 0.5 * ((t -= 2) * t * t + 2) + b;
    }

    /**
     * 以较快速度开始运动，然后在执行时减慢运动速度，直至速率为零。
     * Cubic 缓动方程的运动加速大于 Quad 缓动方程。
     * @param	t 指定当前时间，介于 0 和持续时间之间（包括二者）。
     * @param	b 指定动画属性的初始值。
     * @param	c 指定动画属性的更改总计。
     * @param	d 指定运动的持续时间。
     * @return 指定时间的插补属性的值。
     */
    public static cubicOut(t: number, b: number, c: number, d: number): number {
        return c * ((t = t / d - 1) * t * t + 1) + b;
    }

    /**
		 * 以零速率开始运动，然后在执行时加快运动速度。
		 * Quint 缓动方程的运动加速大于 Quart 缓动方程。
		 * @param	t 指定当前时间，介于 0 和持续时间之间（包括二者）。
		 * @param	b 指定动画属性的初始值。
		 * @param	c 指定动画属性的更改总计。
		 * @param	d 指定运动的持续时间。
		 * @return 指定时间的插补属性的值。
		 */
		public static quintIn(t:number, b:number, c:number, d:number):number {
			return c * (t /= d) * t * t * t * t + b;
		}
		
		/**
		 * 开始运动时速率为零，先对运动进行加速，再减速直到速率为零。
		 * Quint 缓动方程的运动加速大于 Quart 缓动方程。
		 * @param	t 指定当前时间，介于 0 和持续时间之间（包括二者）。
		 * @param	b 指定动画属性的初始值。
		 * @param	c 指定动画属性的更改总计。
		 * @param	d 指定运动的持续时间。
		 * @return 指定时间的插补属性的值。
		 */
		public static quintInOut(t:number, b:number, c:number, d:number):number {
			if ((t /= d * 0.5) < 1) return c * 0.5 * t * t * t * t * t + b;
			return c * 0.5 * ((t -= 2) * t * t * t * t + 2) + b;
		}
		
		/**
		 * 以较快速度开始运动，然后在执行时减慢运动速度，直至速率为零。
		 * Quint 缓动方程的运动加速大于 Quart 缓动方程。
		 * @param	t 指定当前时间，介于 0 和持续时间之间（包括二者）。
		 * @param	b 指定动画属性的初始值。
		 * @param	c 指定动画属性的更改总计。
		 * @param	d 指定运动的持续时间。
		 * @return 指定时间的插补属性的值。
		 */
		public static quintOut(t:number, b:number, c:number, d:number):number {
			return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
		}
}