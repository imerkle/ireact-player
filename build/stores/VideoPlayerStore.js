'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _desc, _value, _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _descriptor15, _descriptor16, _descriptor17, _descriptor18, _descriptor19, _descriptor20, _descriptor21, _descriptor22, _descriptor23, _descriptor24, _descriptor25, _descriptor26, _descriptor27, _descriptor28, _descriptor29, _descriptor30, _descriptor31, _descriptor32, _descriptor33, _descriptor34, _descriptor35, _descriptor36, _descriptor37, _descriptor38, _descriptor39, _descriptor40, _descriptor41, _descriptor42, _descriptor43, _descriptor44;

var _mobx = require('mobx');

var _lodash = require('lodash.findindex');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _initDefineProp(target, property, descriptor, context) {
  if (!descriptor) return;
  Object.defineProperty(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
}

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

function _initializerWarningHelper(descriptor, context) {
  throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
}

var VideoPlayerStore = (_class = function () {
  function VideoPlayerStore(_ref) {
    var _this = this;

    var url = _ref.url,
        _ref$_prefix = _ref._prefix,
        _prefix = _ref$_prefix === undefined ? "ut" : _ref$_prefix,
        _ref$vCurrent = _ref.vCurrent,
        vCurrent = _ref$vCurrent === undefined ? 1.0 : _ref$vCurrent,
        _ref$autoQuality = _ref.autoQuality,
        autoQuality = _ref$autoQuality === undefined ? true : _ref$autoQuality,
        _ref$annotation_url = _ref.annotation_url,
        annotation_url = _ref$annotation_url === undefined ? null : _ref$annotation_url,
        _ref$caption_url = _ref.caption_url,
        caption_url = _ref$caption_url === undefined ? null : _ref$caption_url;

    _classCallCheck(this, VideoPlayerStore);

    _initDefineProp(this, 'urlIndex', _descriptor, this);

    _initDefineProp(this, 'qualityArray', _descriptor2, this);

    _initDefineProp(this, 'isPlaying', _descriptor3, this);

    _initDefineProp(this, 'isFullScreen', _descriptor4, this);

    _initDefineProp(this, 'doLoop', _descriptor5, this);

    _initDefineProp(this, 'screenType', _descriptor6, this);

    _initDefineProp(this, 'isBuffering', _descriptor7, this);

    _initDefineProp(this, 'isReady', _descriptor8, this);

    _initDefineProp(this, 'isLoadingSDK', _descriptor9, this);

    _initDefineProp(this, 'isError', _descriptor10, this);

    _initDefineProp(this, 'tLoaded', _descriptor11, this);

    _initDefineProp(this, 'tCurrent', _descriptor12, this);

    _initDefineProp(this, 'tTotal', _descriptor13, this);

    _initDefineProp(this, 'vCurrent', _descriptor14, this);

    _initDefineProp(this, 'speed', _descriptor15, this);

    _initDefineProp(this, 'hoveredLeft', _descriptor16, this);

    _initDefineProp(this, 'hoveredTransform', _descriptor17, this);

    _initDefineProp(this, 'hoveredDirection', _descriptor18, this);

    _initDefineProp(this, 'mouseIsDown', _descriptor19, this);

    _initDefineProp(this, 'beginanimate', _descriptor20, this);

    _initDefineProp(this, '_prefix', _descriptor21, this);

    _initDefineProp(this, 'isOverPlayer', _descriptor22, this);

    _initDefineProp(this, 'isSettingsOpen', _descriptor23, this);

    _initDefineProp(this, 'isAnnotation', _descriptor24, this);

    _initDefineProp(this, 'canBeAnnotation', _descriptor25, this);

    _initDefineProp(this, 'isAutoQuality', _descriptor26, this);

    _initDefineProp(this, 'canBeAutoQuality', _descriptor27, this);

    _initDefineProp(this, 'isCaptionOn', _descriptor28, this);

    _initDefineProp(this, 'canBeCaption', _descriptor29, this);

    _initDefineProp(this, 'droppedFrames', _descriptor30, this);

    _initDefineProp(this, 'decodedFrames', _descriptor31, this);

    _initDefineProp(this, 'maxFrames', _descriptor32, this);

    _initDefineProp(this, 'kbps', _descriptor33, this);

    _initDefineProp(this, 'showNerdStats', _descriptor34, this);

    _initDefineProp(this, 'setValue', _descriptor35, this);

    _initDefineProp(this, 'togglePlay', _descriptor36, this);

    _initDefineProp(this, 'setVolume', _descriptor37, this);

    _initDefineProp(this, 'setSpeed', _descriptor38, this);

    _initDefineProp(this, 'setSource', _descriptor39, this);

    _initDefineProp(this, 'fixTimeAfterSourceChange', _descriptor40, this);

    _initDefineProp(this, 'toggleFullscreen', _descriptor41, this);

    _initDefineProp(this, 'seekTo', _descriptor42, this);

    _initDefineProp(this, 'setCurrentTime', _descriptor43, this);

    _initDefineProp(this, 'setLoaded', _descriptor44, this);

    this.player = null;
    if (!(url instanceof Array)) {
      url = [{ src: url, value: "auto", label: "Auto", default: true }];
    }

    this.urlIndex = (0, _lodash2.default)(url, function (o) {
      return o.default === true;
    }) || 0;
    this.qualityArray = url;

    this.vCurrent = vCurrent;
    this._prefix = _prefix;
    this.isAutoQuality = autoQuality;
    if (!annotation_url) this.canBeAnnotation = false;
    if (!caption_url) this.canBeCaption = false;

    this.onMountEvents = {};

    url.map(function (n) {
      if (!n.size || !n.duration) {
        _this.canBeAutoQuality = false;
        _this.isAutoQuality = false;
        return;
      }
    });
  }

  _createClass(VideoPlayerStore, [{
    key: 'currentURL',
    get: function get() {
      return this.qualityArray[this.urlIndex].src;
    }
  }, {
    key: 'currentTransform',
    get: function get() {
      return this.tCurrent / this.tTotal;
    }
  }, {
    key: 'loadedTransform',
    get: function get() {
      return this.tLoaded / this.tTotal;
    }
  }, {
    key: 'handleTransform',
    get: function get() {
      return this.currentTransform * 100;
    }
  }]);

  return VideoPlayerStore;
}(), (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'urlIndex', [_mobx.observable], {
  enumerable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, 'qualityArray', [_mobx.observable], {
  enumerable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, 'isPlaying', [_mobx.observable], {
  enumerable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, 'isFullScreen', [_mobx.observable], {
  enumerable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class.prototype, 'doLoop', [_mobx.observable], {
  enumerable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class.prototype, 'screenType', [_mobx.observable], {
  enumerable: true,
  initializer: function initializer() {
    return 0;
  }
}), _descriptor7 = _applyDecoratedDescriptor(_class.prototype, 'isBuffering', [_mobx.observable], {
  enumerable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor8 = _applyDecoratedDescriptor(_class.prototype, 'isReady', [_mobx.observable], {
  enumerable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor9 = _applyDecoratedDescriptor(_class.prototype, 'isLoadingSDK', [_mobx.observable], {
  enumerable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor10 = _applyDecoratedDescriptor(_class.prototype, 'isError', [_mobx.observable], {
  enumerable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor11 = _applyDecoratedDescriptor(_class.prototype, 'tLoaded', [_mobx.observable], {
  enumerable: true,
  initializer: function initializer() {
    return 0.0;
  }
}), _descriptor12 = _applyDecoratedDescriptor(_class.prototype, 'tCurrent', [_mobx.observable], {
  enumerable: true,
  initializer: function initializer() {
    return 0.0;
  }
}), _descriptor13 = _applyDecoratedDescriptor(_class.prototype, 'tTotal', [_mobx.observable], {
  enumerable: true,
  initializer: function initializer() {
    return 0.0;
  }
}), _descriptor14 = _applyDecoratedDescriptor(_class.prototype, 'vCurrent', [_mobx.observable], {
  enumerable: true,
  initializer: null
}), _descriptor15 = _applyDecoratedDescriptor(_class.prototype, 'speed', [_mobx.observable], {
  enumerable: true,
  initializer: function initializer() {
    return 1;
  }
}), _descriptor16 = _applyDecoratedDescriptor(_class.prototype, 'hoveredLeft', [_mobx.observable], {
  enumerable: true,
  initializer: function initializer() {
    return 0.0;
  }
}), _descriptor17 = _applyDecoratedDescriptor(_class.prototype, 'hoveredTransform', [_mobx.observable], {
  enumerable: true,
  initializer: function initializer() {
    return 0.0;
  }
}), _descriptor18 = _applyDecoratedDescriptor(_class.prototype, 'hoveredDirection', [_mobx.observable], {
  enumerable: true,
  initializer: function initializer() {
    return true;
  }
}), _descriptor19 = _applyDecoratedDescriptor(_class.prototype, 'mouseIsDown', [_mobx.observable], {
  enumerable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor20 = _applyDecoratedDescriptor(_class.prototype, 'beginanimate', [_mobx.observable], {
  enumerable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor21 = _applyDecoratedDescriptor(_class.prototype, '_prefix', [_mobx.observable], {
  enumerable: true,
  initializer: null
}), _descriptor22 = _applyDecoratedDescriptor(_class.prototype, 'isOverPlayer', [_mobx.observable], {
  enumerable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor23 = _applyDecoratedDescriptor(_class.prototype, 'isSettingsOpen', [_mobx.observable], {
  enumerable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor24 = _applyDecoratedDescriptor(_class.prototype, 'isAnnotation', [_mobx.observable], {
  enumerable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor25 = _applyDecoratedDescriptor(_class.prototype, 'canBeAnnotation', [_mobx.observable], {
  enumerable: true,
  initializer: function initializer() {
    return true;
  }
}), _descriptor26 = _applyDecoratedDescriptor(_class.prototype, 'isAutoQuality', [_mobx.observable], {
  enumerable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor27 = _applyDecoratedDescriptor(_class.prototype, 'canBeAutoQuality', [_mobx.observable], {
  enumerable: true,
  initializer: function initializer() {
    return true;
  }
}), _descriptor28 = _applyDecoratedDescriptor(_class.prototype, 'isCaptionOn', [_mobx.observable], {
  enumerable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor29 = _applyDecoratedDescriptor(_class.prototype, 'canBeCaption', [_mobx.observable], {
  enumerable: true,
  initializer: function initializer() {
    return true;
  }
}), _descriptor30 = _applyDecoratedDescriptor(_class.prototype, 'droppedFrames', [_mobx.observable], {
  enumerable: true,
  initializer: function initializer() {
    return 0;
  }
}), _descriptor31 = _applyDecoratedDescriptor(_class.prototype, 'decodedFrames', [_mobx.observable], {
  enumerable: true,
  initializer: function initializer() {
    return 0;
  }
}), _descriptor32 = _applyDecoratedDescriptor(_class.prototype, 'maxFrames', [_mobx.observable], {
  enumerable: true,
  initializer: function initializer() {
    return 0;
  }
}), _descriptor33 = _applyDecoratedDescriptor(_class.prototype, 'kbps', [_mobx.observable], {
  enumerable: true,
  initializer: function initializer() {
    return 0;
  }
}), _descriptor34 = _applyDecoratedDescriptor(_class.prototype, 'showNerdStats', [_mobx.observable], {
  enumerable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor35 = _applyDecoratedDescriptor(_class.prototype, 'setValue', [_mobx.action], {
  enumerable: true,
  initializer: function initializer() {
    var _this2 = this;

    return function (stores) {
      var self = _this2;
      for (var key in stores) {
        self[key] = stores[key];
      }
    };
  }
}), _applyDecoratedDescriptor(_class.prototype, 'currentURL', [_mobx.computed], Object.getOwnPropertyDescriptor(_class.prototype, 'currentURL'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'currentTransform', [_mobx.computed], Object.getOwnPropertyDescriptor(_class.prototype, 'currentTransform'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'loadedTransform', [_mobx.computed], Object.getOwnPropertyDescriptor(_class.prototype, 'loadedTransform'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'handleTransform', [_mobx.computed], Object.getOwnPropertyDescriptor(_class.prototype, 'handleTransform'), _class.prototype), _descriptor36 = _applyDecoratedDescriptor(_class.prototype, 'togglePlay', [_mobx.action], {
  enumerable: true,
  initializer: function initializer() {
    var _this3 = this;

    return function () {
      var bool = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var force = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;


      _this3.isPlaying = force ? bool : !_this3.isPlaying;
      if (_this3.isPlaying) {
        _this3.isEnded = false;
      }
      _this3.onMountEvents.togglePlay(_this3.isPlaying);
    };
  }
}), _descriptor37 = _applyDecoratedDescriptor(_class.prototype, 'setVolume', [_mobx.action], {
  enumerable: true,
  initializer: function initializer() {
    var _this4 = this;

    return function (fraction) {
      _this4.vCurrent = fraction;
      _this4.onMountEvents.setVolume(_this4.vCurrent);
    };
  }
}), _descriptor38 = _applyDecoratedDescriptor(_class.prototype, 'setSpeed', [_mobx.action], {
  enumerable: true,
  initializer: function initializer() {
    var _this5 = this;

    return function (fraction) {
      _this5.speed = fraction;
      _this5.onMountEvents.setSpeed(_this5.speed);
    };
  }
}), _descriptor39 = _applyDecoratedDescriptor(_class.prototype, 'setSource', [_mobx.action], {
  enumerable: true,
  initializer: function initializer() {
    var _this6 = this;

    return function (urlIndex) {
      _this6.urlIndex = urlIndex;
      _this6.isReady = false;
      _this6.fixTime = _this6.tCurrent;

      var qA = _this6.qualityArray[_this6.urlIndex];
      _this6.onMountEvents.setSource(qA.src);
    };
  }
}), _descriptor40 = _applyDecoratedDescriptor(_class.prototype, 'fixTimeAfterSourceChange', [_mobx.action], {
  enumerable: true,
  initializer: function initializer() {
    var _this7 = this;

    return function () {
      if (_this7.fixTime) {
        _this7.seekTo(_this7.fixTime);
        _this7.fixTime = null;
        _this7.togglePlay(_this7.isPlaying, true);
      }
    };
  }
}), _descriptor41 = _applyDecoratedDescriptor(_class.prototype, 'toggleFullscreen', [_mobx.action], {
  enumerable: true,
  initializer: function initializer() {
    var _this8 = this;

    return function () {
      var bool = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var force = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      _this8.isFullScreen = force ? bool : !_this8.isFullScreen;
      _this8.onMountEvents.setFullScreen(_this8.isFullScreen);
    };
  }
}), _descriptor42 = _applyDecoratedDescriptor(_class.prototype, 'seekTo', [_mobx.action], {
  enumerable: true,
  initializer: function initializer() {
    var _this9 = this;

    return function (t) {
      /*when i extennally change time by sliding and shit*/
      _this9.tCurrent = t;
      _this9.onMountEvents.seekTo(_this9.tCurrent);
    };
  }
}), _descriptor43 = _applyDecoratedDescriptor(_class.prototype, 'setCurrentTime', [_mobx.action], {
  enumerable: true,
  initializer: function initializer() {
    var _this10 = this;

    return function (t) {
      /*when time is updated by dom in timeupdate*/
      _this10.tCurrent = t;
    };
  }
}), _descriptor44 = _applyDecoratedDescriptor(_class.prototype, 'setLoaded', [_mobx.action], {
  enumerable: true,
  initializer: function initializer() {
    var _this11 = this;

    return function (t) {
      _this11.tLoaded = t;
    };
  }
})), _class);
exports.default = VideoPlayerStore;