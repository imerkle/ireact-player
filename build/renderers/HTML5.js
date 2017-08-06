'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class, _class2, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _mobxReact = require('mobx-react');

var _hls = require('hls.js');

var _hls2 = _interopRequireDefault(_hls);

var _dashjs = require('dashjs');

var _dashjs2 = _interopRequireDefault(_dashjs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//import Base from './Base'

var getAverageBufferedFactor = function getAverageBufferedFactor(range, depth) {
  var newRange = range.slice(Math.max(range.length - depth, 1));
  var average = 0;
  newRange.map(function (r) {
    average += r.end - r.start;
  });
  return average / newRange.length;
};

var makeLinearGradient = function makeLinearGradient(_ref) {
  var color1 = _ref.color1,
      color2 = _ref.color2,
      _ref$y = _ref.y0,
      y0 = _ref$y === undefined ? 20 : _ref$y,
      _ref$y2 = _ref.y1,
      y1 = _ref$y2 === undefined ? 45 : _ref$y2;

  var ctx = document.createElement('canvas').getContext('2d');
  var l = ctx.createLinearGradient(0, y0, 0, y1);
  l.addColorStop(0, color1);
  l.addColorStop(.5, color2);
  l.addColorStop(1, color1);
  return l;
};

var AUDIO_EXTENSIONS = /\.(m4a|mp4a|mpga|mp2|mp2a|mp3|m2a|m3a|wav|weba|aac|oga|spx)($|\?)/i;
var HLS_EXTENSIONS = /\.(m3u8)($|\?)/i;
var DASH_EXTENSIONS = /\.(mpd)($|\?)/i;

var FilePlayer = (_dec = (0, _mobxReact.inject)('VideoPlayerStore'), _dec(_class = (0, _mobxReact.observer)(_class = (_temp = _class2 = function (_React$Component) {
  _inherits(FilePlayer, _React$Component);

  function FilePlayer(props) {
    _classCallCheck(this, FilePlayer);

    var _this = _possibleConstructorReturn(this, (FilePlayer.__proto__ || Object.getPrototypeOf(FilePlayer)).call(this, props));

    _this.togglePlay = function (startPlaying) {
      if (startPlaying) {
        _this.player.play();
      } else {
        _this.player.pause();
      }
    };

    _this.setVolume = function (fraction) {
      _this.player.volume = fraction;
    };

    _this.seekTo = function (seekTime) {
      _this.player.currentTime = seekTime;
    };

    _this.setSpeed = function (fraction) {
      _this.player.playbackRate = fraction;
    };

    _this.setSource = function (source) {
      _this.player.src = source;
      _this.eachSecondWorthMB = _this.eachSecondWorth();
      if (_this.bufferingTimer) {
        clearTimeout(_this.bufferingTimer);
      }
    };

    _this.setFullScreen = function (doFullscreen) {
      _this.props.updater.onFullScreen({
        doFullscreen: doFullscreen,
        div: _this.player
      });
    };

    _this.onReady = function () {
      _this.props.updater.onReady(_this.player.duration);

      _this.eachSecondWorthMB = _this.eachSecondWorth();
      _this.startBuffering();
    };

    _this.onWaiting = function () {
      _this.props.updater.onWaiting();
    };

    _this.onTimeupdate = function () {
      _this.props.updater.onTimeUpdate(_this.player.currentTime);

      var VideoPlayerStore = _this.props.VideoPlayerStore;
      //some optimizations

      if (VideoPlayerStore.showNerdStats) {
        var decodedFrames = _this.getDecodedFrame();
        VideoPlayerStore.setValue({
          droppedFrames: _this.getDroppedFrame(),
          decodedFrames: decodedFrames > VideoPlayerStore.maxFrames ? VideoPlayerStore.maxFrames : decodedFrames
        });
      }
    };

    _this.onEnded = function () {
      _this.props.updater.onEnded();
    };

    _this.onError = function () {
      _this.props.updater.onError();
    };

    _this.startBuffering = function () {
      var VideoPlayerStore = _this.props.VideoPlayerStore;

      var seconds_factor = 1;
      var average_depth = 6;
      var auto_modulus = 5;
      if (VideoPlayerStore.isReady && (VideoPlayerStore.tLoaded < VideoPlayerStore.tTotal || VideoPlayerStore.tLoaded == 0)) {
        var b_len = _this.player.buffered.length - 1;
        var b_start = _this.player.buffered.start(b_len);
        var b_end = _this.player.buffered.end(b_len);
        var bufferedSeconds = b_end;

        _this.props.updater.onBuffering(bufferedSeconds);

        if (VideoPlayerStore.isAutoQuality || VideoPlayerStore.showNerdStats) {

          /*Some crazy workaround i wrote so dont even fuckin bother*/

          /*push all buffered data*/
          var prev_b_end = _this.bufferedRanges[_this.bufferedRanges.length - 1].end;
          if (prev_b_end != b_end && b_end > prev_b_end) {
            _this.bufferedRanges.push({ start: prev_b_end, end: b_end });
          }

          var divide_factor = 1.4;
          var bRange = getAverageBufferedFactor(_this.bufferedRanges, average_depth);

          var kbps = parseFloat((bRange / seconds_factor * _this.eachSecondWorthMB * 1000).toFixed(4));
          VideoPlayerStore.setValue({
            kbps: kbps
          });
          /*Ends damn */

          /*modify quality every auto_modulus seconds*/
          if (_this.bufferedRanges.length % auto_modulus === 0) {
            var newUrlIndex = void 0;

            VideoPlayerStore.qualityArray.slice(0).reverse().map(function (n, i) {
              if (!newUrlIndex && kbps >= n.size / n.duration * 1000 / divide_factor) {
                newUrlIndex = VideoPlayerStore.qualityArray.length - 1 - i;
              }
            });

            if (newUrlIndex && VideoPlayerStore.urlIndex != newUrlIndex) {
              var bufferHealth = VideoPlayerStore.tLoaded - VideoPlayerStore.tCurrent;
              if (bufferHealth < 5) {
                //VideoPlayerStore.setSource(newUrlIndex);
              }
            }
          }
        }

        _this.bufferingTimer = setTimeout(_this.startBuffering, seconds_factor * 1000);
      }
    };

    _this.eachSecondWorth = function () {
      return _this.getCurrentSize() / _this.props.VideoPlayerStore.tTotal;
    };

    _this.getCurrentSize = function () {
      var VideoPlayerStore = _this.props.VideoPlayerStore;

      return VideoPlayerStore.qualityArray[VideoPlayerStore.urlIndex].size || 0;
    };

    _this.ref = function (player) {
      _this.player = player;
    };

    _this.renderSource = function (source) {
      var src = source.src,
          value = source.value,
          type = source.type;

      return _react2.default.createElement('source', { src: src, type: type });
    };

    _this.load = function (url) {
      var hls = new _hls2.default();
      if (_this.shouldUseHLS(url)) {
        hls.loadSource(url);
        hls.attachMedia(_this.player);
      }
      if (_this.shouldUseDASH(url)) {
        var player = _dashjs2.default.MediaPlayer().create();
        player.getDebug().setLogToBrowserConsole(false);
        player.initialize(_this.player, url, false);
      }
    };

    _this.eachSecondWorthMB = 0;
    _this.bufferedRanges = [{ start: 0, end: 0 }];
    return _this;
  }

  _createClass(FilePlayer, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      this.player.addEventListener("canplay", this.onReady);
      this.player.addEventListener("waiting", this.onWaiting);
      this.player.addEventListener("timeupdate", this.onTimeupdate);
      this.player.addEventListener("ended", this.onEnded);

      ["error"].map(function (n) {
        _this2.player.addEventListener(n, _this2.onError);
      });
      var VideoPlayerStore = this.props.VideoPlayerStore;

      VideoPlayerStore.onMountEvents = {
        togglePlay: this.togglePlay,
        seekTo: this.seekTo,
        setVolume: this.setVolume,
        setSpeed: this.setSpeed,
        setSource: this.setSource,
        setFullScreen: this.setFullScreen
      };
      this.load(VideoPlayerStore.currentURL);
    }

    /*Mount evends end*/

  }, {
    key: 'getDroppedFrame',
    value: function getDroppedFrame() {
      return this.player.webkitDroppedFrameCount || 0;
    }
  }, {
    key: 'getDecodedFrame',
    value: function getDecodedFrame() {
      return this.player.webkitDecodedFrameCount || this.player.mozDecodedFrames || 0;
    }
  }, {
    key: 'render',
    value: function render() {
      var VideoPlayerStore = this.props.VideoPlayerStore;


      var qualityArray = VideoPlayerStore.qualityArray;
      var urlIndex = VideoPlayerStore.urlIndex;

      var useAudio = AUDIO_EXTENSIONS.test(VideoPlayerStore.currentURL);
      var Element = useAudio ? 'audio' : 'video';

      return _react2.default.createElement(
        Element,
        {
          ref: this.ref,
          preload: 'auto',
          loop: VideoPlayerStore.doLoop
        },
        this.renderSource(qualityArray[urlIndex])
      );
    }
  }, {
    key: 'shouldUseHLS',
    value: function shouldUseHLS(url) {
      return HLS_EXTENSIONS.test(url);
    }
  }, {
    key: 'shouldUseDASH',
    value: function shouldUseDASH(url) {
      return DASH_EXTENSIONS.test(url);
    }
  }]);

  return FilePlayer;
}(_react2.default.Component), _class2.defaultProps = {
  _prefix: "ut"
}, _class2.propTypes = {
  _prefix: _propTypes2.default.string
}, _class2.canPlay = function (url) {
  return true;
}, _temp)) || _class) || _class);
exports.default = FilePlayer;