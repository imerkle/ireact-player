"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BaseStoreUpdater = function BaseStoreUpdater() {
  var _this = this;

  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      store = _ref.store;

  _classCallCheck(this, BaseStoreUpdater);

  this.onReady = function (duration) {
    var p = _this.store.qualityArray[_this.store.urlIndex];
    var fps = p ? p.fps : 24;

    _this.store.setValue({
      isReady: true,
      tTotal: duration,
      maxFrames: (duration * fps).toFixed(0)
    });
    _this.store.fixTimeAfterSourceChange();
  };

  this.onWaiting = function () {
    _this.store.setValue({ isBuffering: true });
  };

  this.onTimeUpdate = function (t) {
    _this.store.setCurrentTime(t);
    _this.store.setValue({ isBuffering: false, isError: false });
  };

  this.onEnded = function () {
    if (_this.store.doLoop) {
      _this.store.seekTo(0);
    } else {
      _this.store.setValue({
        isEnded: true,
        isPlaying: false
      });
    }
  };

  this.onBuffering = function (s) {
    _this.store.setLoaded(s);
  };

  this.onError = function () {
    _this.store.setValue({
      isError: true
    });
  };

  this.onFullScreen = function () {
    var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        doFullscreen = _ref2.doFullscreen,
        div = _ref2.div;

    var player = div.closest("." + _this.store._prefix + "-player");
    if (doFullscreen) {
      if (player.mozRequestFullScreen) {
        player.mozRequestFullScreen();
      } else {
        player.webkitRequestFullScreen();
      }
    } else {
      if (document.mozCancelFullScreen) {
        (document.mozCancelFullScreen || document.cancelFullScreen).call(document);
      } else {
        (document.webkitCancelFullScreen || document.cancelFullScreen).call(document);
      }
    }
  };

  this.store = store;
};

exports.default = BaseStoreUpdater;