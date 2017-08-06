import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import { observable } from 'mobx';

import { createStyleSheet, withStyles } from 'material-ui/styles';
import Slider from '../Slider';
import { getCssMatrix } from '../utils/dom.js';
import { Paper } from 'material-ui';
import { Fa, Div } from 'material-son';
import { secondsToTimeCode, limitBetween, getCues, getCueKeys } from '../utils/dom.js';
import cx from 'classnames';

const styleSheet = createStyleSheet('MsonRails', theme => ({
  timeTooltip: {
    position: 'absolute',
    left: '0%',
    background: theme.vplayer.black,
    padding: '9px',
    borderRadius: '4px',
    textAlign: 'center',
  },
  timeTooltipWithThumb: {
    padding: '0px',
    paddingBottom: '9px',
  },
  invisible: {
    'display': 'none',
  }
}));
let perThumb = 0;
const paddingGap = 30;
const maxLeft = 90;
const maxLeftThumb = 70;
const midPercent = 45;
const midPercentThumb = 36;

@withStyles(styleSheet)
@inject('VideoPlayerStore') @observer
class Rails extends React.Component{
  @observable newTime = 0;
  @observable percentage = 0;
  @observable showTip = false;
  @observable cues = null;
  @observable cueIndex = 0;
  constructor(props){
    super(props);
  }
  render(){
    const { classes, VideoPlayerStore, thumbnail_url } = this.props;
    const { _prefix } = VideoPlayerStore;
    let currentCue = null;
    if(this.cues){
      //console.log(this.newTime, perThumb);
      const cueIndex = limitBetween(Math.floor(this.newTime/perThumb),0,this.cues.length - 1);
      currentCue = this.cues[cueIndex];
    }else{
      if(thumbnail_url && VideoPlayerStore.isReady){
        getCues(thumbnail_url, (cues)=>{
          this.cues = getCueKeys(cues);
          perThumb = limitBetween(VideoPlayerStore.tTotal/this.cues.length,0,VideoPlayerStore.tTotal);
        })
      }
    }

    let negativehovered = (VideoPlayerStore.hoveredDirection) ? "" : "negativehovered";
    let totalChild = [
      (<div key="0" className={`${_prefix}-loaded`} style={{transform: `scaleX(${VideoPlayerStore.loadedTransform})`}}></div>),
      (<div key="1" className={`${_prefix}-hovered ${negativehovered}`} style={{left: `${VideoPlayerStore.hoveredLeft}px`,transform: `scaleX(${VideoPlayerStore.hoveredTransform})`}}></div>)
    ];
    return (
      <Fa className={`${_prefix}-main-slider`}>
        <Paper
          className={cx(
            classes.timeTooltip,
            {[classes.timeTooltipWithThumb]: currentCue },
            {[classes.invisible]: !(this.showTip || this.mouseIsDown) }
          )}
          style={{
            left: `${(this.mouseIsDown) ? ((currentCue) ? midPercentThumb : midPercent) : limitBetween((this.percentage*100)-10,2, (currentCue) ? maxLeftThumb : maxLeft )}%`,
            top: `-${(currentCue) ? paddingGap + currentCue.h : paddingGap }px`,
          }} >
          {(currentCue) ?
            <Div style={{
              backgroundImage: `url(${currentCue.src})`,
              backgroundPosition: `-${currentCue.x}px -${currentCue.y}px`,
              height: `${currentCue.h}px`,
              width: `${currentCue.w}px`,
            }}></Div> : ""
          }
          {secondsToTimeCode(this.newTime)}
        </Paper>
        <Slider
          showTooltip
          doHover
          isPlaying={VideoPlayerStore.isPlaying}
          _prefix={_prefix}
          isReady={VideoPlayerStore.isReady}
          onMove={this.onMove}
          onDown={this.onDown}
          onUp={this.onUp}
          totalChild={totalChild}
          value={VideoPlayerStore.currentTransform}

          onMouseEnter={()=> {
            this.showTip = true
          }}
          onMouseLeave={()=> {
            this.showTip = false
          }}
        />
      </Fa>
    );
  }
  onMove = (percentage, totalStyles, pos, mouseIsDown, handle) => {
      this.percentage = percentage;
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
      const { VideoPlayerStore } = this.props;
      this.mouseIsDown = true;
      const holdclickTime = 100;
      if(VideoPlayerStore.isPlaying){
        this.wasPlayingTimeout = setTimeout(() => {
          VideoPlayerStore.togglePlay(false,true);
          this.wasPlaying = true;
        },holdclickTime);
      }
    }
  onUp = () => {
      let { VideoPlayerStore } = this.props;
      this.mouseIsDown = false;
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
