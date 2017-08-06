import React from 'react'
import PropTypes from 'prop-types';

import {inject,observer} from 'mobx-react'

import Hls from 'hls.js';
import dashjs from 'dashjs';
//import Base from './Base'

const getAverageBufferedFactor = (range, depth) => {
  const newRange = range.slice(Math.max(range.length - depth, 1));
  let average = 0;
  newRange.map((r)=>{
    average += r.end - r.start;
  });
  return average/newRange.length;
}

const makeLinearGradient = ({color1,color2, y0 = 20, y1=45}) => {
  const ctx = document.createElement('canvas').getContext('2d');
  const l = ctx.createLinearGradient(0, y0, 0, y1);
        l.addColorStop(0, color1);
        l.addColorStop(.5, color2);
        l.addColorStop(1, color1);
  return l;
}

const AUDIO_EXTENSIONS = /\.(m4a|mp4a|mpga|mp2|mp2a|mp3|m2a|m3a|wav|weba|aac|oga|spx)($|\?)/i
const HLS_EXTENSIONS = /\.(m3u8)($|\?)/i
const DASH_EXTENSIONS = /\.(mpd)($|\?)/i

@inject('VideoPlayerStore') @observer
export default class FilePlayer extends React.Component {
  static defaultProps = {
    _prefix: "ut"
  }
  static propTypes = {
    _prefix: PropTypes.string
  }
  static canPlay = (url) => {
    return true
  }
  constructor(props){
    super(props);

    this.eachSecondWorthMB = 0;
    this.bufferedRanges = [{start: 0, end: 0}];
  }
  componentDidMount(){
    this.player.addEventListener("canplay",this.onReady);
    this.player.addEventListener("waiting",this.onWaiting);
    this.player.addEventListener("timeupdate",this.onTimeupdate);
    this.player.addEventListener("ended",this.onEnded);

    ["error"].map((n)=>{
      this.player.addEventListener(n,this.onError);
    });
    const { VideoPlayerStore } = this.props;
    VideoPlayerStore.onMountEvents =
    {
      togglePlay: this.togglePlay,
      seekTo: this.seekTo,
      setVolume: this.setVolume,
      setSpeed: this.setSpeed,
      setSource: this.setSource,
      setFullScreen: this.setFullScreen,
    };
    this.load(VideoPlayerStore.currentURL);
  }

  togglePlay = (startPlaying) => {
    if(startPlaying){
      this.player.play();
    }else{
      this.player.pause();
    }
  }
  setVolume = (fraction) => {
    this.player.volume = fraction;
  }
  seekTo = (seekTime) => {
    this.player.currentTime = seekTime;
  }
  setSpeed = (fraction) => {
    this.player.playbackRate = fraction;
  }
  setSource = (source) => {
    this.player.src = source;
    this.eachSecondWorthMB = this.eachSecondWorth();
    if(this.bufferingTimer){
      clearTimeout(this.bufferingTimer);
    }
  }
  setFullScreen = (doFullscreen) => {
    this.props.updater.onFullScreen({
        doFullscreen: doFullscreen,
        div: this.player,
      });
  }

  /*Mount evends end*/

  onReady = () => {
    this.props.updater.onReady(this.player.duration);

    this.eachSecondWorthMB = this.eachSecondWorth();
    this.startBuffering();
  }
  onWaiting = () => {
    this.props.updater.onWaiting();
  }
  onTimeupdate = () => {
    this.props.updater.onTimeUpdate(this.player.currentTime);

    const {VideoPlayerStore} = this.props;
    //some optimizations
    if(VideoPlayerStore.showNerdStats){
      const decodedFrames = this.getDecodedFrame();
      VideoPlayerStore.setValue({
        droppedFrames: this.getDroppedFrame(),
        decodedFrames: (decodedFrames > VideoPlayerStore.maxFrames) ? VideoPlayerStore.maxFrames : decodedFrames
      });
    }
  }
  onEnded = () => {
    this.props.updater.onEnded();
  }
  onError = () => {
    this.props.updater.onError();
  }

  startBuffering = () => {
    const {VideoPlayerStore} = this.props;
    const seconds_factor = 1;
    const average_depth = 6;
    const auto_modulus = 5;
    if(VideoPlayerStore.isReady && (VideoPlayerStore.tLoaded < VideoPlayerStore.tTotal || VideoPlayerStore.tLoaded == 0) ){
      const b_len = this.player.buffered.length - 1;
      const b_start = this.player.buffered.start(b_len);
      const b_end = this.player.buffered.end(b_len);
      const bufferedSeconds = b_end;

      this.props.updater.onBuffering(bufferedSeconds);



      if(VideoPlayerStore.isAutoQuality || VideoPlayerStore.showNerdStats){

        /*Some crazy workaround i wrote so dont even fuckin bother*/

        /*push all buffered data*/
        const prev_b_end = this.bufferedRanges[this.bufferedRanges.length - 1].end
        if(prev_b_end != b_end && b_end > prev_b_end){
          this.bufferedRanges.push({start: prev_b_end, end: b_end});
        }

        const divide_factor = 1.4;
        const bRange = getAverageBufferedFactor(this.bufferedRanges, average_depth);

        const kbps = parseFloat(((bRange/seconds_factor * this.eachSecondWorthMB) * 1000).toFixed(4));
        VideoPlayerStore.setValue({
          kbps: kbps
        });
        /*Ends damn */

        /*modify quality every auto_modulus seconds*/
        if(this.bufferedRanges.length % auto_modulus === 0){
          let newUrlIndex;

          VideoPlayerStore.qualityArray.slice(0).reverse().map((n,i)=>{
            if(!newUrlIndex && kbps >= (n.size/n.duration * 1000 )/divide_factor ){
              newUrlIndex = VideoPlayerStore.qualityArray.length - 1 - i;
            }
          });

          if(newUrlIndex && VideoPlayerStore.urlIndex != newUrlIndex){
            const bufferHealth = VideoPlayerStore.tLoaded - VideoPlayerStore.tCurrent;
            if(bufferHealth < 5){
              //VideoPlayerStore.setSource(newUrlIndex);
            }
          }
        }
      }

      this.bufferingTimer = setTimeout(this.startBuffering,seconds_factor*1000);
    }
  }
  eachSecondWorth = () => {
    return this.getCurrentSize() / this.props.VideoPlayerStore.tTotal;
  }
  getCurrentSize = () => {
    const {VideoPlayerStore} = this.props;
    return VideoPlayerStore.qualityArray[VideoPlayerStore.urlIndex].size || 0;
  }
  getDroppedFrame(){
    return this.player.webkitDroppedFrameCount || 0;
  }
  getDecodedFrame(){
    return this.player.webkitDecodedFrameCount || this.player.mozDecodedFrames || 0;
  }


  ref = (player) => {
    this.player = player;
  }
  render(){
    const {VideoPlayerStore} = this.props;

    const qualityArray = VideoPlayerStore.qualityArray;
    const urlIndex = VideoPlayerStore.urlIndex;

    const useAudio = AUDIO_EXTENSIONS.test(VideoPlayerStore.currentURL)
    const Element = useAudio ? 'audio' : 'video'

    return (
      <Element
        ref={this.ref}
        preload='auto'
        loop={VideoPlayerStore.doLoop}
      >
        {this.renderSource(qualityArray[urlIndex])}
      </Element>
    );
  }
  renderSource = (source) => {
    const { src, value,type } = source
    return <source src={src} type={type} />
  }
  load = (url) => {
    let hls = new Hls();
    if (this.shouldUseHLS(url)) {
        hls.loadSource(url);
        hls.attachMedia(this.player);
    }
    if (this.shouldUseDASH(url)) {
        const player = dashjs.MediaPlayer().create()
        player.getDebug().setLogToBrowserConsole(false)
        player.initialize(this.player, url, false)
    }
  }
  shouldUseHLS (url) {
    return HLS_EXTENSIONS.test(url)
  }
  shouldUseDASH (url) {
    return DASH_EXTENSIONS.test(url)
  }
}
