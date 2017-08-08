import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import { observable } from 'mobx';

import { createStyleSheet, withStyles } from 'material-ui/styles';
import {Fa, FaDiv} from 'material-son'
import cx from 'classnames';;

import Slider from '../Slider';

const styleSheet = createStyleSheet('MsonVolume',theme => ({
  root: {
    width: theme.vplayer.widthVolume,
    alignItems: 'center',
    marginRight: '20px',
  	transition: '0.15s linear width',
  },
  compress: {
    width: theme.vplayer.compressedWidthVolume,
  },
  slider_root: {
    transition: `${theme.vplayer.volumeTransitionTime} linear flex`,
  },
  hideSlider: {
    flex: 'none',
  	overflow: 'hidden',
  },
}));


@withStyles(styleSheet)
@inject('VideoPlayerStore') @observer
class Volume extends React.Component{
  @observable hideSlider = true;
  static propTypes={
    makeButton: PropTypes.func.isRequired
  }
  constructor(props){
    super(props);
  }
  render(){
    const { VideoPlayerStore, classes } = this.props;

    return (
      <FaDiv fa className={cx(
        classes.root,
        {[classes.compress]: this.hideSlider}
      )}
      onMouseEnter={()=>{ this.showVolumeSlider() }}
      onMouseLeave={()=>{ this.hideVolumeSlider() }} >
        <Fa>
          {this.props.makeButton((VideoPlayerStore.vCurrent == 0 ) ? 'volume_off' : (VideoPlayerStore.vCurrent > 0.5) ? "volume_up" :'volume_down',() =>{this.handleVolumeToggle()} )}
        </Fa>
        <Fa fs className={cx(
          classes.slider_root,
          {[classes.hideSlider] : this.hideSlider},
        )}>
          <Slider onMove={this.onMoveVolume} onDown={this.onMoveVolume} isReady={VideoPlayerStore.isReady} value={VideoPlayerStore.vCurrent} middleMouse />
        </Fa>
      </FaDiv>
    );
  }
  showVolumeSlider = () => {
    this.hideSlider = false;
    if(this.hideInTimer) clearTimeout(this.hideInTimer);
  }
  hideVolumeSlider = () => {
    const hideInTime = 2000;

    this.hideInTimer = setTimeout(()=>{
      this.hideSlider = true;
    },hideInTime);
  }
  handleVolumeToggle = () => {
    const {VideoPlayerStore} = this.props;
    if(!this.isMuted){
      this.lastVolume = VideoPlayerStore.vCurrent;
      VideoPlayerStore.setVolume(0);
      this.isMuted = true;
    }else{
      this.isMuted = false;
      if(this.lastVolume < .1){
        this.lastVolume = 1;
      }
      VideoPlayerStore.setVolume(this.lastVolume);
    }
  }
  onMoveVolume = (percentage) => {
    const {VideoPlayerStore} = this.props;
    VideoPlayerStore.setVolume(percentage);
  }
}
export default Volume;
