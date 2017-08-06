'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _dec2, _class, _desc, _value, _class2, _descriptor, _class3, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _mobxReact = require('mobx-react');

var _mobx = require('mobx');

var _reactPerfectScrollbar = require('react-perfect-scrollbar');

var _reactPerfectScrollbar2 = _interopRequireDefault(_reactPerfectScrollbar);

var _materialUi = require('material-ui');

var _styles = require('material-ui/styles');

var _materialSon = require('material-son');

var _lodash = require('lodash.findindex');

var _lodash2 = _interopRequireDefault(_lodash);

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

var styleSheet = (0, _styles.createStyleSheet)('MsonSwitch', function (theme) {
  return {
    bar: {},
    default: {
      color: theme.vplayer.disabledPrimary,
      '& + $bar': {
        backgroundColor: theme.vplayer.disabledSecondary
      }
    },
    checked: {
      color: theme.vplayer.secondaryColor,
      '& + $bar': {
        backgroundColor: theme.vplayer.primaryColor,
        opacity: 1
      }
    }
  };
});
var toggleSwichListItem = function toggleSwichListItem(classes, label, store, index) {
  return _react2.default.createElement(
    _materialSon.ListItem,
    { button: true, onClick: function onClick(e) {
        store[index] = !store[index];
      } },
    _react2.default.createElement(_materialSon.ListItemText, { primary: label }),
    _react2.default.createElement(_materialUi.Switch, {
      classes: {
        bar: classes.bar,
        default: classes.default,
        checked: classes.checked
      },
      checked: store[index] })
  );
};

var Settings = (_dec = (0, _styles.withStyles)(styleSheet), _dec2 = (0, _mobxReact.inject)('VideoPlayerStore'), _dec(_class = _dec2(_class = (0, _mobxReact.observer)(_class = (_class2 = (_temp = _class3 = function (_React$Component) {
  _inherits(Settings, _React$Component);

  function Settings(props) {
    _classCallCheck(this, Settings);

    var _this = _possibleConstructorReturn(this, (Settings.__proto__ || Object.getPrototypeOf(Settings)).call(this, props));

    _initDefineProp(_this, 'settingsListOpen', _descriptor, _this);

    _this.settingsCloseDoc = function (e) {
      var VideoPlayerStore = _this.props.VideoPlayerStore;

      var slist = e.target.closest('.' + VideoPlayerStore._prefix + '-settingsList');
      if (!slist) {
        VideoPlayerStore.isSettingsOpen = false;
        document.removeEventListener('click', _this.settingsCloseDoc);
      }
    };

    _this.menuList = function (itemArray, chooseVal, currentVal) {
      return itemArray.map(function (a, i) {
        return _react2.default.createElement(
          _materialSon.ListItem,
          {
            button: true,
            style: _extends({}, _this.styles.labelStyle),
            key: i,
            onTouchTap: function onTouchTap() {
              chooseVal(a.value);
            }
          },
          _react2.default.createElement(_materialSon.ListItemText, { secondary: a.label || a.value }),
          _react2.default.createElement(
            _materialUi.ListItemIcon,
            null,
            _react2.default.createElement(
              _materialUi.Icon,
              null,
              currentVal == a.value ? "check" : ""
            )
          )
        );
      });
    };

    _this.qualityList = function (itemArray, chooseVal, urlIndex) {
      var currentVal = itemArray[urlIndex].value;
      return itemArray.map(function (a, i) {
        return _react2.default.createElement(
          _materialSon.ListItem,
          {
            key: i,
            button: true,
            style: _extends({}, _this.styles.labelStyle),
            onTouchTap: function onTouchTap() {
              chooseVal(i);
            }
          },
          _react2.default.createElement(_materialSon.ListItemText, { primary: '' + (a.label || a.value + 'p'), secondary: a.fps && a.fps > 30 ? a.fps : a.suffix ? a.suffix : "" }),
          _react2.default.createElement(
            _materialUi.ListItemIcon,
            null,
            _react2.default.createElement(
              _materialUi.Icon,
              null,
              currentVal == a.value ? "check" : ""
            )
          )
        );
      });
    };

    _this.chooseQuality = function (index) {
      var VideoPlayerStore = _this.props.VideoPlayerStore;

      VideoPlayerStore.setSource(index);
    };

    _this.chooseSpeed = function (val) {
      var VideoPlayerStore = _this.props.VideoPlayerStore;

      VideoPlayerStore.setSpeed(val);
    };

    _this.handleSettingsOpen = function (open) {
      var VideoPlayerStore = _this.props.VideoPlayerStore;

      VideoPlayerStore.isSettingsOpen = open;
    };

    _this.styles = {
      thumbOff: {
        backgroundColor: '#bdbdbd'
      },
      trackOff: {
        backgroundColor: '#5e5e5e'
      },
      thumbSwitched: {
        backgroundColor: '#f8f8f8'
      },
      trackSwitched: {
        backgroundColor: _this.props.primaryColor
      },
      labelStyle: {
        color: '#cccaca',
        fontSize: '13px'
      }
    };
    return _this;
  }

  _createClass(Settings, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          VideoPlayerStore = _props.VideoPlayerStore,
          classes = _props.classes;
      var _prefix = VideoPlayerStore._prefix;


      var maxHeight = 400;
      var speedArray = [{ value: 0.25 }, { value: 0.5 }, { value: 0.75 }, { label: "Normal", value: 1 }, { value: 2 }, { value: 4 }];
      var styles = this.styles;
      var qualityArray = VideoPlayerStore.qualityArray;
      var currentQuality = qualityArray[VideoPlayerStore.urlIndex];
      var qualityLabel = (currentQuality.label || currentQuality.value + 'p') + ' ' + (currentQuality.fps && currentQuality.fps > 30 ? currentQuality.fps : currentQuality.suffix ? currentQuality.suffix : "");

      var toggleStyle = {
        thumbStyle: styles.thumbOff,
        trackStyle: styles.trackOff,
        thumbSwitchedStyle: styles.thumbSwitched,
        trackSwitchedStyle: styles.trackSwitched,
        labelStyle: styles.labelStyle
      };

      var currentSpeedIndex = speedArray[(0, _lodash2.default)(speedArray, function (o) {
        return o.value == VideoPlayerStore.speed;
      })];
      {/*settings*/}
      return _react2.default.createElement(
        _materialSon.Fa,
        null,
        _react2.default.createElement(
          _materialUi.IconButton,
          { style: { height: 36, padding: 0 }, onClick: function onClick() {
              VideoPlayerStore.isSettingsOpen = !VideoPlayerStore.isSettingsOpen;
              if (VideoPlayerStore.isSettingsOpen) {
                document.addEventListener('click', _this2.settingsCloseDoc);
              } else {
                document.removeEventListener('click', _this2.settingsCloseDoc);
              }
            } },
          _react2.default.createElement(
            _materialUi.Icon,
            null,
            'settings'
          )
        ),
        _react2.default.createElement(
          _materialUi.List,
          { className: _prefix + '-settingsList ' + (VideoPlayerStore.isSettingsOpen ? "" : "invisible"), style: { maxHeight: maxHeight + 'px' } },
          VideoPlayerStore.canBeAnnotation ? toggleSwichListItem(classes, 'Annotation', VideoPlayerStore, 'isAnnotation') : "",
          VideoPlayerStore.canBeAutoQuality ? toggleSwichListItem(classes, 'Auto Quality', VideoPlayerStore, 'isAutoQuality') : "",
          _react2.default.createElement(
            _materialSon.ListItem,
            {
              button: true,
              nestedItems: this.menuList(speedArray, this.chooseSpeed, VideoPlayerStore.speed)
            },
            _react2.default.createElement(_materialSon.ListItemText, { primary: 'Speed', secondary: currentSpeedIndex.label || currentSpeedIndex.value })
          ),
          qualityArray.length > 1 ? _react2.default.createElement(
            _materialSon.ListItem,
            {
              button: true,
              nestedItems: this.qualityList(qualityArray, this.chooseQuality, VideoPlayerStore.urlIndex)
            },
            _react2.default.createElement(_materialSon.ListItemText, { primary: 'Quality', secondary: qualityLabel })
          ) : ""
        )
      );
    }
  }]);

  return Settings;
}(_react2.default.Component), _class3.propTypes = {
  primaryColor: _propTypes2.default.string.isRequired,
  classes: _propTypes2.default.object.isRequired
}, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'settingsListOpen', [_mobx.observable], {
  enumerable: true,
  initializer: function initializer() {
    return false;
  }
})), _class2)) || _class) || _class) || _class);
exports.default = Settings;