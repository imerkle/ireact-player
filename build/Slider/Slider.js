'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _dom = require('../utils/dom.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Slider = (_temp = _class = function (_React$Component) {
  _inherits(Slider, _React$Component);

  function Slider(props) {
    _classCallCheck(this, Slider);

    var _this = _possibleConstructorReturn(this, (Slider.__proto__ || Object.getPrototypeOf(Slider)).call(this, props));

    _this.handleSliderMove = function (e) {
      if (!_this.props.isReady) {
        return false;
      }
      var x = (0, _dom.getPageX)(e),
          pos = void 0,
          percentage = void 0;

      var totalStyles = getComputedStyle(_this.total),
          offsetStyles = (0, _dom.offset)(_this.total),
          width = _this.total.offsetWidth;

      if (x < offsetStyles.left) {
        x = offsetStyles.left;
      } else if (x > width + offsetStyles.left) {
        x = width + offsetStyles.left;
      }
      pos = x - offsetStyles.left;
      percentage = pos / width;

      _this.setState({ percentage: percentage });
      if (_this.props.doHover || _this.state.mouseIsDown) {
        _this.props.onMove(percentage, totalStyles, pos, _this.state.mouseIsDown, _this.handle);
      }
    };

    _this.handleMouseMove = function (e) {
      if (!_this.state.mouseIsDown) {
        document.removeEventListener("mousemove", _this.handleSliderMove);
      }
      _this.handleSliderMove(e);
    };

    _this.handleMouseOut = function () {
      if (_this.state.mouseIsDown) {
        document.addEventListener("mousemove", _this.handleSliderMove);
        document.addEventListener("mouseup", _this.handleSliderUp);
      }
    };

    _this.handleMouseDown = function (e) {
      e.preventDefault();
      if (parseInt(e.button) != 0) {
        return false;
      }
      _this.setState({ mouseIsDown: true });
      _this.props.onDown(_this.state.percentage);
    };

    _this.handleMouseup = function (e) {
      e.preventDefault();
      _this.handleSliderUp();
      document.removeEventListener("mouseup", _this.handleSliderUp);
    };

    _this.handleSliderUp = function () {

      _this.props.onUp(_this.state.percentage);
      _this.setState({ mouseIsDown: false });
      document.removeEventListener("mousemove", _this.handleSliderMove);
      document.removeEventListener("mouseup", _this.handleSliderUp);
    };

    _this.state = {
      mouseIsDown: false,
      percentage: props.value
    };
    return _this;
  }

  _createClass(Slider, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _prefix = this.props._prefix;
      var mouseisDownClass = this.state.mouseIsDown ? "mouseIsDown" : "";

      return _react2.default.createElement(
        'div',
        { className: _prefix + '-rails ' + mouseisDownClass, onMouseDown: function onMouseDown(e) {
            _this2.handleMouseDown(e);
          }, onMouseUp: function onMouseUp(e) {
            _this2.handleMouseup(e);
          }, onMouseMove: function onMouseMove(e) {
            _this2.handleMouseMove(e);
          }, onMouseOut: function onMouseOut() {
            _this2.handleMouseOut();
          } },
        _react2.default.createElement(
          'div',
          { className: _prefix + '-total', ref: function ref(_ref2) {
              _this2.total = _ref2;
            } },
          this.props.totalChild,
          _react2.default.createElement('div', { className: _prefix + '-current', style: { transform: 'scaleX(' + this.props.value + ')' } }),
          _react2.default.createElement(
            'div',
            { className: _prefix + '-handle-wrapper' },
            _react2.default.createElement(
              'div',
              { className: _prefix + '-handle', ref: function ref(_ref) {
                  _this2.handle = _ref;
                }, style: { transform: 'translateX(' + this.props.value * 100 + '%)' } },
              _react2.default.createElement('div', { className: _prefix + '-handle-baby' })
            )
          )
        )
      );
    }
  }]);

  return Slider;
}(_react2.default.Component), _class.defaultProps = {
  onDown: function onDown() {},
  onUp: function onUp() {},
  onMove: function onMove() {},
  isReady: true,
  totalChild: "",
  doHover: false
}, _class.propTypes = {
  onDown: _propTypes2.default.func,
  onUp: _propTypes2.default.func,
  onMove: _propTypes2.default.func,
  isReady: _propTypes2.default.bool,
  doHover: _propTypes2.default.bool,
  step: _propTypes2.default.number,
  labelArray: _propTypes2.default.array
}, _temp);
exports.default = Slider;