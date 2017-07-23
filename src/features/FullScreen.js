import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import { stToggle } from '../utils/dom.js';
import { Fa } from 'material-son';

@inject('VideoPlayerStore') @observer
class FullScreen extends React.Component{
  static propTypes = {
    makeButton: PropTypes.func.isRequired
  }
  constructor(props){
    super(props);
  }
  render(){
    const {VideoPlayerStore} = this.props;
    const [fsc,fst] = (VideoPlayerStore.isFullScreen) ? ['fullscreen_exit','Exit Fullscreen'] : ['fullscreen','Fullscreen'];
    return (
      <Fa>
        {this.props.makeButton(fsc,() =>{this.handleFullScreenToggle()},fst)}
      </Fa>
    );
  }
  handleFullScreenToggle = () => {
    const {VideoPlayerStore} = this.props;
    VideoPlayerStore.toggleFullscreen();
  }
}
export default FullScreen;
