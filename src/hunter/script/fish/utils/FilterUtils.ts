export default class FilterUtils {
    constructor() {
    }

    /**
     * 返回一个颜色滤镜
     * @param rgbCode 颜色rgb十六进制
     */
    public static getColorMatrix(rgbCode: string): Laya.ColorFilter{
        let r = 1;
        let g = 1;
        let b = 1;

        let rgbStrig: string = rgbCode;
        r = parseInt(rgbStrig.substr(1, 2), 16) / 255;
        g = parseInt(rgbStrig.substr(3, 2), 16) / 255;
        b = parseInt(rgbStrig.substr(5, 2), 16) / 255;

        let colorMatrix = [
            r, 0, 0, 0, 0, //R
            0, g, 0, 0, 0, //G
            0, 0, b, 0, 0, //B
            0, 0, 0, 1, 0, //A
        ]
        // console.log(`rgb: ${rgbCode},,r: ${r},, g: ${g},, b: ${b}`);
        let colorFiltter = new Laya.ColorFilter(colorMatrix);
        return colorFiltter;
    }
}