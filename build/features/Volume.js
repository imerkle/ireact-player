'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class, _desc, _value, _class2, _descriptor, _class3, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _mobxReact = require('mobx-react');

var _mobx = require('mobx');

var _Slider = require('../Slider');

var _Slider2 = _interopRequireDefault(_Slider);

var _materialSon = require('material-son');

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

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

var Volume = (_dec = (0, _mobxReact.inject)('VideoPlayerStore'), _dec(_class = (0, _mobxReact.observer)(_class = (_class2 = (_temp = _class3 = function (_React$Component) {
  _inherits(Volume, _React$Component);

  function Volume(props) {
    _classCallCheck(this, Volume);

    var _this = _possibleConstructorReturn(this, (Volume.__proto__ || Object.getPrototypeOf(Volume)).call(this, props));

    _initDefineProp(_this, 'hideSlider', _descriptor, _this);

    _this.showVolumeSlider = function () {
      _this.hideSlider = false;
      if (_this.hideInTimer) clearTimeout(_this.hideInTimer);
    };

    _this.hideVolumeSlider = function () {
      var hideInTime = 2000;

      _this.hideInTimer = setTimeout(function () {
        _this.hideSlider = true;
      }, hideInTime);
    };

    _this.handleVolumeToggle = function () {
      var VideoPlayerStore = _this.props.VideoPlayerStore;

      if (!_this.isMuted) {
        _this.lastVolume = VideoPlayerStore.vCurrent;
        VideoPlayerStore.setVolume(0);
        _this.isMuted = true;
      } else {
        _this.isMuted = false;
        if (_this.lastVolume < .1) {
          _this.lastVolume = 1;
        }
        VideoPlayerStore.setVolume(_this.lastVolume);
      }
    };

    _this.onMoveVolume = function (percentage) {
      var VideoPlayerStore = _this.props.VideoPlayerStore;

      VideoPlayerStore.setVolume(percentage);
    };

    return _this;
  }

  _createClass(Volume, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var VideoPlayerStore = this.props.VideoPlayerStore;
      var _prefix = VideoPlayerStore._prefix;


      return _react2.default.createElement(
        _materialSon.FaDiv,
        { fa: true, className: _prefix + '-volume-container ' + (this.hideSlider ? "compress" : ""), onMouseEnter: function onMouseEnter() {
            _this2.showVolumeSlider();
          }, onMouseLeave: function onMouseLeave() {
            _this2.hideVolumeSlider();
          } },
        _react2.default.createElement(
          _materialSon.Fa,
          { className: _prefix + '-volume-button' },
          this.props.makeButton(VideoPlayerStore.vCurrent == 0 ? 'volume_off' : VideoPlayerStore.vCurrent > 0.5 ? "volume_up" : 'volume_down', function () {
            _this2.handleVolumeToggle();
          })
        ),
        _react2.default.createElement(
          _materialSon.Fa,
          { fs: true, className: _prefix + '-volume-slider-container ' + (this.hideSlider ? "hideSlider" : "") },
          _react2.default.createElement(_Slider2.default, { _prefix: _prefix, onMove: this.onMoveVolume, onDown: this.onMoveVolume, isReady: VideoPlayerStore.isReady, value: VideoPlayerStore.vCurrent })
        )
      );
    }
  }]);

  return Volume;
}(_react2.default.Component), _class3.propTypes = {
  makeButton: _propTypes2.default.func.isRequired
}, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'hideSlider', [_mobx.observable], {
  enumerable: true,
  initializer: function initializer() {
    return true;
  }
})), _class2)) || _class) || _class);
exports.default = Volume;