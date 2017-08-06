class BaseStoreUpdater{
  constructor({store}={}){
    this.store = store;
  }
  onReady = (duration) => {
    const p = this.store.qualityArray[this.store.urlIndex];
    const fps = (p) ? p.fps : 24;

    this.store.setValue({
      isReady: true,
      tTotal: duration,
      maxFrames: (duration * fps).toFixed(0)
    });
    this.store.fixTimeAfterSourceChange();
  }
  onWaiting = () => {
    this.store.setValue({ isBuffering: true });
  }
  onTimeUpdate = (t) => {
    this.store.setCurrentTime(t);
    this.store.setValue({ isBuffering: false, isError: false });
  }
  onEnded = () => {
    if(this.store.doLoop){
      this.store.seekTo(0);
    }else{
      this.store.setValue({
        isEnded: true,
        isPlaying: false
      });
    }
  }
  onBuffering = (s) =>{
    this.store.setLoaded(s);
  }
  onError = () => {
    this.store.setValue({
      isError: true
    });
  }
  onFullScreen = ({doFullscreen, div} = {}) => {
    let player = div.closest(`.${this.store._prefix}-player`);
    if(doFullscreen){
      if(player.mozRequestFullScreen){
        player.mozRequestFullScreen();
      }else{
        player.webkitRequestFullScreen();
      }
    }else{
      if(document.mozCancelFullScreen){
        (document.mozCancelFullScreen||document.cancelFullScreen).call(document);
      }else{
        (document.webkitCancelFullScreen||document.cancelFullScreen).call(document);
      }
    }
  }
}
export default BaseStoreUpdater;
