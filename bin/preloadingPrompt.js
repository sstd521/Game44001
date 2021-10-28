var _tipIndex=0;
var _arrTips = [ "Initializing", "Initializing .", "Initializing . .", "Initializing . . ." ];
var _div = document.createElement("div");
_div.setAttribute("id", "preloadTip");
_div.setAttribute("style", 'position:absolute; font-family:"微软雅黑"; text-align:left; font-size:24px; color:#ffffff; left:10px; top:10px; width:200px; height:44px; z-index:1');
document.body.appendChild(_div);
var _timerID = window.setInterval(onTimerHandle, 200);
function onTimerHandle()
{
    _tipIndex = (_tipIndex % _arrTips.length);
    _div.innerText = _arrTips[_tipIndex++];
}

/**动态载入提示的销毁函数，请自行调用 */
function preloadTipDestroy()
{
    if(_timerID && _div)
    {
        window.clearInterval(_timerID);
        document.body.removeChild(_div);
    }

    _timerID = undefined;
    _div = undefined;
    _arrTips = undefined;
    _tipIndex = undefined;
    _initTime = undefined;
}