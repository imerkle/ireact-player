import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import { Fa } from 'material-son';

@inject('VideoPlayerStore') @observer
class PlayPause extends React.Component{
  static propTypes = {
    handlePlayPause: PropTypes.func.isRequired,
    makeButton: PropTypes.func.isRequired,
  }
  constructor(props){
    super(props);
  }
  render(){
    const {VideoPlayerStore} = this.props;
    return (
      <Fa>
        {this.props.makeButton((VideoPlayerStore.isPlaying && VideoPlayerStore.tCurrent > 0 ) ? 'pause' : (VideoPlayerStore.isEnded) ? "replay" :'play_arrow',() =>{this.props.handlePlayPause()} )}
      </Fa>
    );
  }
}
export default PlayPause;
