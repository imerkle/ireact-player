import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import { IconButton, Icon } from 'material-ui';
import { Fa, FaDiv } from 'material-son'
import { SHEET_NAME } from '../constants.js';

import {
  Rails,
  PlayPause,
  Volume,
  TimeCode,
  ClosedCaption,
  Settings,
  WideScreen,
  FullScreen,
} from '../features'

const makeButton = (icon,handleClick,tooltip="") => {
  return (
    <IconButton style={{height:36,padding:0}} onClick={(e)=> {handleClick(e)}}>
      <Icon>{icon}</Icon>
    </IconButton>)
}

const styleSheet = createStyleSheet(SHEET_NAME.CONTROLS,theme => ({
    controlButton : {
       alignItems: "center",
  	   zIndex: 1,
       padding: "0px 10px",
    },
    rightControl: {
      display: "flex",
    	justifyContent: "flex-end",
      marginRight: "10px",
    }
}));

@withStyles(styleSheet)
@inject('VideoPlayerStore') @observer
class Controls extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    let {VideoPlayerStore} = this.props;
    let _prefix = VideoPlayerStore._prefix;


    return(
      <FaDiv c className={`${_prefix}-controls`} ref={(ref)=>{this.controls = ref}}>

        <Rails />
        {/*Here put the button icons*/}
        <FaDiv fa className={`${this.props.classes.controlButton}`}>

          <PlayPause makeButton={makeButton} handlePlayPause={this.props.handlePlayPause}/>
          <Volume makeButton={makeButton} />
          <TimeCode current={VideoPlayerStore.tCurrent} total={VideoPlayerStore.tTotal} separator={this.props.separator} />

          <Fa fs className={`${this.props.classes.rightControl}`}>
            {
              (VideoPlayerStore.canBeCaption) ?
              <ClosedCaption makeButton={makeButton} _prefix={VideoPlayerStore._prefix} isCaptionOn={VideoPlayerStore.isCaptionOn} onCaptionClick={()=>{VideoPlayerStore.isCaptionOn = !VideoPlayerStore.isCaptionOn}}/>
              : ""
            }
            <Settings primaryColor={this.props.primaryColor} />
            <WideScreen makeButton={makeButton} />
            <FullScreen makeButton={makeButton} />
          </Fa>

        </FaDiv>

      </FaDiv>
    );
  }
}
export default Controls;
