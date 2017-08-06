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

var styleSheet = (0, _styles.createStyleSheet)(_constants.SHEET_NAME.CC, function (theme) {
  return {
    isCaptionOn: {
      borderBottom: '2px solid ' + theme.vplayer.primaryColor
    }
  };
});
var ClosedCaption = (_dec = (0, _styles.withStyles)(styleSheet), _dec(_class = (_temp = _class2 = function (_React$Component) {
  _inherits(ClosedCaption, _React$Component);

  function ClosedCaption(props) {
    _classCallCheck(this, ClosedCaption);

    return _possibleConstructorReturn(this, (ClosedCaption.__proto__ || Object.getPrototypeOf(ClosedCaption)).call(this, props));
  }

  _createClass(ClosedCaption, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        _materialSon.Fa,
        { className: this.props.isCaptionOn ? '' + this.props.classes.isCaptionOn : "" },
        this.props.makeButton('closed_caption', function () {
          _this2.props.onCaptionClick();
        }, 'Closed Caption')
      );
    }
  }]);

  return ClosedCaption;
}(_react2.default.Component), _class2.propTypes = {
  makeButton: _propTypes2.default.func.isRequired,
  onCaptionClick: _propTypes2.default.func.isRequired,
  isCaptionOn: _propTypes2.default.bool.isRequired,
  _prefix: _propTypes2.default.string
}, _class2.defaultProps = {
  _prefix: "ut"
}, _temp)) || _class);
exports.default = ClosedCaption;