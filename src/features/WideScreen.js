import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import { stToggle } from '../utils/dom.js';
import { Fa } from 'material-son';

@inject('VideoPlayerStore') @observer
class WideScreen extends React.Component{
  static propTypes = {
    makeButton: PropTypes.func.isRequired
  }
  constructor(props){
    super(props);
  }
  render(){
    const {VideoPlayerStore} = this.props;
    const [stc,stt] = (VideoPlayerStore.screenType == 0) ? ['panorama_wide_angle','Widescreen'] : ((VideoPlayerStore.screenType == 1)  ?  ['all_out','Dock Out'] : ['crop_square','Normal']);
    return (
      <Fa>
        {this.props.makeButton(stc,(e) =>{this.handleScreenType(e)},stt)}
      </Fa>
    );
  }
  handleScreenType = (e) => {
    const {VideoPlayerStore} = this.props;
    stToggle(e,VideoPlayerStore);
  }
}
export default WideScreen;
