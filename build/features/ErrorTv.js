'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class, _class2, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _styles = require('material-ui/styles');

var _materialSon = require('material-son');

var _constants = require('../constants.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styleSheet = (0, _styles.createStyleSheet)(_constants.SHEET_NAME.ERROR, {
  wrapper: {
    position: "absolute",
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  innerText: {
    position: "absolute",
    color: "#FFF",
    fontSize: "30px",
    fontWeight: "bold"
  },
  canvas: {
    visibility: "visible!important",
    height: "100%",
    width: "100%",
    background: "#000"
  }
});

var ErrorTv = (_dec = (0, _styles.withStyles)(styleSheet), _dec(_class = (_temp = _class2 = function (_React$Component) {
  _inherits(ErrorTv, _React$Component);

  function ErrorTv(props) {
    _classCallCheck(this, ErrorTv);

    var _this = _possibleConstructorReturn(this, (ErrorTv.__proto__ || Object.getPrototypeOf(ErrorTv)).call(this, props));

    _this.prepareNoise = function () {
      _this.w = _this.errortvcanvas.width;
      _this.h = _this.errortvcanvas.height;

      _this.ocanvas.width = _this.w << 1;
      _this.ocanvas.height = _this.h << 1;

      var octx = _this.ocanvas.getContext("2d", { alpha: false });
      _this.idata = octx.createImageData(_this.ocanvas.width, _this.ocanvas.height);
      _this.buffer32 = new Uint32Array(_this.idata.data.buffer);
      _this.noise(octx);

      _this.ctx = _this.errortvcanvas.getContext("2d", { alpha: false });
      _this.loopTv();
    };

    _this.loopTv = function () {

      var x = _this.w * Math.random() | 0;
      var y = _this.h * Math.random() | 0;

      _this.ctx.drawImage(_this.ocanvas, -x, -y);
      if (_this.props.isError) window.requestAnimationFrame(_this.loopTv);

      _this.noise(_this.ctx);
    };

    _this.noise = function (ctx) {
      var len = _this.buffer32.length - 1;
      while (len--) {
        _this.buffer32[len] = Math.random() < 0.5 ? 0 : -1 >> 0;
      }ctx.putImageData(_this.idata, 0, 0);
    };

    return _this;
  }

  _createClass(ErrorTv, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.prepareNoise();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var classes = this.props.classes;

      return _react2.default.createElement(
        'div',
        { className: classes.wrapper + ' ' + (this.props.isError ? "" : "invisible") },
        _react2.default.createElement(
          'div',
          { className: '' + classes.innerText },
          this.props.errorText
        ),
        _react2.default.createElement('canvas', { ref: function ref(_ref) {
            _this2.errortvcanvas = _ref;
          }, className: '' + classes.canvas }),
        _react2.default.createElement('canvas', { ref: function ref(_ref2) {
            _this2.ocanvas = _ref2;
          }, className: 'invisible' })
      );
    }
  }]);

  return ErrorTv;
}(_react2.default.Component), _class2.propTypes = {
  isError: _propTypes2.default.bool.isRequired,
  errorText: _propTypes2.default.string,
  _prefix: _propTypes2.default.string.isRequired,
  width: _propTypes2.default.number,
  height: _propTypes2.default.number
}, _class2.defaultProps = {
  isError: false,
  errorText: 'There was an error in loading the Video.',
  _prefix: 'ut',
  width: 840,
  height: 400
}, _temp)) || _class);
exports.default = ErrorTv;