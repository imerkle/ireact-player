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

var _materialSon = require('material-son');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TimeCode = (_temp = _class = function (_React$Component) {
  _inherits(TimeCode, _React$Component);

  function TimeCode(props) {
    _classCallCheck(this, TimeCode);

    return _possibleConstructorReturn(this, (TimeCode.__proto__ || Object.getPrototypeOf(TimeCode)).call(this, props));
  }

  _createClass(TimeCode, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _materialSon.Fa,
        null,
        (0, _dom.secondsToTimeCode)(this.props.current) + ' ' + this.props.separator + ' ' + (0, _dom.secondsToTimeCode)(this.props.total)
      );
    }
  }]);

  return TimeCode;
}(_react2.default.Component), _class.propTypes = {
  current: _propTypes2.default.number.isRequired,
  total: _propTypes2.default.number.isRequired,
  separator: _propTypes2.default.string
}, _class.defaultProps = {
  separator: "/"
}, _temp);
exports.default = TimeCode;