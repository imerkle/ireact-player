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
import cx from 'classnames';

const secondaryColor = '#f8f8f8';
const black = 'rgba(0, 0, 0, 0.8)';

const primaryPalette = {
    50: '#fde6e7',
    100: '#fbc0c2',
    200: '#f8969a',
    300: '#f56b72',
    400: '#f34c53',
    500: '#f12c35',
    600: '#ef2730',
    700: '#ed2128',
    800: '#eb1b22',
    900: '#e71016',
    A100: '#ffffff',
    A200: '#ffe0e1',
    A400: '#ffadaf',
    A700: '#ff9496',
    'contrastDefaultColor': 'light',
};
const theme = createMuiTheme({
  palette: createPalette({
    type: 'dark', // Switching the dark mode on is a single property value change.
    primary: primaryPalette
  }),
  vplayer: {
    primaryColor: '#f12c35',
    primaryColorLight: '#fb3942',
    secondaryColor: secondaryColor,
    disabledPrimary: '#bdbdbd',
    disabledSecondary: '#5e5e5e',
    black: black,

    themePrimary: '#FFF',
    searchBarWidthClosed: '150px',
    searchBarWidthOpened: '250px',

    loadedColor: 'rgba(255, 255, 255, .3)',
    hoveredColor: 'rgba(255,255,255,.5)',
    negativehoveredColor: 'rgba(0,0,0,.2)',
    totalColor: 'rgba(255, 255, 255, 0.3)',

    primaryColorVolume: '#f8f8f8',
    primaryColorLightVolume: '#ffffff',

    totalheight: '5px',
    totalheightCompressed: '3px',
    handleDimension: '5px',
    handleTop: '-4px',

    totalheightVolume: '3px',
    handleBorder: '4px',
    handleBorderVolume: '3px',

    widthVolume: '80px',
    compressedWidthVolume: '30px',
    volumeTransitionTime: '.05s',
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
  player: {
    background: '#141414',
  },
  fullHW: {
    width: '100%',
  	height: '100%',
  },
  layers: {
    '& > div': {
      position: 'absolute',
    }
  },
  layer_root: {
    position: 'relative',
    overflow: 'hidden',
  },
  context_root: {
    backgroundColor: black,
    zIndex: 10,
    minWidth: '250px',
  },
  nerdPaper: {
    backgroundColor: black,
    margin: '15px',
  },
  nerdUL: {
    listStyle: 'none',
    padding: '5px',
    color: secondaryColor,
    fontSize: '12px',
    padding: '10px 20px',
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
  },
  buffer: {
    pointerEvents: 'none',
  },
  midIcon: {
    fontSize: '80px',
    opacity: '.7',
    transition: '.15s linear opacity',
    color: secondaryColor,
  },
  midIconContainer: {
    cursor: 'pointer',
    '&:hover $midIcon':{
      opacity: '1',
    }
  },
  dragger: {
    background: black,
  	flexDirection: 'row-reverse',
    padding: '6px 0px',
  	cursor: 'pointer',
    visibility: 'hidden',
  },
  screen_0: {},
  screen_1:{
    width: '100%',
  	position: 'relative',
  },
  screen_2: {},
  rndfix: {
    transform: 'none!important',
    position: 'inherit!important',
  },
  rnd: {
    cursor : 'default!important',
    '&$screen_2':{
      '& > div':{
        display: 'flex',
        flexDirection: 'row',
      },
      '& $dragger': {
        visibility: 'visible',
      },
    },
    '&$screen_1': {
      extend: 'rndfix',
      width: '100%!important',
      '& > div':{
        width: '100%!important',
      },
    },
    '&$screen_1': {
      extend: 'rndfix',
    },
  },
  isFullScreen: {
    height: '100%!important',
  	width: '100%!important',
  },
  showControls: {
    '& $controlsLayer':{
      bottom: '0',
    }
  },
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
  @observable initialized = false;
  @observable autoplay = false;

  static defaultProps = {
    separator: "/",
    bounds: "body",
    isAutoQuality: true,
    annotation_url: "",
    caption_url: "",
    extenstionLayers: [],
    stats: [],
    minWidth: 460,
    minHeight: 350,
    autoplay: false,
    poster: "",
    holdToDisplay: -1,
  }
  static propTypes = {
    src: PropTypes.oneOfType([
      PropTypes.string.isRequired,
      PropTypes.array.isRequired
    ]),
    classes:  PropTypes.object.isRequired,
    stats:  PropTypes.array,
    holdToDisplay: PropTypes.number,
    separator:  PropTypes.string,
    bounds: PropTypes.string,
    minWidth: PropTypes.number,
    minHeight: PropTypes.number,
    isAutoQuality: PropTypes.bool,
    caption_url: PropTypes.string,
    annotation_url: PropTypes.string,
    extenstionLayers: PropTypes.array,
    autoplay: PropTypes.bool,
    poster: PropTypes.string,
  }

  constructor(props){
    super(props);


    const { autoplay, poster }  = props;
    if(!(!autoplay && poster && !this.initialized)){
      this.VideoPlayerStore = {};
      this.autoplay = props.autoplay;
      this.initializeStore(props);
    }
  }
  componentWillReceiveProps(nextProps){
     //this.initializeStore(nextProps);
     //this.VideoPlayerStore.togglePlay(false,true);
  }
  initializeStore(props){
    let { src, isAutoQuality, annotation_url, caption_url, prefix } = props;
    this.VideoPlayerStore = new VideoPlayerStore({
      url: src,
      isAutoQuality: isAutoQuality,
      annotation_url: annotation_url,
      caption_url: caption_url,
      autoplay: this.autoplay
    });
    this.onContruct({prefix});
  }
  onContruct({prefix}){
    let updater = new BaseStoreUpdater({store: this.VideoPlayerStore});
    this.vendorProps = {
      updater: updater,
    };
    this.contextMenuId = `${prefix}-${randomGenerate()}-${Math.round((new Date()).getTime() / 1000)}`;
  }
  render(){
    const { classes, stats, autoplay, poster, thumbnail_url, holdToDisplay }  = this.props;
    if(!autoplay && poster && !this.initialized){
      return (
        <Div className={cx(classes.fullHW)}
          style={{
            background: `url(${poster})`,
            ...sty
          }}
          onClick={()=>{
            this.initialized = true;
            this.autoplay = true;
            this.initializeStore(this.props);
          }}
          >
          <FaDiv vcenter hcenter className={cx(classes.fullHW,classes.midIconContainer)}>
            <IconButton><Icon className={classes.midIcon}>play_arrow</Icon></IconButton>
          </FaDiv>
        </Div>
      );
    }
    const VideoPlayerStore = this.VideoPlayerStore;
    const src = VideoPlayerStore.currentURL;

    const { vendor, component } = getVendor({src: src,props: this.vendorProps});
    const minWidth = this.props.minWidth;
    const minHeight = this.props.minHeight;

    const _prefix = VideoPlayerStore._prefix;
    const playpause = (VideoPlayerStore.isPlaying && VideoPlayerStore.tCurrent > 0 ) ? 'play_arrow' : 'pause';

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
     <Div className={cx(classes.fullHW)}>
      <Rnd
        default={{x: 0,y: 0,width: w, height: h}}
        className={
          cx(classes.rnd,
            {[classes.screen_0]: VideoPlayerStore.screenType === 0 },
            {[classes.screen_1]: VideoPlayerStore.screenType === 1 },
            {[classes.screen_2]: VideoPlayerStore.screenType === 2 },
          )
        }
        disableDragging={!rndBool}
        enableResizing={enableResizing}
        bounds={this.props.bounds}
        dragHandlerClassName={cx(classes.dragger)}
        minWidth={minWidth}
        minHeight={minHeight}
      >
      <ContextMenuTrigger id={this.contextMenuId} style={{height: '100%',width: '100%'}}
        holdToDisplay={holdToDisplay}
        >
        <FaDiv className={cx(classes.dragger)}>
          {makeButton(classes ,'close',(e)=>{this.handleScreenType(e)})}
        </FaDiv>
        <Div
          className={
            cx(`${_prefix}-player`,
              classes.player,
              classes.layer_root,
              classes.fullHW,
              {[classes.isFullScreen]: VideoPlayerStore.isFullScreen},
              { [classes.showControls]: (!VideoPlayerStore.isPlaying || VideoPlayerStore.isSettingsOpen || VideoPlayerStore.isOverPlayer)},
              //{ "hideControls": !(!VideoPlayerStore.isPlaying || VideoPlayerStore.isSettingsOpen || VideoPlayerStore.isOverPlayer)},
            )
          }
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
            <Div className={cx(
              classes.layers,
              classes.layer_root,
              classes.fullHW
            )}>
                <Div className={cx(
                  classes.videoLayer,
                  classes.fullHW
                )}>
                    {component}
                </Div>
                <Div className={cx(classes.fullHW)}>
                  <ErrorTv _prefix={VideoPlayerStore._prefix} isError={VideoPlayerStore.isError} />
                </Div>
                {
                  (VideoPlayerStore.showNerdStats) ?
                <Div>
                    <Paper className={classes.nerdPaper}>
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
                <Div className={cx(
                  classes.playpauseLayer,
                  classes.fullHW,
                )}>
                  <Icon className={cx(classes.playpauseanimate,
                    {"beginanimate": VideoPlayerStore.beginanimate}
                  )}>{playpause}</Icon>
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
                <Div className={cx(classes.controlBg)}></Div>

                <Div className={cx(classes.controlsLayer,`${_prefix}-unhinder`)}>
                  <Controls
                    handlePlayPause={this.handlePlayPause}
                    separator={this.props.separator}
                    thumbnail_url={thumbnail_url} />
                </Div>
                <Div className={cx(
                  classes.fullHW,
                  classes.buffer
                )}>
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
