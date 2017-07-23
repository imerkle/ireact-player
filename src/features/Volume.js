import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import { observable } from 'mobx';

import Slider from '../Slider';
import {Fa, FaDiv} from 'material-son'

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
    const {VideoPlayerStore} = this.props;
    const {_prefix} = VideoPlayerStore;

    return (
      <FaDiv fa className={`${_prefix}-volume-container ${(this.hideSlider) ? "compress": ""}`} onMouseEnter={()=>{ this.showVolumeSlider() }} onMouseLeave={()=>{ this.hideVolumeSlider() }}>
        <Fa className={`${_prefix}-volume-button`}>
          {this.props.makeButton((VideoPlayerStore.vCurrent == 0 ) ? 'volume_off' : (VideoPlayerStore.vCurrent > 0.5) ? "volume_up" :'volume_down',() =>{this.handleVolumeToggle()} )}
        </Fa>
        <Fa fs className={`${_prefix}-volume-slider-container ${(this.hideSlider) ? "hideSlider": ""}`}>
          <Slider _prefix={_prefix} onMove={this.onMoveVolume} onDown={this.onMoveVolume} isReady={VideoPlayerStore.isReady} value={VideoPlayerStore.vCurrent} />
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
