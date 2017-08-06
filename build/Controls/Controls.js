'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _dec2, _class;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _mobxReact = require('mobx-react');

var _styles = require('material-ui/styles');

var _materialUi = require('material-ui');

var _materialSon = require('material-son');

var _constants = require('../constants.js');

var _features = require('../features');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var makeButton = function makeButton(icon, handleClick) {
  var tooltip = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";

  return _react2.default.createElement(
    _materialUi.IconButton,
    { style: { height: 36, padding: 0 }, onClick: function onClick(e) {
        handleClick(e);
      } },
    _react2.default.createElement(
      _materialUi.Icon,
      null,
      icon
    )
  );
};

var styleSheet = (0, _styles.createStyleSheet)(_constants.SHEET_NAME.CONTROLS, function (theme) {
  return {
    controlButton: {
      alignItems: "center",
      zIndex: 1,
      padding: "0px 10px"
    },
    rightControl: {
      display: "flex",
      justifyContent: "flex-end",
      marginRight: "10px"
    }
  };
});

var Controls = (_dec = (0, _styles.withStyles)(styleSheet), _dec2 = (0, _mobxReact.inject)('VideoPlayerStore'), _dec(_class = _dec2(_class = (0, _mobxReact.observer)(_class = function (_React$Component) {
  _inherits(Controls, _React$Component);

  function Controls(props) {
    _classCallCheck(this, Controls);

    return _possibleConstructorReturn(this, (Controls.__proto__ || Object.getPrototypeOf(Controls)).call(this, props));
  }

  _createClass(Controls, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          VideoPlayerStore = _props.VideoPlayerStore,
          classes = _props.classes;

      var _prefix = VideoPlayerStore._prefix;

      return _react2.default.createElement(
        _materialSon.FaDiv,
        { c: true, className: _prefix + '-controls', ref: function ref(_ref) {
            _this2.controls = _ref;
          } },
        _react2.default.createElement(_features.Rails, null),
        _react2.default.createElement(
          _materialSon.FaDiv,
          { fa: true, className: '' + classes.controlButton },
          _react2.default.createElement(_features.PlayPause, { makeButton: makeButton, handlePlayPause: this.props.handlePlayPause }),
          _react2.default.createElement(_features.Volume, { makeButton: makeButton }),
          _react2.default.createElement(_features.TimeCode, { current: VideoPlayerStore.tCurrent, total: VideoPlayerStore.tTotal, separator: this.props.separator }),
          _react2.default.createElement(
            _materialSon.Fa,
            { fs: true, className: '' + classes.rightControl },
            VideoPlayerStore.canBeCaption ? _react2.default.createElement(_features.ClosedCaption, { makeButton: makeButton, _prefix: VideoPlayerStore._prefix, isCaptionOn: VideoPlayerStore.isCaptionOn, onCaptionClick: function onCaptionClick() {
                VideoPlayerStore.isCaptionOn = !VideoPlayerStore.isCaptionOn;
              } }) : "",
            _react2.default.createElement(_features.Settings, { primaryColor: this.props.primaryColor }),
            _react2.default.createElement(_features.WideScreen, { makeButton: makeButton }),
            _react2.default.createElement(_features.FullScreen, { makeButton: makeButton })
          )
        )
      );
    }
  }]);

  return Controls;
}(_react2.default.Component)) || _class) || _class) || _class);
exports.default = Controls;