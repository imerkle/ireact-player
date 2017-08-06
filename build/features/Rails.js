'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _mobxReact = require('mobx-react');

var _Slider = require('../Slider');

var _Slider2 = _interopRequireDefault(_Slider);

var _dom = require('../utils/dom.js');

var _materialSon = require('material-son');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Rails = (_dec = (0, _mobxReact.inject)('VideoPlayerStore'), _dec(_class = (0, _mobxReact.observer)(_class = function (_React$Component) {
  _inherits(Rails, _React$Component);

  function Rails(props) {
    _classCallCheck(this, Rails);

    var _this = _possibleConstructorReturn(this, (Rails.__proto__ || Object.getPrototypeOf(Rails)).call(this, props));

    _this.onMove = function (percentage, totalStyles, pos, mouseIsDown, handle) {
      var VideoPlayerStore = _this.props.VideoPlayerStore;

      var getTransform = function () {
        if (totalStyles.webkitTransform !== undefined) {
          return 'webkitTransform';
        } else if (totalStyles.mozTransform !== undefined) {
          return 'mozTransform ';
        } else if (totalStyles.oTransform !== undefined) {
          return 'oTransform';
        } else if (totalStyles.msTransform !== undefined) {
          return 'msTransform';
        } else {
          return 'transform';
        };
      }();
      _this.newTime = percentage <= 0.02 ? 0 : percentage * VideoPlayerStore.tTotal;
      if (mouseIsDown && VideoPlayerStore.tCurrent !== null && _this.newTime.toFixed(4) !== VideoPlayerStore.tCurrent.toFixed(4)) {
        VideoPlayerStore.setCurrentTime(_this.newTime);
      }
      var matrix = new window[_dom.getCssMatrix](getComputedStyle(handle)[getTransform]),
          handleLocation = matrix.m41,
          hoverScaleX = pos / parseFloat(totalStyles.width) - handleLocation / parseFloat(totalStyles.width);
      var hoveredDirection = void 0;
      if (hoverScaleX >= 0) {
        hoveredDirection = true;
      } else {
        hoveredDirection = false;
      }
      VideoPlayerStore.setValue({
        hoveredLeft: handleLocation,
        hoveredTransform: hoverScaleX,
        hoveredDirection: hoveredDirection
      });
    };

    _this.onDown = function () {
      var VideoPlayerStore = _this.props.VideoPlayerStore;

      var holdclickTime = 100;
      if (VideoPlayerStore.isPlaying) {
        _this.wasPlayingTimeout = setTimeout(function () {
          VideoPlayerStore.togglePlay(false, true);
          _this.wasPlaying = true;
        }, holdclickTime);
      }
    };

    _this.onUp = function () {
      var VideoPlayerStore = _this.props.VideoPlayerStore;

      if (_this.wasPlayingTimeout) {
        clearTimeout(_this.wasPlayingTimeout);
      }
      if (_this.wasPlaying) {
        VideoPlayerStore.togglePlay(true, true);
      }
      VideoPlayerStore.seekTo(_this.newTime);
      _this.wasPlaying = false;
      VideoPlayerStore.setValue({
        isEnded: false,
        hoveredLeft: 0,
        hoveredTransform: 0
      });
    };

    return _this;
  }

  _createClass(Rails, [{
    key: 'render',
    value: function render() {
      var VideoPlayerStore = this.props.VideoPlayerStore;
      var _prefix = VideoPlayerStore._prefix;


      var negativehovered = VideoPlayerStore.hoveredDirection ? "" : "negativehovered";
      var totalChild = [_react2.default.createElement('div', { key: '0', className: _prefix + '-loaded', style: { transform: 'scaleX(' + VideoPlayerStore.loadedTransform + ')' } }), _react2.default.createElement('div', { key: '1', className: _prefix + '-hovered ' + negativehovered, style: { left: VideoPlayerStore.hoveredLeft + 'px', transform: 'scaleX(' + VideoPlayerStore.hoveredTransform + ')' } })];

      return _react2.default.createElement(
        _materialSon.Fa,
        { className: _prefix + '-main-slider' },
        _react2.default.createElement(_Slider2.default, { doHover: true, isPlaying: VideoPlayerStore.isPlaying, _prefix: _prefix, isReady: VideoPlayerStore.isReady, onMove: this.onMove, onDown: this.onDown, onUp: this.onUp, totalChild: totalChild, value: VideoPlayerStore.currentTransform })
      );
    }
  }]);

  return Rails;
}(_react2.default.Component)) || _class) || _class);
exports.default = Rails;