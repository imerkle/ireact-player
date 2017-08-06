'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class, _class2, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _mobxReact = require('mobx-react');

var _dom = require('../utils/dom.js');

var _materialSon = require('material-son');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WideScreen = (_dec = (0, _mobxReact.inject)('VideoPlayerStore'), _dec(_class = (0, _mobxReact.observer)(_class = (_temp = _class2 = function (_React$Component) {
  _inherits(WideScreen, _React$Component);

  function WideScreen(props) {
    _classCallCheck(this, WideScreen);

    var _this = _possibleConstructorReturn(this, (WideScreen.__proto__ || Object.getPrototypeOf(WideScreen)).call(this, props));

    _this.handleScreenType = function (e) {
      var VideoPlayerStore = _this.props.VideoPlayerStore;

      (0, _dom.stToggle)(e, VideoPlayerStore);
    };

    return _this;
  }

  _createClass(WideScreen, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var VideoPlayerStore = this.props.VideoPlayerStore;

      var _ref = VideoPlayerStore.screenType == 0 ? ['panorama_wide_angle', 'Widescreen'] : VideoPlayerStore.screenType == 1 ? ['all_out', 'Dock Out'] : ['crop_square', 'Normal'],
          _ref2 = _slicedToArray(_ref, 2),
          stc = _ref2[0],
          stt = _ref2[1];

      return _react2.default.createElement(
        _materialSon.Fa,
        null,
        this.props.makeButton(stc, function (e) {
          _this2.handleScreenType(e);
        }, stt)
      );
    }
  }]);

  return WideScreen;
}(_react2.default.Component), _class2.propTypes = {
  makeButton: _propTypes2.default.func.isRequired
}, _temp)) || _class) || _class);
exports.default = WideScreen;