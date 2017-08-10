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
import cx from 'classnames';

import Controls from '../Controls';
import { Annotation, ErrorTv, ClosedCaptionLayer } from '../features'
import VideoPlayerStore from '../stores/VideoPlayerStore.js';
import BaseStoreUpdater from '../renderers/BaseStoreUpdater.js';
import getVendor from '../utils/getVendor.js';
import { stToggle } from '../utils/dom.js';
import { primaryPalette, vplayer, styleProps } from './playerSheet.js';


const themeLight = createMuiTheme({
  palette: createPalette({
    type: 'light',
  })
});

const theme = createMuiTheme({
  palette: createPalette({
    type: 'dark', // Switching the dark mode on is a single property value change.
    primary: primaryPalette
  }),
  vplayer: {
    ...vplayer
  }
});
const styleSheet = createStyleSheet('MsonVideoPlayer', theme => ({
...styleProps
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
    this.playerFullscreenId = null;
  }
  componentWillReceiveProps(nextProps){

    const VideoPlayerStore = this.VideoPlayerStore;
    const { isAutoQuality, annotation_url, caption_url, autoplay } = nextProps;

    VideoPlayerStore.isAutoQuality = isAutoQuality;
    VideoPlayerStore.autoplay = autoplay;
    if(!annotation_url) VideoPlayerStore.canBeAnnotation = false;
    if(!caption_url) VideoPlayerStore.canBeCaption = false;

  }
  initializeStore(props){
    let { src, isAutoQuality, annotation_url, caption_url } = props;
    this.VideoPlayerStore = new VideoPlayerStore({
      url: src,
      isAutoQuality: isAutoQuality,
      annotation_url: annotation_url,
      caption_url: caption_url,
      autoplay: this.autoplay
    });
    this.onContruct();
  }
  onContruct(){
    this.playerFullscreenId = `fullscreen-${randomGenerate()}-${Math.round((new Date()).getTime() / 1000)}`;
    let updater = new BaseStoreUpdater({store: this.VideoPlayerStore,playerClass: this.playerFullscreenId});
    this.vendorProps = {
      updater: updater,
    };
    this.contextMenuId = `${randomGenerate()}-${Math.round((new Date()).getTime() / 1000)}`;
  }
  render(){
    const { classes, stats, autoplay, poster, thumbnail_url, markers, holdToDisplay }  = this.props;
    const {width: w,height: h, ...sty} = this.props.style;

    if(!autoplay && poster && !this.initialized){
      return (
        <Div
          style={{
            background: `url(${poster})`,
            ...this.props.style
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

    const {currentURL: src, bigPreview } = VideoPlayerStore;

    const { vendor, component } = getVendor({src: src,props: this.vendorProps});
    const minWidth = this.props.minWidth;
    const minHeight = this.props.minHeight;

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

    render_out = (
    <MuiThemeProvider theme={this.props.theme || theme}>
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
        dragHandlerClassName={`.${classes.dragger}`}
        minWidth={minWidth}
        minHeight={minHeight}
      >
      <ContextMenuTrigger id={this.contextMenuId} style={{height: '100%',width: '100%'}}
        holdToDisplay={holdToDisplay}
        >
        <FaDiv className={cx(classes.dragger,classes.unhinder)}>
          {makeButton(classes ,'close',(e)=>{this.handleScreenType(e)})}
        </FaDiv>
        <Div
          className={
            cx(
              this.playerFullscreenId,
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
              if(e.target.closest(`.${classes.unhinder}`)){
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
                  <ErrorTv isError={VideoPlayerStore.isError} />
                </Div>
                {(bigPreview) ? <FaDiv hcenter vcenter className={cx(classes.fullHW)}>
                  <Div
                    className={cx(classes.bigPreview)}
                    style={{
                     backgroundImage: `url(${bigPreview.src})`,
                     backgroundPosition: `-${bigPreview.x}px -${bigPreview.y}px`,
                     height: `${bigPreview.h}px`,
                     width: `${bigPreview.w}px`,
                    }} >
                  </Div>
                </FaDiv> : ""}
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
                    classes={{
                      unhinder: classes.unhinder,
                    }}
                    url={this.props.annotation_url}
                    isAnnotation={VideoPlayerStore.isAnnotation}

                    duration={VideoPlayerStore.tTotal}
                    currentTime={VideoPlayerStore.tCurrent}
                   /> : ""
                }
                {
                  (this.props.caption_url) ?
                  <ClosedCaptionLayer
                    classes={{
                      unhinder: classes.unhinder,
                    }}
                    url={this.props.caption_url}
                    isCaptionOn={VideoPlayerStore.isCaptionOn}

                    duration={VideoPlayerStore.tTotal}
                    currentTime={VideoPlayerStore.tCurrent}
                   /> : ""
                }
                {/*Here put the control background*/}
                <Div className={cx(classes.controlBg)}></Div>

                <Div className={cx(classes.controlsLayer,classes.unhinder)}>
                  <Controls
                    handlePlayPause={this.handlePlayPause}
                    separator={this.props.separator}
                    thumbnail_url={thumbnail_url}
                    markers={markers}
                  />
                </Div>
                <Div className={cx(
                  classes.fullHW,
                  classes.buffer
                )}>
                  {(VideoPlayerStore.isBuffering || !VideoPlayerStore.isReady) ? <LinearIndeterminate /> : "" }
                </Div>
                {this.extenstionLayersPrint()}

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
  extenstionLayersPrint = () => {
    const out =
       this.props.extenstionLayers.map((n,i)=>

        (
          <Div className={cx(n.layerClassName)} key={i}>
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
