import React from 'react'
import PropTypes from 'prop-types';
import loadScript from 'load-script';
import {inject,observer} from 'mobx-react';

const MATCH_START_QUERY = /[?&#](?:start|t)=([0-9hms]+)/
const MATCH_START_STAMP = /(\d+)(h|m|s)/g
const MATCH_NUMERIC = /^\d+$/

// Parse YouTube URL for a start time param, ie ?t=1h14m30s
// and return the start time in seconds
const parseStartTime =  (url) => {
  const match = url.match(MATCH_START_QUERY)
  if (match) {
    const stamp = match[1]
    if (stamp.match(MATCH_START_STAMP)) {
      return parseStartStamp(stamp)
    }
    if (MATCH_NUMERIC.test(stamp)) {
      return parseInt(stamp, 10)
    }
  }
  return 0
}

const parseStartStamp = (stamp) => {
  let seconds = 0
  let array = MATCH_START_STAMP.exec(stamp)
  while (array !== null) {
    const [, count, period] = array
    if (period === 'h') seconds += parseInt(count, 10) * 60 * 60
    if (period === 'm') seconds += parseInt(count, 10) * 60
    if (period === 's') seconds += parseInt(count, 10)
    array = MATCH_START_STAMP.exec(stamp)
  }
  return seconds
}
const YTstrObj = {
  "highres":  4320,
  "hd2160":  2160,
  "hd1440":  1440,
  "hd1080":  1080,
  "hd720":  720,
  "large":  480,
  "medium":  360,
  "small":  240,
  "tiny":  144
};
const yTQualityStrToInt = (str) => {
  return YTstrObj[str] || "auto";
}
const getKey = (obj,val) => Object.keys(obj).find(key => obj[key] === val);
const yTQualityValuetoString = (val) => {
  const index = getKey(YTstrObj,val);
  return index || "default";
}
const SDK_URL = 'https://www.youtube.com/iframe_api'
const SDK_GLOBAL = 'YT'
const SDK_GLOBAL_READY = 'onYouTubeIframeAPIReady'
const MATCH_URL = /^(?:https?:\/\/)?(?:www\.|m\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/
const BLANK_VIDEO_URL = 'https://www.youtube.com/watch?v=MqRhQe6oaJA'
const DEFAULT_PLAYER_VARS = {
  playsinline: 1,
  showinfo: 0,
  rel: 0,
  iv_load_policy: 3,
  disablekb: 1,
  enablejsapi: 1,
  controls: 0,
  playsinline: 0,
  cc_load_policy: 0,
}


@inject('VideoPlayerStore') @observer
class YouTube extends React.Component{
  static displayName = 'YouTube'
  static canPlay (url) {
    return MATCH_URL.test(url)
  }
  static defaultProps = {
    onError: () => {},
    autoplay: 0
  }
  constructor(props){
    super(props);

    this.setQuality = true;
  }
  componentDidMount () {
    const  url = this.props.VideoPlayerStore.currentURL;
    if (!url) {
      this.preloading = true
      this.load(BLANK_VIDEO_URL)
    }else{
      this.load(url)
    }
    this.props.VideoPlayerStore.onMountEvents =
    {
      seekTo: this.seekTo,
      togglePlay: this.togglePlay,
      setVolume: this.setVolume,
      setSpeed: this.setSpeed,
      setSource: this.setSource,
      setFullScreen: this.setFullScreen,
    };
  }

/* Mount Events here */
seekTo = (t) => {
  this.player.seekTo(t,true);
}
togglePlay = (startPlaying) => {
  if(startPlaying){
    this.player.playVideo();
  }else{
    this.player.pauseVideo();
  }
}
setVolume = (v) => {
  this.player.setVolume(parseInt(v*100));
}
setSpeed = (r) => {
  this.player.setPlaybackRate(r);
}
setSource = (src) => {
  const {VideoPlayerStore} = this.props;
  const val = VideoPlayerStore.qualityArray[VideoPlayerStore.urlIndex].value;
  this.player.stopVideo();
  //this.player.setPlaybackQuality(yTQualityValuetoString(val));
  this.player.setPlaybackQuality("small");
  this.player.playVideo();
}
setFullScreen = (doFullscreen) => {
  this.props.updater.onFullScreen({
      doFullscreen: doFullscreen,
      div: this.ref
    });
}

/* Mount Events ends here */


onTimeUpdate = () => {
  const t = this.player.getCurrentTime();

  this.props.updater.onTimeUpdate(t);
  this.onTimeUpdateTimer = setTimeout(()=>{
    if(this.player.getPlayerState() === 1){
      this.onTimeUpdate();
    }
  },500);
}
onPlay = () => {
  this.onTimeUpdate();


  if(this.setQuality){
    const {VideoPlayerStore} = this.props;

    const qualityLevels = this.player.getAvailableQualityLevels();
    const url = VideoPlayerStore.currentUrl;
    let qualityArray = VideoPlayerStore.qualityArray;
    qualityLevels.map((v)=>{
      if(v !== "auto"){
        qualityArray.push({src: url,value: yTQualityStrToInt(v)});
      }
    });
    this.props.VideoPlayerStore.setValue({
      qualityArray: qualityArray
    });
    this.setQuality = false;
  }
}
onPause = () => {
  if(this.onTimeUpdateTimer) {
    clearTimeout(this.onTimeUpdateTimer);
    this.onTimeUpdateTimer = null;
  }
}
onReady = () => {
  this.props.updater.onReady(this.player.getDuration());
}
onWaiting = () => {
  const loaded = this.player.getVideoLoadedFraction(); // fraction
  const duration = this.player.getDuration();
  this.props.updater.onBuffering(loaded * duration);
  this.onWaitingTimeout = setTimeout(()=>{
    if(loaded < 1){
      this.onWaiting();
    }
  },2000);
}
onBuffer = () => {
  this.onWaiting();
  //this.props.updater.onWaiting();
}

  onStateChange = ({ data }) => {
    const { updater } = this.props
    const { PLAYING, PAUSED, BUFFERING, ENDED, CUED } = window[SDK_GLOBAL].PlayerState
    if (data === PLAYING) this.onPlay()
    if (data === PAUSED) this.onPause()
    if (data === BUFFERING) this.onBuffer()
    if (data === ENDED) updater.onEnded()
    if (data === CUED) updater.onReady()
  }
  getSDK () {
     if (window[SDK_GLOBAL] && window[SDK_GLOBAL].loaded) {
       return Promise.resolve(window[SDK_GLOBAL])
     }
     return new Promise((resolve, reject) => {
       const previousOnReady = window[SDK_GLOBAL_READY]
       window[SDK_GLOBAL_READY] = function () {
         if (previousOnReady) previousOnReady()
         resolve(window[SDK_GLOBAL])
       }
       loadScript(SDK_URL, err => {
         if (err) reject(err)
       })
     })
   }
   load (url) {
     const { onError, VideoPlayerStore } = this.props
     const id = url && url.match(MATCH_URL)[1]
     if (VideoPlayerStore.isReady) {
       this.player.cueVideoById({
         videoId: id,
         startSeconds: parseStartTime(url)
       })
       return
     }
     if (this.loadingSDK) {
       this.loadOnReady = url
       return
     }
     VideoPlayerStore.loadingSDK = true
     this.getSDK().then(YT => {
       this.player = new YT.Player(this.container, {
         width: '100%',
         height: '100%',
         videoId: id,
         playerVars: {
           ...DEFAULT_PLAYER_VARS,
           start: parseStartTime(url),
           origin: window.location.origin,
           autoplay: this.props.autoplay
         },
         events: {
           onReady: this.onReady,
           onStateChange: this.onStateChange,
           onError: event => onError(event.data)
         }
       })
     }, onError)
  }
  ref = container => {
     this.container = container
   }
   render () {
     return (<div ref={this.ref} />)
   }
}
export default YouTube;
