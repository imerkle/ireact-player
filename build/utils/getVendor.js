'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getVendor;

var _renderers = require('../renderers');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getVendor(_ref) {
  var src = _ref.src,
      vendor = _ref.vendor,
      props = _ref.props;

  src = src || '';

  if (vendor === 'youtube' || /youtube.com|youtu.be/.test(src)) {
    return { vendor: 'youtube', component: _react2.default.createElement(_renderers.Youtube, props) };
  } else if (vendor === 'vimeo' || /vimeo.com/.test(src)) {
    return { vendor: 'vimeo', component: _react2.default.createElement(Vimeo, props) };
  } else {
    var isAudio = vendor === 'audio' || /\.(mp3|wav|m4a)($|\?)/i.test(src);
    return { vendor: isAudio ? 'audio' : 'video', component: _react2.default.createElement(_renderers.HTML5, props) };
  }
}