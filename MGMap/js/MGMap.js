(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
        typeof define === 'function' && define.amd ? define(factory) :
            (global = global || self, global.MGMap = factory());
}(this, function () {

    function isUndef(v) {
        return v === undefined || v === null
    }

    function isDef(v) {
        return v !== undefined && v !== null
    }

    function isTrue(v) {
        return v === true
    }

    function isFalse(v) {
        return v === false
    }

    function isString(v) {
        return typeof obj === 'string'
    }

    function isObject(obj) {
        return obj !== null && typeof obj === 'object'
    }

    var _toString = Object.prototype.toString;
    function isPlainObject(obj) {
        return _toString.call(obj) === '[object Object]'
    }

    function toString(val) {
        return val == null
            ? ''
            : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
                ? JSON.stringify(val, null, 2)
                : String(val)
    }

    function toNumber(val) {
        var n = parseFloat(val);
        return isNaN(n) ? val : n
    }

    var _this = _MGMap = null; // 继续高德地图实例

    var MGMap = function (domId, options) {
        if (options && !isObject(options)) {
            return console.error('options 参数不为对象格式');
        }
        this.zoom = 11;// 默认缩放比例
        this.center = [121.498586, 31.239637];// 默认地图中心
        this.lang = 'zh_cn'; //地图语言包 可选值：en，zh_en, zh_cn
        this.last_LngLat = null;// 暂存上次的地图中心经纬度
        if (!options || !Object.keys(options).length) {
            options = Object.create(null); //null不用{} 创建干净的空对象
            options.zoom = this.zoom;
            options.center = this.center;
            options.lang = this.lang;
            options.resizeEnable = true
        }
        this._initMap(domId, options);
    }

    MGMap.prototype = {
        constructor: MGMap,
        _initMap: function (domId, options) {
            this._MGMap = new AMap.Map(domId, options);
            console.info("version " + AMap.v)
            return this._MGMap
        },
        getMGMapView: function () {
            return this._MGMap;
        },
        isHaveMap: function () {
            return this._MGMap != null && this._MGMap != undefined;
        },
        getMGZoom: function () {// 获取地图缩放比例
            if (!this.isHaveMap()) return console.error('地图实例不存在');
            return this._MGMap.getZoom();
        },
        getMGLayers: function () {// 获取地图图层 
            if (!this.isHaveMap()) return console.error('地图实例不存在');
            return this._MGMap.getLayers();
        },
        getMGCenter: function () {// 获取地图中心
            if (!this.isHaveMap()) return console.error('地图实例不存在');
            return this._MGMap.getCenter();
        },
        setMGMapTheme: function (type) {// 设置地图主题色
            // 设置主题色 
            // [标准normal 幻影黑dark 月光银light 远山黛whitesmoke 草色青fresh 雅士灰grey 
            // 涂鸦graffiti 马卡龙macaron 靛青蓝blue 极夜蓝darkblue 酱籽wine]
            if (!this.isHaveMap()) return console.error('地图实例不存在');
            this._MGMap.setMapStyle('amap://styles/' + type);
        },
        setMGCenter: function (LngLat) { // 设置中心点
            this._MGMap.setCenter(this.last_LngLat);
        },
        setMGZoom: function (zoom) { // 设置中心点
            this._MGMap.setZoom(zoom);
        },
        setMGLang: function (lang) { // 设置地图语言
            if (!this.isHaveMap()) return console.error('地图实例不存在');
            this._MGMap.setLang(lang);
        }
    }

    return MGMap;
}))