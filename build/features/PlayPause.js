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

var _mobxReact = require('mobx-react');

var _materialSon = require('material-son');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PlayPause = (_dec = (0, _mobxReact.inject)('VideoPlayerStore'), _dec(_class = (0, _mobxReact.observer)(_class = (_temp = _class2 = function (_React$Component) {
  _inherits(PlayPause, _React$Component);

  function PlayPause(props) {
    _classCallCheck(this, PlayPause);

    return _possibleConstructorReturn(this, (PlayPause.__proto__ || Object.getPrototypeOf(PlayPause)).call(this, props));
  }

  _createClass(PlayPause, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var VideoPlayerStore = this.props.VideoPlayerStore;

      return _react2.default.createElement(
        _materialSon.Fa,
        null,
        this.props.makeButton(VideoPlayerStore.isPlaying && VideoPlayerStore.tCurrent > 0 ? 'pause' : VideoPlayerStore.isEnded ? "replay" : 'play_arrow', function () {
          _this2.props.handlePlayPause();
        })
      );
    }
  }]);

  return PlayPause;
}(_react2.default.Component), _class2.propTypes = {
  handlePlayPause: _propTypes2.default.func.isRequired,
  makeButton: _propTypes2.default.func.isRequired
}, _temp)) || _class) || _class);
exports.default = PlayPause;