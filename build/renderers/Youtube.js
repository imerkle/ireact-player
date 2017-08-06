'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _DEFAULT_PLAYER_VARS, _dec, _class, _class2, _temp;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _loadScript = require('load-script');

var _loadScript2 = _interopRequireDefault(_loadScript);

var _mobxReact = require('mobx-react');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var MATCH_START_QUERY = /[?&#](?:start|t)=([0-9hms]+)/;
var MATCH_START_STAMP = /(\d+)(h|m|s)/g;
var MATCH_NUMERIC = /^\d+$/;

// Parse YouTube URL for a start time param, ie ?t=1h14m30s
// and return the start time in seconds
var parseStartTime = function parseStartTime(url) {
  var match = url.match(MATCH_START_QUERY);
  if (match) {
    var stamp = match[1];
    if (stamp.match(MATCH_START_STAMP)) {
      return parseStartStamp(stamp);
    }
    if (MATCH_NUMERIC.test(stamp)) {
      return parseInt(stamp, 10);
    }
  }
  return 0;
};

var parseStartStamp = function parseStartStamp(stamp) {
  var seconds = 0;
  var array = MATCH_START_STAMP.exec(stamp);
  while (array !== null) {
    var _array = array,
        _array2 = _slicedToArray(_array, 3),
        count = _array2[1],
        period = _array2[2];

    if (period === 'h') seconds += parseInt(count, 10) * 60 * 60;
    if (period === 'm') seconds += parseInt(count, 10) * 60;
    if (period === 's') seconds += parseInt(count, 10);
    array = MATCH_START_STAMP.exec(stamp);
  }
  return seconds;
};
var YTstrObj = {
  "highres": 4320,
  "hd2160": 2160,
  "hd1440": 1440,
  "hd1080": 1080,
  "hd720": 720,
  "large": 480,
  "medium": 360,
  "small": 240,
  "tiny": 144
};
var yTQualityStrToInt = function yTQualityStrToInt(str) {
  return YTstrObj[str] || "auto";
};
var getKey = function getKey(obj, val) {
  return Object.keys(obj).find(function (key) {
    return obj[key] === val;
  });
};
var yTQualityValuetoString = function yTQualityValuetoString(val) {
  var index = getKey(YTstrObj, val);
  return index || "default";
};
var SDK_URL = 'https://www.youtube.com/iframe_api';
var SDK_GLOBAL = 'YT';
var SDK_GLOBAL_READY = 'onYouTubeIframeAPIReady';
var MATCH_URL = /^(?:https?:\/\/)?(?:www\.|m\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
var BLANK_VIDEO_URL = 'https://www.youtube.com/watch?v=MqRhQe6oaJA';
var DEFAULT_PLAYER_VARS = (_DEFAULT_PLAYER_VARS = {
  playsinline: 1,
  showinfo: 0,
  rel: 0,
  iv_load_policy: 3,
  disablekb: 1,
  enablejsapi: 1,
  controls: 0
}, _defineProperty(_DEFAULT_PLAYER_VARS, 'playsinline', 0), _defineProperty(_DEFAULT_PLAYER_VARS, 'cc_load_policy', 0), _DEFAULT_PLAYER_VARS);

var YouTube = (_dec = (0, _mobxReact.inject)('VideoPlayerStore'), _dec(_class = (0, _mobxReact.observer)(_class = (_temp = _class2 = function (_React$Component) {
  _inherits(YouTube, _React$Component);

  _createClass(YouTube, null, [{
    key: 'canPlay',
    value: function canPlay(url) {
      return MATCH_URL.test(url);
    }
  }]);

  function YouTube(props) {
    _classCallCheck(this, YouTube);

    var _this = _possibleConstructorReturn(this, (YouTube.__proto__ || Object.getPrototypeOf(YouTube)).call(this, props));

    _this.seekTo = function (t) {
      _this.player.seekTo(t, true);
    };

    _this.togglePlay = function (startPlaying) {
      if (startPlaying) {
        _this.player.playVideo();
      } else {
        _this.player.pauseVideo();
      }
    };

    _this.setVolume = function (v) {
      _this.player.setVolume(parseInt(v * 100));
    };

    _this.setSpeed = function (r) {
      _this.player.setPlaybackRate(r);
    };

    _this.setSource = function (src) {
      var VideoPlayerStore = _this.props.VideoPlayerStore;

      var val = VideoPlayerStore.qualityArray[VideoPlayerStore.urlIndex].value;
      _this.player.stopVideo();
      //this.player.setPlaybackQuality(yTQualityValuetoString(val));
      _this.player.setPlaybackQuality("small");
      _this.player.playVideo();
    };

    _this.setFullScreen = function (doFullscreen) {
      _this.props.updater.onFullScreen({
        doFullscreen: doFullscreen,
        div: _this.ref
      });
    };

    _this.onTimeUpdate = function () {
      var t = _this.player.getCurrentTime();

      _this.props.updater.onTimeUpdate(t);
      _this.onTimeUpdateTimer = setTimeout(function () {
        if (_this.player.getPlayerState() === 1) {
          _this.onTimeUpdate();
        }
      }, 500);
    };

    _this.onPlay = function () {
      _this.onTimeUpdate();

      if (_this.setQuality) {
        var VideoPlayerStore = _this.props.VideoPlayerStore;


        var qualityLevels = _this.player.getAvailableQualityLevels();
        var url = VideoPlayerStore.currentUrl;
        var qualityArray = VideoPlayerStore.qualityArray;
        qualityLevels.map(function (v) {
          if (v !== "auto") {
            qualityArray.push({ src: url, value: yTQualityStrToInt(v) });
          }
        });
        _this.props.VideoPlayerStore.setValue({
          qualityArray: qualityArray
        });
        _this.setQuality = false;
      }
    };

    _this.onPause = function () {
      if (_this.onTimeUpdateTimer) {
        clearTimeout(_this.onTimeUpdateTimer);
        _this.onTimeUpdateTimer = null;
      }
    };

    _this.onReady = function () {
      _this.props.updater.onReady(_this.player.getDuration());
    };

    _this.onWaiting = function () {
      var loaded = _this.player.getVideoLoadedFraction(); // fraction
      var duration = _this.player.getDuration();
      _this.props.updater.onBuffering(loaded * duration);
      _this.onWaitingTimeout = setTimeout(function () {
        if (loaded < 1) {
          _this.onWaiting();
        }
      }, 2000);
    };

    _this.onBuffer = function () {
      _this.onWaiting();
      //this.props.updater.onWaiting();
    };

    _this.onStateChange = function (_ref) {
      var data = _ref.data;
      var updater = _this.props.updater;
      var _window$SDK_GLOBAL$Pl = window[SDK_GLOBAL].PlayerState,
          PLAYING = _window$SDK_GLOBAL$Pl.PLAYING,
          PAUSED = _window$SDK_GLOBAL$Pl.PAUSED,
          BUFFERING = _window$SDK_GLOBAL$Pl.BUFFERING,
          ENDED = _window$SDK_GLOBAL$Pl.ENDED,
          CUED = _window$SDK_GLOBAL$Pl.CUED;

      if (data === PLAYING) _this.onPlay();
      if (data === PAUSED) _this.onPause();
      if (data === BUFFERING) _this.onBuffer();
      if (data === ENDED) updater.onEnded();
      if (data === CUED) updater.onReady();
    };

    _this.ref = function (container) {
      _this.container = container;
    };

    _this.setQuality = true;
    return _this;
  }

  _createClass(YouTube, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var url = this.props.VideoPlayerStore.currentURL;
      if (!url) {
        this.preloading = true;
        this.load(BLANK_VIDEO_URL);
      } else {
        this.load(url);
      }
      this.props.VideoPlayerStore.onMountEvents = {
        seekTo: this.seekTo,
        togglePlay: this.togglePlay,
        setVolume: this.setVolume,
        setSpeed: this.setSpeed,
        setSource: this.setSource,
        setFullScreen: this.setFullScreen
      };
    }

    /* Mount Events here */


    /* Mount Events ends here */

  }, {
    key: 'getSDK',
    value: function getSDK() {
      if (window[SDK_GLOBAL] && window[SDK_GLOBAL].loaded) {
        return Promise.resolve(window[SDK_GLOBAL]);
      }
      return new Promise(function (resolve, reject) {
        var previousOnReady = window[SDK_GLOBAL_READY];
        window[SDK_GLOBAL_READY] = function () {
          if (previousOnReady) previousOnReady();
          resolve(window[SDK_GLOBAL]);
        };
        (0, _loadScript2.default)(SDK_URL, function (err) {
          if (err) reject(err);
        });
      });
    }
  }, {
    key: 'load',
    value: function load(url) {
      var _this2 = this;

      var _props = this.props,
          _onError = _props.onError,
          VideoPlayerStore = _props.VideoPlayerStore;

      var id = url && url.match(MATCH_URL)[1];
      if (VideoPlayerStore.isReady) {
        this.player.cueVideoById({
          videoId: id,
          startSeconds: parseStartTime(url)
        });
        return;
      }
      if (this.loadingSDK) {
        this.loadOnReady = url;
        return;
      }
      VideoPlayerStore.loadingSDK = true;
      this.getSDK().then(function (YT) {
        _this2.player = new YT.Player(_this2.container, {
          width: '100%',
          height: '100%',
          videoId: id,
          playerVars: _extends({}, DEFAULT_PLAYER_VARS, {
            start: parseStartTime(url),
            origin: window.location.origin,
            autoplay: _this2.props.autoplay
          }),
          events: {
            onReady: _this2.onReady,
            onStateChange: _this2.onStateChange,
            onError: function onError(event) {
              return _onError(event.data);
            }
          }
        });
      }, _onError);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement('div', { ref: this.ref });
    }
  }]);

  return YouTube;
}(_react2.default.Component), _class2.displayName = 'YouTube', _class2.defaultProps = {
  onError: function onError() {},
  autoplay: 0
}, _temp)) || _class) || _class);
exports.default = YouTube;