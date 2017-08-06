'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class, _desc, _value, _class2, _descriptor, _descriptor2, _class3, _temp;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _mobxReact = require('mobx-react');

var _mobx = require('mobx');

var _reactRnd = require('react-rnd');

var _reactRnd2 = _interopRequireDefault(_reactRnd);

var _materialUi = require('material-ui');

var _styles = require('material-ui/styles');

var _materialSon = require('material-son');

var _reactContextmenuMaterial = require('react-contextmenu-material');

var _copyToClipboard = require('copy-to-clipboard');

var _copyToClipboard2 = _interopRequireDefault(_copyToClipboard);

var _Controls = require('../Controls');

var _Controls2 = _interopRequireDefault(_Controls);

var _features = require('../features');

var _VideoPlayerStore = require('../stores/VideoPlayerStore.js');

var _VideoPlayerStore2 = _interopRequireDefault(_VideoPlayerStore);

var _BaseStoreUpdater = require('../renderers/BaseStoreUpdater.js');

var _BaseStoreUpdater2 = _interopRequireDefault(_BaseStoreUpdater);

var _getVendor2 = require('../utils/getVendor.js');

var _getVendor3 = _interopRequireDefault(_getVendor2);

var _dom = require('../utils/dom.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var secondaryColor = '#f8f8f8';

var theme = (0, _styles.createMuiTheme)({
  palette: (0, _styles.createPalette)({
    type: 'dark' // Switching the dark mode on is a single property value change.
  }),
  vplayer: {
    primaryColor: '#f12c35',
    primaryColorLight: '#fb3942',
    secondaryColor: secondaryColor,
    disabledPrimary: '#bdbdbd',
    disabledSecondary: '#5e5e5e'
  }
});

var themeLight = (0, _styles.createMuiTheme)({
  palette: (0, _styles.createPalette)({
    type: 'light'
  })
});
var hideBottom = {
  bottom: '-15%',
  transition: '.15s linear bottom'
};
var styleSheet = (0, _styles.createStyleSheet)('MsonVideoPlayer', function (theme) {
  var _nerdUL;

  return {
    context_root: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      zIndex: 10,
      minWidth: '250px'
    },
    nerdUL: (_nerdUL = {
      listStyle: 'none',
      padding: '5px',
      color: secondaryColor,
      fontSize: '12px'
    }, _defineProperty(_nerdUL, 'padding', '21px'), _defineProperty(_nerdUL, '& li', {
      padding: '2px',
      '& label': {
        fontWeight: 'bold',
        marginRight: '5px',
        '&:after': {
          content: ":"
        }
      }
    }), _nerdUL),
    videoLayer: {
      height: '100%',
      width: '100%',
      '& video': {
        height: '100%',
        width: '100%'
      }
    },
    controlsLayer: _extends({
      width: '100%',
      zIndex: '10',
      color: secondaryColor,
      fontSize: '13px'
    }, hideBottom),
    controlBg: _extends({
      position: 'absolute',
      bottom: '0',
      height: '100px',
      width: '100%',
      backgroundImage: 'url(https://i.imgur.com/uMopswI.png)',
      backgroundRepeat: 'repeat-x',
      pointerEvents: 'none',
      backgroundPosition: 'bottom'
    }, hideBottom),
    playpauseLayer: {
      top: '0',
      position: 'absolute',
      height: '100%',
      width: '100%',
      zIndex: '1',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    playpauseanimate: {
      opacity: '0',
      transformOrigin: 'bottom',
      transition: '1s linear all',
      pointerEvents: 'none',
      zIndex: '10',
      background: 'hsla(0, 0%, 0%, .3)',
      borderRadius: '50%',
      color: secondaryColor,
      '&.beginanimate': {
        animation: 'playpauseFadeAnimate 1s ease-out'
      }
    },
    iconButton: {
      height: 24,
      padding: 0,
      color: secondaryColor
    }
  };
});

var addParam = function addParam(url, param, value) {
  var a = document.createElement('a'),
      regex = /(?:\?|&amp;|&)+([^=]+)(?:=([^&]*))*/g;
  var match,
      str = [];a.href = url;param = encodeURIComponent(param);
  while (match = regex.exec(a.search)) {
    if (param != match[1]) str.push(match[1] + (match[2] ? "=" + match[2] : ""));
  }str.push(param + (value ? "=" + encodeURIComponent(value) : ""));
  a.search = str.join("&");
  return a.href;
};
var makeButton = function makeButton(classes, icon, handleClick) {
  var tooltip = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "";

  return _react2.default.createElement(
    _materialUi.IconButton,
    { className: classes.iconButton, onClick: function onClick(e) {
        handleClick(e);
      } },
    _react2.default.createElement(
      _materialUi.Icon,
      { color: 'inherit' },
      icon
    )
  );
};
var labelList = function labelList(label, value) {
  return _react2.default.createElement(
    'li',
    null,
    _react2.default.createElement(
      'label',
      null,
      label
    ),
    value
  );
};
var randomGenerate = function randomGenerate() {
  var minimum = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
  var maximum = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1000;

  return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
};

var VideoPlayer = (_dec = (0, _styles.withStyles)(styleSheet), _dec(_class = (0, _mobxReact.observer)(_class = (_class2 = (_temp = _class3 = function (_React$Component) {
  _inherits(VideoPlayer, _React$Component);

  function VideoPlayer(props) {
    _classCallCheck(this, VideoPlayer);

    var _this = _possibleConstructorReturn(this, (VideoPlayer.__proto__ || Object.getPrototypeOf(VideoPlayer)).call(this, props));

    _initDefineProp(_this, 'snackBarOpen', _descriptor, _this);

    _initDefineProp(_this, 'snackBarMessage', _descriptor2, _this);

    _this.openSnackBar = function (msg) {
      _this.snackBarOpen = true;
      _this.snackBarMessage = msg;
    };

    _this.extenstionLayersPrint = function (_prefix) {
      var out = _this.props.extenstionLayers.map(function (n, i) {
        return _react2.default.createElement(
          _materialSon.Div,
          { className: _prefix + '-' + n.label + '-layer', key: i },
          _react2.default.createElement(
            _mobxReact.Provider,
            { store: n.store },
            n.component
          )
        );
      });
      return out || null;
    };

    _this.onOver = function (bool) {
      var onOverTimeoutSeconds = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3000;

      if (bool === false) {
        _this.onOverTimeout = setTimeout(function () {
          _this.VideoPlayerStore.isOverPlayer = bool;
        }, onOverTimeoutSeconds);
      } else {
        _this.VideoPlayerStore.isOverPlayer = bool;
        if (_this.onOverTimeout) {
          clearTimeout(_this.onOverTimeout);
        }
      }
    };

    _this.handlePlayPause = function () {
      var VideoPlayerStore = _this.VideoPlayerStore || _this.props.VideoPlayerStore;
      if (!VideoPlayerStore.isReady) return false;
      VideoPlayerStore.togglePlay();
      VideoPlayerStore.beginanimate = true;
      setTimeout(function () {
        VideoPlayerStore.beginanimate = false;
      }, 500);
    };

    _this.handleScreenType = function (e) {
      (0, _dom.stToggle)(e, _this.VideoPlayerStore);
    };

    var src = _this.props.src;


    _this.VideoPlayerStore = new _VideoPlayerStore2.default({ url: src, autoQuality: _this.props.autoQuality, annotation_url: _this.props.annotation_url, caption_url: _this.props.caption_url });

    var updater = new _BaseStoreUpdater2.default({ store: _this.VideoPlayerStore });

    _this.vendorProps = {
      updater: updater
    };

    _this.contextMenuId = props.prefix + '-' + randomGenerate() + '-' + Math.round(new Date().getTime() / 1000);
    return _this;
  }

  _createClass(VideoPlayer, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var VideoPlayerStore = this.VideoPlayerStore;
      var src = VideoPlayerStore.currentURL;

      var _getVendor = (0, _getVendor3.default)({ src: src, props: this.vendorProps }),
          vendor = _getVendor.vendor,
          component = _getVendor.component;

      var minWidth = 460;
      var minHeight = 350;

      var _prefix = VideoPlayerStore._prefix;
      var playpause = VideoPlayerStore.isPlaying && VideoPlayerStore.tCurrent > 0 ? 'play_arrow' : 'pause';
      var beginanimate = VideoPlayerStore.beginanimate ? "beginanimate" : "";
      var fscl = VideoPlayerStore.isFullScreen ? "isFullScreen" : "";

      var render_out = void 0;
      var rndBool = VideoPlayerStore.screenType == 2;
      var enableResizing = {
        bottom: rndBool,
        bottomLeft: rndBool,
        bottomRight: rndBool,
        left: rndBool,
        right: rndBool,
        top: rndBool,
        topLeft: rndBool,
        topRight: rndBool
      };

      var _props$style = this.props.style,
          w = _props$style.width,
          h = _props$style.height,
          sty = _objectWithoutProperties(_props$style, ['width', 'height']);

      var _props = this.props,
          classes = _props.classes,
          stats = _props.stats;


      render_out = _react2.default.createElement(
        _styles.MuiThemeProvider,
        { theme: theme },
        _react2.default.createElement(
          _materialSon.Div,
          null,
          _react2.default.createElement(
            _reactRnd2.default,
            { 'default': { x: 0, y: 0, width: w, height: h }, className: _prefix + '-rnd ' + _prefix + '-screen-' + VideoPlayerStore.screenType, disableDragging: !rndBool, enableResizing: enableResizing, bounds: this.props.bounds, dragHandlerClassName: '.' + _prefix + '-dragger', minWidth: minWidth, minHeight: minHeight },
            _react2.default.createElement(
              _reactContextmenuMaterial.ContextMenuTrigger,
              { id: this.contextMenuId, style: { height: '100%', width: '100%' } },
              _react2.default.createElement(
                _materialSon.FaDiv,
                { className: _prefix + '-dragger' },
                makeButton(classes, 'close', function (e) {
                  _this2.handleScreenType(e);
                })
              ),
              _react2.default.createElement(
                _materialSon.Div,
                {
                  className: _prefix + '-player ' + fscl + ' ' + (!VideoPlayerStore.isPlaying || VideoPlayerStore.isSettingsOpen || VideoPlayerStore.isOverPlayer ? "showControls" : "hideControls") + ' ',
                  style: _extends({}, sty),
                  onMouseEnter: function onMouseEnter() {
                    _this2.onOver(true);
                  },
                  onMouseLeave: function onMouseLeave() {
                    _this2.onOver(false);
                  },
                  onClick: function onClick(e) {
                    if (e.target.closest('.' + _prefix + '-unhinder')) {
                      return false;
                    }
                    _this2.handlePlayPause();
                  }
                },
                _react2.default.createElement(
                  _mobxReact.Provider,
                  { VideoPlayerStore: VideoPlayerStore },
                  _react2.default.createElement(
                    _materialSon.Div,
                    { className: _prefix + '-layers' },
                    _react2.default.createElement(
                      _materialSon.Div,
                      { className: '' + classes.videoLayer },
                      component
                    ),
                    _react2.default.createElement(
                      _materialSon.Div,
                      { className: _prefix + '-errortv-layer' },
                      _react2.default.createElement(_features.ErrorTv, { _prefix: VideoPlayerStore._prefix, isError: VideoPlayerStore.isError })
                    ),
                    VideoPlayerStore.showNerdStats ? _react2.default.createElement(
                      _materialSon.Div,
                      { className: _prefix + '-nerds-layer' },
                      _react2.default.createElement(
                        _materialUi.Paper,
                        null,
                        _react2.default.createElement(
                          'ul',
                          { className: classes.nerdUL },
                          stats.map(function (o) {
                            return labelList(o.label, o.value);
                          }),
                          labelList("Volume", Math.round(VideoPlayerStore.vCurrent * 100) + '%'),
                          labelList("Buffer Health", (VideoPlayerStore.tLoaded - VideoPlayerStore.tCurrent).toFixed(1) + 's'),
                          labelList("Network Activity", (VideoPlayerStore.tLoaded == VideoPlayerStore.tTotal ? 0 : VideoPlayerStore.kbps.toFixed(2)) + ' KB'),
                          labelList("Dropped Frames", VideoPlayerStore.droppedFrames + '/' + VideoPlayerStore.decodedFrames)
                        )
                      )
                    ) : "",
                    _react2.default.createElement(
                      _materialSon.Div,
                      { className: _prefix + '-playpause-layer ' + classes.playpauseLayer },
                      _react2.default.createElement(
                        _materialUi.Icon,
                        { className: 'playpauseanimate ' + classes.playpauseanimate + ' ' + beginanimate, style: { color: 'contrast' } },
                        playpause
                      )
                    ),
                    this.props.annotation_url ? _react2.default.createElement(_features.Annotation, {
                      url: this.props.annotation_url,
                      isAnnotation: VideoPlayerStore.isAnnotation,

                      duration: VideoPlayerStore.tTotal,
                      currentTime: VideoPlayerStore.tCurrent,
                      _prefix: VideoPlayerStore._prefix
                    }) : "",
                    this.props.caption_url ? _react2.default.createElement(_features.ClosedCaptionLayer, {
                      url: this.props.caption_url,
                      isCaptionOn: VideoPlayerStore.isCaptionOn,

                      duration: VideoPlayerStore.tTotal,
                      currentTime: VideoPlayerStore.tCurrent,
                      _prefix: VideoPlayerStore._prefix
                    }) : "",
                    _react2.default.createElement(_materialSon.Div, { className: _prefix + '-control-bg ' + classes.controlBg }),
                    _react2.default.createElement(
                      _materialSon.Div,
                      { className: _prefix + '-controls-layer ' + classes.controlsLayer + ' ' + _prefix + '-unhinder' },
                      _react2.default.createElement(_Controls2.default, { primaryColor: this.props.primaryColor, handlePlayPause: this.handlePlayPause, separator: this.props.separator })
                    ),
                    _react2.default.createElement(
                      _materialSon.Div,
                      { className: _prefix + '-buffer-layer' },
                      VideoPlayerStore.isBuffering || !VideoPlayerStore.isReady ? _react2.default.createElement(_materialSon.LinearIndeterminate, null) : ""
                    ),
                    this.extenstionLayersPrint(_prefix)
                  )
                )
              )
            )
          ),
          _react2.default.createElement(
            _reactContextmenuMaterial.ContextMenu,
            { id: this.contextMenuId, classes: { root: classes.context_root } },
            _react2.default.createElement(
              _reactContextmenuMaterial.MenuItem,
              {
                onClick: function onClick() {
                  var url = window.location.href;
                  (0, _copyToClipboard2.default)(url);
                  _this2.openSnackBar("Video URL copied");
                } },
              'Copy video URL'
            ),
            _react2.default.createElement(
              _reactContextmenuMaterial.MenuItem,
              {
                onClick: function onClick() {
                  var url = window.location.href;
                  (0, _copyToClipboard2.default)(addParam(url, "t", VideoPlayerStore.tCurrent.toFixed(2)));
                  _this2.openSnackBar('Video URL copied at ' + VideoPlayerStore.tCurrent.toFixed(2) + 's');
                } },
              'Copy video URL at current time'
            ),
            _react2.default.createElement(
              _reactContextmenuMaterial.MenuItem,
              {
                onClick: function onClick() {
                  VideoPlayerStore.setValue({
                    doLoop: !VideoPlayerStore.doLoop
                  });
                },
                checked: VideoPlayerStore.doLoop,
                rightIcon: VideoPlayerStore.doLoop ? _react2.default.createElement(
                  _materialUi.Icon,
                  null,
                  'checked'
                ) : "",
                preventClose: true },
              'Loop'
            ),
            _react2.default.createElement(
              _reactContextmenuMaterial.MenuItem,
              {
                onClick: function onClick() {
                  VideoPlayerStore.showNerdStats = !VideoPlayerStore.showNerdStats;
                },
                checked: VideoPlayerStore.showNerdStats,
                rightIcon: VideoPlayerStore.showNerdStats ? _react2.default.createElement(
                  _materialUi.Icon,
                  null,
                  'checked'
                ) : "",
                preventClose: true },
              'Developer Stats'
            )
          ),
          _react2.default.createElement(
            _styles.MuiThemeProvider,
            { theme: themeLight },
            _react2.default.createElement(_materialUi.Snackbar, {
              anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'left'
              },
              message: this.snackBarMessage,
              onRequestClose: function onRequestClose() {
                _this2.snackBarOpen = false;
              },
              open: this.snackBarOpen
            })
          )
        )
      );
      return render_out;
    }
  }]);

  return VideoPlayer;
}(_react2.default.Component), _class3.defaultProps = {
  separator: "/",
  primaryColor: '#f12c35',
  bounds: "body",
  autoQuality: true,
  annotation_url: "",
  caption_url: "",
  extenstionLayers: [],
  stats: []
}, _class3.propTypes = {
  src: _propTypes2.default.oneOfType([_propTypes2.default.string.isRequired, _propTypes2.default.array.isRequired]),
  classes: _propTypes2.default.object.isRequired,
  stats: _propTypes2.default.array,
  separator: _propTypes2.default.string,
  primaryColor: _propTypes2.default.string,
  bounds: _propTypes2.default.string,
  autoQuality: _propTypes2.default.bool,
  caption_url: _propTypes2.default.string,
  annotation_url: _propTypes2.default.string,
  extenstionLayers: _propTypes2.default.array
}, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'snackBarOpen', [_mobx.observable], {
  enumerable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'snackBarMessage', [_mobx.observable], {
  enumerable: true,
  initializer: function initializer() {
    return "";
  }
})), _class2)) || _class) || _class);
exports.default = VideoPlayer;