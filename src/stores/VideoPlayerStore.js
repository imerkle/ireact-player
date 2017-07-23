import {observable,action,computed} from 'mobx';
import findIndex from 'lodash.findindex';


class VideoPlayerStore{

  @observable urlIndex;
  @observable qualityArray;

  @observable isPlaying = false;
  @observable isFullScreen = false;
  @observable doLoop = false;

  @observable screenType = 0;
  @observable isBuffering = false;
  @observable isReady = false;
  @observable isLoadingSDK = false;
  @observable isError = false;

  @observable tLoaded = 0.0;
  @observable tCurrent = 0.0;
  @observable tTotal = 0.0;

  @observable vCurrent;

  @observable speed = 1;

  @observable hoveredLeft = 0.0;
  @observable hoveredTransform = 0.0;
  @observable hoveredDirection = true;
  @observable mouseIsDown = false;
  @observable beginanimate = false;

  @observable _prefix;

  @observable isOverPlayer = false;

  @observable isSettingsOpen = false;


  @observable isAnnotation = false;
  @observable canBeAnnotation = true;

  @observable isAutoQuality = false;
  @observable canBeAutoQuality = true;

  @observable isCaptionOn = false;
  @observable canBeCaption = true;



  constructor({url,_prefix="ut",vCurrent=1.0,autoQuality=true,annotation_url = null,caption_url = null} = {}){
    this.player = null;
    if(!(url instanceof Array)){
      url = [{src: url,value: "auto",label: "Auto",default: true}];
    }

    this.urlIndex = findIndex(url,(o)=>{return o.default === true}) || 0;
    this.qualityArray = url;

    this.vCurrent = vCurrent;
    this._prefix = _prefix;
    this.isAutoQuality = autoQuality;
    if(!annotation_url) this.canBeAnnotation = false;
    if(!caption_url) this.canBeCaption = false;


    this.onMountEvents = {};

    url.map((n)=>{
      if(!n.size || !n.duration){
        this.canBeAutoQuality = false;
        this.isAutoQuality = false;
        return;
      }
    });


  }
  @action setValue = (stores) => {
    let self = this;
    for (let key in stores) {
        self[key] = stores[key];
    }
  }
  @computed get currentURL(){
    return this.qualityArray[this.urlIndex].src;
  }

  @computed get currentTransform(){
    return this.tCurrent/this.tTotal;
  }
  @computed get loadedTransform(){
    return this.tLoaded/this.tTotal;
  }
  @computed get handleTransform(){
    return this.currentTransform*100;
  }
  @action togglePlay = (bool = false,force = false) => {

    this.isPlaying = (force) ?  bool : !(this.isPlaying);
    if(this.isPlaying){
      this.isEnded = false;
    }
    this.onMountEvents.togglePlay(this.isPlaying);
  }
  @action setVolume = (fraction) => {
    this.vCurrent = fraction;
    this.onMountEvents.setVolume(this.vCurrent);
  }
  @action setSpeed = (fraction) => {
    this.speed = fraction;
    this.onMountEvents.setSpeed(this.speed);
  }
  @action setSource = (urlIndex) => {
    this.urlIndex = urlIndex;
    this.isReady = false;
    this.fixTime = this.tCurrent;

    const qA = this.qualityArray[this.urlIndex];
    this.onMountEvents.setSource(qA.src);
  }
  @action fixTimeAfterSourceChange = () => {
    if(this.fixTime){
        this.seekTo(this.fixTime);
        this.fixTime = null;
        this.togglePlay(this.isPlaying,true);
    }
  }
  @action toggleFullscreen = (bool = false,force = false) => {
    this.isFullScreen = (force) ?  bool : !(this.isFullScreen);
    this.onMountEvents.setFullScreen(this.isFullScreen);
  }
  @action seekTo = (t) => {
    /*when i extennally change time by sliding and shit*/
    this.tCurrent = t;
    this.onMountEvents.seekTo(this.tCurrent);
  }
  @action setCurrentTime = (t) => {
    /*when time is updated by dom in timeupdate*/
    this.tCurrent = t;
  }
  @action setLoaded = (t) => {
    this.tLoaded = t;
  }
}
export default VideoPlayerStore;
