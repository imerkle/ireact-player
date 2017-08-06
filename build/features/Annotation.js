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

var _lodash = require('lodash.filter');

var _lodash2 = _interopRequireDefault(_lodash);

var _lodash3 = require('lodash.remove');

var _lodash4 = _interopRequireDefault(_lodash3);

var _lodash5 = require('lodash.uniqby');

var _lodash6 = _interopRequireDefault(_lodash5);

var _styles = require('material-ui/styles');

var _materialSon = require('material-son');

var _constants = require('../constants.js');

var _dom = require('../utils/dom.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var defaultStyleAttributes = {
  left: "0%",
  top: "0%",
  width: "150px",
  height: "150px",
  fontSize: "14px",
  fontFamily: "inherit",
  color: "rgba(255,255,255,1)",
  backgroundColor: "rgba(0,0,0,.6)",
  borderWidth: "0px",
  borderColor: "rgba(255,255,255,1)",
  padding: "4px",
  borderRadius: "0px",
  cursor: 'pointer',
  '&:hover': {
    opacity: .5
  }
};
var styleSheet = (0, _styles.createStyleSheet)(_constants.SHEET_NAME.ANN, {
  root: {
    height: '90%',
    width: '100%',
    zIndex: 1

  },
  flaps: defaultStyleAttributes,
  innerText: {
    padding: '10px'
  }
});

var Annotation = (_dec = (0, _styles.withStyles)(styleSheet), _dec(_class = (_temp = _class2 = function (_React$Component) {
  _inherits(Annotation, _React$Component);

  function Annotation(props) {
    _classCallCheck(this, Annotation);

    var _this = _possibleConstructorReturn(this, (Annotation.__proto__ || Object.getPrototypeOf(Annotation)).call(this, props));

    _this.display = function () {
      var classes = _this.props.classes;

      return _this.state.cues.map(function (o, i) {
        var _React$createElement;

        return o.hide ? "" : _react2.default.createElement(
          _materialSon.IconDiv,
          (_React$createElement = { className: _this.props._prefix + '-unhinder', onIconClick: function onIconClick() {
              var cues = _this.state.cues;
              cues[i].hide = true;
              _this.setState(cues);
            } }, _defineProperty(_React$createElement, 'className', classes.flaps), _defineProperty(_React$createElement, 'key', i), _defineProperty(_React$createElement, 'style', o.style), _React$createElement),
          _react2.default.createElement(
            _materialSon.Div,
            { className: classes.innerText },
            o.text
          )
        );
      });
    };

    _this.state = {
      cues: []
    };
    _this.observeTimeout = null;
    return _this;
  }

  _createClass(Annotation, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _this2 = this;

      if (!this.xhrGot && nextProps.isAnnotation) {
        (0, _dom.getCues)(nextProps.url, function (cues) {
          _this2.cues = (0, _dom.getCueKeys)(cues);
          _this2.xhrGot = true;
        });
      }
      if (nextProps.isAnnotation && !this.props.isAnnotation || this.props.isAnnotation && nextProps.currentTime != this.props.currentTime) {
        //clearTimeout(this.observeTimeout);
        if (!this.observeTimeout) {
          this.observeAnnotation(nextProps);
        }
      }
    }
  }, {
    key: 'observeAnnotation',
    value: function observeAnnotation() {
      var _this3 = this;

      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;

      var cTime = parseInt(props.currentTime) * 1000;
      var newState = this.state.cues;
      newState.push.apply(newState, _toConsumableArray((0, _lodash2.default)(this.cues, function (o) {
        return cTime >= o.start && cTime <= o.end;
      })));
      (0, _lodash4.default)(newState, function (o) {
        return cTime > o.end || cTime < o.start;
      });
      this.setState({ cues: (0, _lodash6.default)(newState, 'index') });
      this.observeTimeout = setTimeout(function () {
        _this3.observeTimeout = null;
      }, 500);
    }
  }, {
    key: 'render',
    value: function render() {
      var _prefix = this.props._prefix;
      var classes = this.props.classes;

      var out = this.props.isAnnotation ? _react2.default.createElement(
        _materialSon.Div,
        { className: _prefix + '-annotation-layer ' + classes.root },
        this.display()
      ) : null;

      return out;
    }
  }]);

  return Annotation;
}(_react2.default.Component), _class2.propTypes = {
  isAnnotation: _propTypes2.default.bool.isRequired,
  url: _propTypes2.default.string.isRequired,
  duration: _propTypes2.default.number.isRequired,
  currentTime: _propTypes2.default.number.isRequired,
  _prefix: _propTypes2.default.string
}, _class2.defaultProps = {
  _prefix: "ut"
}, _temp)) || _class);
exports.default = Annotation;