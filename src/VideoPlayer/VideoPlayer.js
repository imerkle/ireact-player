import React from 'react';
import PropTypes from 'prop-types';
import { observer, Provider } from 'mobx-react';
import { observable } from 'mobx';

import Rnd from 'react-rnd';
import { IconButton, Icon, Snackbar, Paper } from 'material-ui';
import { MuiThemeProvider, createMuiTheme, createPalette, createStyleSheet, withStyles } from 'material-ui/styles';
import { Div, FaDiv, LinearIndeterminate } from 'material-son';
import { ContextMenuTrigger, ContextMenu, MenuItem } from 'react-contextmenu-material';
import copy from 'copy-to-clipboard';

import Controls from '../Controls';
import { Annotation, ErrorTv, ClosedCaptionLayer } from '../features'
import VideoPlayerStore from '../stores/VideoPlayerStore.js';
import BaseStoreUpdater from '../renderers/BaseStoreUpdater.js';
import getVendor from '../utils/getVendor.js';
import { stToggle } from '../utils/dom.js';


const secondaryColor = '#f8f8f8';

const theme = createMuiTheme({
  palette: createPalette({
    type: 'dark', // Switching the dark mode on is a single property value change.
  }),
  vplayer: {
    primaryColor: '#f12c35',
    primaryColorLight: '#fb3942',
    secondaryColor: secondaryColor,
    disabledPrimary: '#bdbdbd',
    disabledSecondary: '#5e5e5e',
  }
});

const themeLight = createMuiTheme({
  palette: createPalette({
    type: 'light',
  })
});
const hideBottom = {
  bottom: '-15%',
  transition: '.15s linear bottom',
};
const styleSheet = createStyleSheet('MsonVideoPlayer', theme => ({
  context_root: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    zIndex: 10,
    minWidth: '250px',
  },
  nerdUL: {
    listStyle: 'none',
    padding: '5px',
    color: secondaryColor,
    fontSize: '12px',
    padding: '21px',
    '& li': {
      padding: '2px',
      '& label': {
        fontWeight: 'bold',
        marginRight: '5px',
        '&:after': {
          content: ":"
        }
      }
    }
  },
  videoLayer: {
    height: '100%',
    width: '100%',
    '& video': {
      height: '100%',
      width: '100%',
    }
  },
  controlsLayer: {
    width: '100%',
    zIndex: '10',
    color: secondaryColor,
    fontSize: '13px',
    ...hideBottom
  },
  controlBg: {
    position: 'absolute',
  	bottom: '0',
  	height: '100px',
  	width: '100%',
  	backgroundImage: 'url(https://i.imgur.com/uMopswI.png)',
  	backgroundRepeat: 'repeat-x',
  	pointerEvents: 'none',
  	backgroundPosition: 'bottom',
    ...hideBottom
  },
  playpauseLayer: {
    top: '0',
    position: 'absolute',
    height: '100%',
    width: '100%',
    zIndex: '1',
  	display: 'flex',
  	justifyContent: 'center',
  	alignItems: 'center',
  },
  playpauseanimate: {
  	opacity: '0',
  	transformOrigin: 'bottom',
    transition: '1s linear all',
    pointerEvents: 'none',
    zIndex: '10',
  	background: 'hsla(0, 0%, 0%, .3)',
    borderRadius: '50%',
    color: secondaryColor,
    '&.beginanimate': {
      animation: 'playpauseFadeAnimate 1s ease-out',
    }
  },
  iconButton: {
    height: 24,
    padding: 0,
    color: secondaryColor,
  }
}));

const addParam = (url, param, value) => {
   var a = document.createElement('a'), regex = /(?:\?|&amp;|&)+([^=]+)(?:=([^&]*))*/g;
   var match, str = []; a.href = url; param = encodeURIComponent(param);
   while (match = regex.exec(a.search))
       if (param != match[1]) str.push(match[1]+(match[2]?"="+match[2]:""));
   str.push(param+(value?"="+ encodeURIComponent(value):""));
   a.search = str.join("&");
   return a.href;
}
const makeButton = (classes, icon, handleClick, tooltip="") => {
  return (
    <IconButton className={classes.iconButton} onClick={(e)=> {handleClick(e)}}>
        <Icon color={'inherit'}>{icon}</Icon>
    </IconButton>
  )
}
const labelList = (label, value) =>  {
  return (
    <li><label>{label}</label>{value}</li>
  );
}
const randomGenerate = (minimum = 1, maximum = 1000) => {
   return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
}

@withStyles(styleSheet)
@observer
class VideoPlayer extends React.Component{
  @observable snackBarOpen = false;
  @observable snackBarMessage = "";

  static defaultProps = {
    separator: "/",
    primaryColor: '#f12c35',
    bounds: "body",
    autoQuality: true,
    annotation_url: "",
    caption_url: "",
    extenstionLayers: [],
    stats: [],
  }
  static propTypes = {
    src: PropTypes.oneOfType([
      PropTypes.string.isRequired,
      PropTypes.array.isRequired
    ]),
    classes:  PropTypes.object.isRequired,
    stats:  PropTypes.array,
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

    this.contextMenuId = `${props.prefix}-${randomGenerate()}-${Math.round((new Date()).getTime() / 1000)}`;
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
    const { classes, stats }  = this.props;

    render_out = (
    <MuiThemeProvider theme={theme}>
     <Div>
      <Rnd default={{x: 0,y: 0,width: w, height: h}} className={`${_prefix}-rnd ${_prefix}-screen-${VideoPlayerStore.screenType}`} disableDragging={!rndBool} enableResizing={enableResizing} bounds={this.props.bounds} dragHandlerClassName={`.${_prefix}-dragger`} minWidth={minWidth} minHeight={minHeight}>
      <ContextMenuTrigger id={this.contextMenuId} style={{height: '100%',width: '100%'}}>
        <FaDiv className={`${_prefix}-dragger`}>
          {makeButton(classes ,'close',(e)=>{this.handleScreenType(e)})}
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
                <Div className={`${classes.videoLayer}`}>
                    {component}
                </Div>
                <Div className={`${_prefix}-errortv-layer`}>
                  <ErrorTv _prefix={VideoPlayerStore._prefix} isError={VideoPlayerStore.isError} />
                </Div>
                {
                  (VideoPlayerStore.showNerdStats) ?
                <Div className={`${_prefix}-nerds-layer`}>
                    <Paper>
                      <ul className={classes.nerdUL}>
                        {
                          stats.map((o)=> labelList(o.label,o.value) )
                        }
                        {labelList("Volume",`${Math.round(VideoPlayerStore.vCurrent*100)}%`)}
                        {labelList("Buffer Health",`${(VideoPlayerStore.tLoaded - VideoPlayerStore.tCurrent).toFixed(1)}s`)}
                        {labelList("Network Activity",`${(VideoPlayerStore.tLoaded == VideoPlayerStore.tTotal) ? 0 : VideoPlayerStore.kbps.toFixed(2)} KB`)}
                        {labelList("Dropped Frames",`${VideoPlayerStore.droppedFrames}/${VideoPlayerStore.decodedFrames}`)}
                      </ul>
                    </Paper>
                </Div>
                  : ""
                }
                <Div className={`${_prefix}-playpause-layer ${classes.playpauseLayer}`}>
                  <Icon className={`playpauseanimate ${classes.playpauseanimate} ${beginanimate}`} style={{color: 'contrast'}}>{playpause}</Icon>
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
                <Div className={`${_prefix}-control-bg ${classes.controlBg}`}></Div>

                <Div className={`${_prefix}-controls-layer ${classes.controlsLayer} ${_prefix}-unhinder`}>
                  <Controls primaryColor={this.props.primaryColor} handlePlayPause={this.handlePlayPause} separator={this.props.separator}/>
                </Div>
                <Div className={`${_prefix}-buffer-layer`}>
                  {(VideoPlayerStore.isBuffering || !VideoPlayerStore.isReady) ? <LinearIndeterminate /> : "" }
                </Div>
                {this.extenstionLayersPrint(_prefix)}

            </Div>
          </Provider>
        </Div>
      </ContextMenuTrigger>
      </Rnd>
      <ContextMenu id={this.contextMenuId} classes={{root: classes.context_root}}>
          <MenuItem
            onClick={()=>{
              const url = window.location.href;
              copy(url);
              this.openSnackBar("Video URL copied");
          }} >Copy video URL</MenuItem>
          <MenuItem
            onClick={()=>{
              const url = window.location.href;
              copy(addParam(url,"t",VideoPlayerStore.tCurrent.toFixed(2)));
              this.openSnackBar(`Video URL copied at ${VideoPlayerStore.tCurrent.toFixed(2)}s`);
          }} >Copy video URL at current time</MenuItem>
          <MenuItem
            onClick={()=>{
              VideoPlayerStore.setValue({
                doLoop: !VideoPlayerStore.doLoop
              });
            }}
            checked={VideoPlayerStore.doLoop}
            rightIcon={(VideoPlayerStore.doLoop) ? <Icon>checked</Icon> : "" }
            preventClose>
            Loop
          </MenuItem>
          <MenuItem
            onClick={()=>{
              VideoPlayerStore.showNerdStats = !VideoPlayerStore.showNerdStats;
            }}
            checked={VideoPlayerStore.showNerdStats}
            rightIcon={(VideoPlayerStore.showNerdStats) ? <Icon>checked</Icon> : "" }
            preventClose>
            Developer Stats
          </MenuItem>

      </ContextMenu>
      <MuiThemeProvider theme={themeLight}>
        <Snackbar
          anchorOrigin={{
           vertical: 'bottom',
           horizontal: 'left',
          }}
          message={this.snackBarMessage}
          onRequestClose={()=>{
            this.snackBarOpen = false;
          }}
          open={this.snackBarOpen}
        />
      </MuiThemeProvider>
    </Div>
    </MuiThemeProvider>
    );
    return(render_out);
  }
  openSnackBar = (msg) => {
    this.snackBarOpen = true;
    this.snackBarMessage = msg;
  }
  extenstionLayersPrint = (_prefix) => {
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
