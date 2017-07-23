import React from 'react';
import PropTypes from 'prop-types';
import {observer,Provider} from 'mobx-react';

import Rnd from 'react-rnd';
import { IconButton, Icon } from 'material-ui';
import { MuiThemeProvider, createMuiTheme, createPalette } from 'material-ui/styles';
import { Div, FaDiv, LinearIndeterminate } from 'material-son';

import Controls from '../Controls';
import { Annotation, ErrorTv, ClosedCaptionLayer } from '../features'
import VideoPlayerStore from '../stores/VideoPlayerStore.js';
import BaseStoreUpdater from '../renderers/BaseStoreUpdater.js';
import getVendor from '../utils/getVendor.js';
import { stToggle } from '../utils/dom.js';


const theme = createMuiTheme({
  palette: createPalette({
    type: 'dark', // Switching the dark mode on is a single property value change.
  }),
  vplayer: {
    primaryColor: '#f12c35',
    primaryColorLight: '#fb3942',
  }
});

const makeButton = (icon,handleClick,tooltip="") => {
  return (
    <IconButton style={{height:24,padding:0,color: '#FFF'}} onClick={(e)=> {handleClick(e)}}>
        <Icon color={'inherit'}>{icon}</Icon>
    </IconButton>
  )
}
@observer
class VideoPlayer extends React.Component{
  static defaultProps = {
    separator: "/",
    primaryColor: '#f12c35',
    bounds: "body",
    autoQuality: true,
    annotation_url: "",
    caption_url: "",
    extenstionLayers: [],
  }
  static propTypes = {
    src: PropTypes.oneOfType([
      PropTypes.string.isRequired,
      PropTypes.array.isRequired
    ]),
    separator:  PropTypes.string,
    primaryColor:  PropTypes.string,
    bounds: PropTypes.string,
    autoQuality: PropTypes.bool,
    caption_url: PropTypes.string,
    annotation_url: PropTypes.string,
    extenstionLayers: PropTypes.array,
  }

  constructor(props){
    super(props);
    let {src} = this.props;

    this.VideoPlayerStore = new VideoPlayerStore({url: src,autoQuality: this.props.autoQuality,annotation_url: this.props.annotation_url,caption_url: this.props.caption_url});

    let updater = new BaseStoreUpdater({store: this.VideoPlayerStore});

    this.vendorProps = {
      updater: updater
    };
  }
  render(){
    const VideoPlayerStore = this.VideoPlayerStore;
    const src = VideoPlayerStore.currentURL;

    const { vendor, component } = getVendor({src: src,props: this.vendorProps});
    const minWidth = 460;
    const minHeight = 350;

    const _prefix = VideoPlayerStore._prefix;
    const playpause = (VideoPlayerStore.isPlaying && VideoPlayerStore.tCurrent > 0 ) ? 'play_arrow' : 'pause';
    const beginanimate = (VideoPlayerStore.beginanimate) ? "beginanimate" : "";
    const fscl = (VideoPlayerStore.isFullScreen) ?  "isFullScreen" : "";

    let render_out;
    const rndBool = (VideoPlayerStore.screenType == 2);
    const enableResizing = {
      bottom: rndBool,
      bottomLeft: rndBool,
      bottomRight: rndBool,
      left: rndBool,
      right: rndBool,
      top: rndBool,
      topLeft: rndBool,
      topRight: rndBool
    };

    const {width: w,height: h, ...sty} = this.props.style;

    render_out = (
    <MuiThemeProvider theme={theme}>
      <Rnd default={{x: 0,y: 0,width: w, height: h}} className={`${_prefix}-rnd ${_prefix}-screen-${VideoPlayerStore.screenType}`} disableDragging={!rndBool} enableResizing={enableResizing} bounds={this.props.bounds} dragHandlerClassName={`.${_prefix}-dragger`} minWidth={minWidth} minHeight={minHeight}>
        <FaDiv className={`${_prefix}-dragger`}>
          {makeButton('close',(e)=>{this.handleScreenType(e)})}
        </FaDiv>
        <Div
          className={`${_prefix}-player ${fscl} ${(!VideoPlayerStore.isPlaying || VideoPlayerStore.isSettingsOpen || VideoPlayerStore.isOverPlayer) ? "showControls" : "hideControls"} `}
          style={{...sty}}
          onMouseEnter={()=>{this.onOver(true)}}
          onMouseLeave={()=>{this.onOver(false)}}
          onClick={(e) => {
              if(e.target.closest(`.${_prefix}-unhinder`)){
                return false;
              }
              this.handlePlayPause()
          }}
          >
          <Provider VideoPlayerStore={VideoPlayerStore}>
            <Div className={`${_prefix}-layers`}>
                <Div className={`${_prefix}-video-layer`}>
                    {component}
                </Div>
                <Div className={`${_prefix}-errortv-layer`}>
                  <ErrorTv _prefix={VideoPlayerStore._prefix} isError={VideoPlayerStore.isError} />
                </Div>
                <Div className={`${_prefix}-playpause-layer`}>
                  <Icon className={`playpauseanimate ${beginanimate}`} style={{color: 'contrast'}}>{playpause}</Icon>
                </Div>
                {
                  (this.props.annotation_url) ?
                  <Annotation
                    url={this.props.annotation_url}
                    isAnnotation={VideoPlayerStore.isAnnotation}

                    duration={VideoPlayerStore.tTotal}
                    currentTime={VideoPlayerStore.tCurrent}
                    _prefix={VideoPlayerStore._prefix}
                   /> : ""
                }
                {
                  (this.props.caption_url) ?
                  <ClosedCaptionLayer
                    url={this.props.caption_url}
                    isCaptionOn={VideoPlayerStore.isCaptionOn}

                    duration={VideoPlayerStore.tTotal}
                    currentTime={VideoPlayerStore.tCurrent}
                    _prefix={VideoPlayerStore._prefix}
                   /> : ""
                }
                {/*Here put the control background*/}
                <Div className={`${_prefix}-control-bg`}></Div>

                <Div className={`${_prefix}-controls-layer ${_prefix}-unhinder`}>
                  <Controls primaryColor={this.props.primaryColor} handlePlayPause={this.handlePlayPause} separator={this.props.separator}/>
                </Div>
                <Div className={`${_prefix}-buffer-layer`}>
                  {(VideoPlayerStore.isBuffering || !VideoPlayerStore.isReady) ? <LinearIndeterminate /> : "" }
                </Div>
                {this.extenstionLayersPrint(_prefix)}

            </Div>
          </Provider>
        </Div>
      </Rnd>
    </MuiThemeProvider>
    );
    return(render_out);
  }
  extenstionLayersPrint(_prefix){
    const out =
       this.props.extenstionLayers.map((n,i)=>

        (
          <Div className={`${_prefix}-${n.label}-layer`} key={i}>
            {
              <Provider store={n.store}>
                {n.component}
              </Provider>
            }
          </Div>
        ) );
      return out || null;
  }
  onOver = (bool,onOverTimeoutSeconds = 3000) => {
    if(bool === false){
      this.onOverTimeout = setTimeout(()=>{
        this.VideoPlayerStore.isOverPlayer = bool;
      },onOverTimeoutSeconds);
    }else{
      this.VideoPlayerStore.isOverPlayer = bool;
      if(this.onOverTimeout){
        clearTimeout(this.onOverTimeout);
      }
    }
  }
  handlePlayPause = () => {
    const VideoPlayerStore = this.VideoPlayerStore || this.props.VideoPlayerStore;
    if(!VideoPlayerStore.isReady) return false;
    VideoPlayerStore.togglePlay();
    VideoPlayerStore.beginanimate = true;
    setTimeout(()=>{
      VideoPlayerStore.beginanimate = false;
    },500);
  }
  handleScreenType = (e) => {
    stToggle(e,this.VideoPlayerStore);
  }
}
export default VideoPlayer;
