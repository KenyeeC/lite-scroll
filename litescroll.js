(function (root, factory) {
    var LiteScroll = factory.bind(root)()
    if (typeof define === 'function' && define.amd) {
        define('LiteScroll', function () { return LiteScroll })
    } else if (typeof exports === 'object') {
        module.exports = LiteScroll
    } else {
        root.LiteScroll = LiteScroll
    }
})(this, function () {
    /** 滑块对象 */
    function Scroller(options) {
        this.block = options.block
        this.wrapper = options.wrapper
        this.startSite = 0
        this.moveSite = 0
        this.smoothScroll = isNaN(options.smoothScroll) ? 50 : options.smoothScroll
        this.roughScroll = isNaN(options.roughScroll) ? 120 : options.roughScroll
        this.roughcoefficient = isNaN(options.roughcoefficient) ? 0.3 : options.roughcoefficient
        this.revertSpeed = isNaN(options.revertSpeed) ? 800 : options.revertSpeed
        this.transitionTiming = options.transitionTiming || 'cubic-bezier(0.1, 0.57, 0.1, 1)'
        this.cssParam = '-webkit-transition-timing-function:' + this.transitionTiming + ';transition-timing-function:' + this.transitionTiming + ';-webkit-transition-property: height;transition-property: height;'
        this.isPC = (function () {
            var userAgentInfo = navigator.userAgent
            var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod")
            var flag = true
            for (var v = 0; v < Agents.length; v++) {
                if (userAgentInfo.indexOf(Agents[v]) > 0) {
                    flag = false
                    break
                }
            }
            return flag
        })()
        this.touchstart = this.isPC ? 'mousedown' : 'touchstart'
        this.touchmove = this.isPC ? 'mousemove' : 'touchmove'
        this.touchend = this.isPC ? 'mouseup' : 'touchend'
        this.scrollStart = options.scrollStart
        this.scrollMove = options.scrollMove
        this.scrollEnd = options.scrollEnd
        this.rangePrefix = options.rangePrefix || function (range) { return range + 'px' }
        this.revertHandler = options.revertHandler
    }
    /** 初始化滑动块 */
    Scroller.prototype.init = function () {
        var moveHandle = this.moveHandler.bind(this)
        // 防止下拉时整个body跟着下拉
        document.body.addEventListener(this.touchmove, function (e) {
            e.stopPropagation()
            e.stopImmediatePropagation()
        })
        // 滑动开始
        this.wrapper.addEventListener(this.touchstart, function (e) {
            if (this.scrollStart && typeof this.scrollStart === 'function') this.scrollStart(e)
            this.startSite = this.isPC ? e.screenY : e.touches[0].screenY;
            //滑动过程
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
            if (scrollTop <= 0) this.wrapper.addEventListener(this.touchmove, moveHandle)
        }.bind(this))
        // 滑动结束
        this.wrapper.addEventListener(this.touchend, function (e) {
            var revert = this.revert.bind(this)
            var revertHandler = this.revertHandler
            if (this.scrollEnd && typeof this.scrollEnd === 'function') this.scrollEnd(e)
            this.wrapper.removeEventListener(this.touchmove, moveHandle)
            if (!revertHandler) return revert(0)
            if (!revertHandler.condition() || typeof revertHandler.handler !== 'function') return revert(0)
            revertHandler.handler(revert)
        }.bind(this))
    }
    /** 滑动处理 */
    Scroller.prototype.moveHandler = function (e) {
        if (this.scrollMove && typeof this.scrollMove === 'function') this.scrollMove(e)
        this.moveSite = this.isPC ? e.screenY : e.touches[0].screenY
        var range = this.moveSite - this.startSite
        var smoothScroll = this.smoothScroll
        var scroll = this.scroll.bind(this)
        //下滑
        if (range > 0) {
            e.preventDefault()
            if (range < smoothScroll) scroll(range)
            if (range >= smoothScroll && range <= (smoothScroll + this.roughScroll)) scroll(smoothScroll + (range - smoothScroll) * this.roughcoefficient)
        }
    }
    /** 执行滑动动画 */
    Scroller.prototype.scroll = function (range) {
        this.block.style.cssText = 'height:' + this.rangePrefix(range) + ';-webkit-transition-duration: 0ms;transition-duration: 0ms;' + this.cssParam
    }
    /** 滑块复原 */
    Scroller.prototype.revert = function (range) {
        range = range || 0
        this.block.style.cssText = 'height:' + this.rangePrefix(range) + ';-webkit-transition-duration: ' + this.revertSpeed + 'ms;transition-duration: ' + this.revertSpeed + 'ms;' + this.cssParam
    }
    return Scroller
})