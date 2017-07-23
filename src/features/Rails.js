import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';

import Slider from '../Slider';
import { getCssMatrix } from '../utils/dom.js';
import { Fa } from 'material-son';

@inject('VideoPlayerStore') @observer
class Rails extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    const {VideoPlayerStore} = this.props;
    const {_prefix} = VideoPlayerStore;

    let negativehovered = (VideoPlayerStore.hoveredDirection) ? "" : "negativehovered";
    let totalChild = [
      (<div key="0" className={`${_prefix}-loaded`} style={{transform: `scaleX(${VideoPlayerStore.loadedTransform})`}}></div>),
      (<div key="1" className={`${_prefix}-hovered ${negativehovered}`} style={{left: `${VideoPlayerStore.hoveredLeft}px`,transform: `scaleX(${VideoPlayerStore.hoveredTransform})`}}></div>)
    ];

    return (
      <Fa className={`${_prefix}-main-slider`}>
        <Slider doHover={true} isPlaying={VideoPlayerStore.isPlaying} _prefix={_prefix} isReady={VideoPlayerStore.isReady} onMove={this.onMove} onDown={this.onDown} onUp={this.onUp} totalChild={totalChild} value={VideoPlayerStore.currentTransform} />
      </Fa>
    );
  }
  onMove = (percentage,totalStyles,pos,mouseIsDown,handle) => {
      const {VideoPlayerStore} = this.props;
      const getTransform = (() => {
              if (totalStyles.webkitTransform !== undefined) {
                return 'webkitTransform';
              } else if (totalStyles.mozTransform !== undefined) {
                return 'mozTransform ';
              } else if (totalStyles.oTransform !== undefined) {
                return 'oTransform';
              } else if (totalStyles.msTransform !== undefined) {
                return 'msTransform';
              } else {
                return 'transform';
              };
      })();
      this.newTime = (percentage <= 0.02) ? 0 : percentage * VideoPlayerStore.tTotal;
      if (mouseIsDown && VideoPlayerStore.tCurrent !== null && this.newTime.toFixed(4) !== VideoPlayerStore.tCurrent.toFixed(4)) {
        VideoPlayerStore.setCurrentTime(this.newTime);
      }
      const matrix = new window[getCssMatrix](getComputedStyle(handle)[getTransform]),
            handleLocation = matrix.m41,
            hoverScaleX = pos/parseFloat(totalStyles.width) - handleLocation/parseFloat(totalStyles.width);
      let hoveredDirection;
      if (hoverScaleX >= 0) {
        hoveredDirection = true;
      } else {
        hoveredDirection = false;
      }
      VideoPlayerStore.setValue({
        hoveredLeft: handleLocation,
        hoveredTransform: hoverScaleX,
        hoveredDirection: hoveredDirection
      });
    }
  onDown = () => {
      const {VideoPlayerStore} = this.props;
      const holdclickTime = 100;
      if(VideoPlayerStore.isPlaying){
        this.wasPlayingTimeout = setTimeout(() => {
          VideoPlayerStore.togglePlay(false,true);
          this.wasPlaying = true;
        },holdclickTime);
      }
    }
  onUp = () => {
      let {VideoPlayerStore} = this.props;
      if(this.wasPlayingTimeout){
        clearTimeout(this.wasPlayingTimeout);
      }
      if(this.wasPlaying){
        VideoPlayerStore.togglePlay(true,true);
      }
      VideoPlayerStore.seekTo(this.newTime);
      this.wasPlaying = false;
      VideoPlayerStore.setValue({
        isEnded: false,
        hoveredLeft: 0,
        hoveredTransform: 0
      });
  }
}
export default Rails;
