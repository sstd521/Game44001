/**
 * 设置LayaNative屏幕方向，可设置以下值
 * landscape           横屏
 * portrait            竖屏
 * sensor_landscape    横屏(双方向)
 * sensor_portrait     竖屏(双方向)
 */
window.screenOrientation = "sensor_landscape";

//-----libs-begin-----
loadLib("libs/laya/laya.core.js")
loadLib("libs/laya/laya.webgl.js")
loadLib("libs/laya/laya.ani.js")
loadLib("libs/laya/laya.filter.js")
loadLib("libs/laya/laya.html.js")
loadLib("libs/laya/laya.physics.js")
loadLib("libs/laya/laya.d3.js")
loadLib("libs/laya/laya.tiledmap.js")
loadLib("libs/laya/laya.ui.js")
loadLib("libs/laya/laya.debugtool.js")

loadLib("libs/polyfill/polyfill.min.js")
loadLib("libs/clipboard/clipboard.min.js")
loadLib("libs/fairygui/fairygui.js")
loadLib("libs/rawinflate/rawinflate.min.js")
loadLib("libs/reflect/reflect.js")
loadLib("libs/riggerIOC/riggerIOC.min.js")
loadLib("libs/riggerLayaSA/riggerLayaSync.min.js")
loadLib("libs/riggerLayout/riggerLayout.min.js")
loadLib("rigger/rigger.min.js")
// loadLib("x_debug.js");
//-----libs-end-------
loadLib("js/bundle.js");
