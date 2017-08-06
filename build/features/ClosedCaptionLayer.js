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

var _reactRnd = require('react-rnd');

var _reactRnd2 = _interopRequireDefault(_reactRnd);

var _materialSon = require('material-son');

var _styles = require('material-ui/styles');

var _constants = require('../constants.js');

var _dom = require('../utils/dom.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styleSheet = (0, _styles.createStyleSheet)(_constants.SHEET_NAME.CCLayer, function (theme) {
  return {
    root: {
      width: '100%',
      height: '90%',
      zIndex: 20
    },
    flaps: {
      color: '#f8f8f8',
      backgroundColor: 'rgba(0,0,0,.8)',
      padding: '10px',
      borderRadius: '4px',
      '&:empty': {
        display: 'none'
      }
    }
  };
});

var ClosedCaptionLayer = (_dec = (0, _styles.withStyles)(styleSheet), _dec(_class = (_temp = _class2 = function (_React$Component) {
  _inherits(ClosedCaptionLayer, _React$Component);

  function ClosedCaptionLayer(props) {
    _classCallCheck(this, ClosedCaptionLayer);

    var _this = _possibleConstructorReturn(this, (ClosedCaptionLayer.__proto__ || Object.getPrototypeOf(ClosedCaptionLayer)).call(this, props));

    _this.display = function () {
      return _this.state.cues.slice(0, 1).map(function (o, i) {
        return o.text;
      });
    };

    _this.state = {
      cues: []
    };
    _this.observeTimeout = null;
    return _this;
  }

  _createClass(ClosedCaptionLayer, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _this2 = this;

      if (!this.xhrGot && nextProps.isCaptionOn) {
        (0, _dom.getCues)(nextProps.url, function (cues) {
          _this2.cues = (0, _dom.getCueKeys)(cues);
          _this2.xhrGot = true;
        });
      }
      if (nextProps.isCaptionOn && !this.props.isCaptionOn || this.props.isCaptionOn && nextProps.currentTime != this.props.currentTime) {
        //clearTimeout(this.observeTimeout);
        if (!this.observeTimeout) {
          this.observeCaption(nextProps);
        }
      }
    }
  }, {
    key: 'observeCaption',
    value: function observeCaption() {
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

      var out = this.props.isCaptionOn ? _react2.default.createElement(
        _materialSon.Div,
        { className: _prefix + '-caption-layer ' + classes.root },
        _react2.default.createElement(
          _reactRnd2.default,
          { 'default': { x: 20, y: 50, width: 'auto', height: 'auto' }, enableResizing: 0, bounds: 'parent' },
          _react2.default.createElement(
            _materialSon.Div,
            { className: _prefix + '-unhinder ' + classes.flaps },
            this.display()
          )
        )
      ) : null;

      return out;
    }
  }]);

  return ClosedCaptionLayer;
}(_react2.default.Component), _class2.propTypes = {
  classes: _propTypes2.default.object.isRequired,
  isCaptionOn: _propTypes2.default.bool.isRequired,
  url: _propTypes2.default.string.isRequired,
  duration: _propTypes2.default.number.isRequired,
  currentTime: _propTypes2.default.number.isRequired,
  _prefix: _propTypes2.default.string
}, _class2.defaultProps = {
  _prefix: "ut"
}, _temp)) || _class);
exports.default = ClosedCaptionLayer;