import React from 'react';
import PropTypes from 'prop-types';

import { offset, getPageX, getCssMatrix, secondsToTimeCode, limitBetween } from '../utils/dom.js';
import { createStyleSheet, withStyles } from 'material-ui/styles';
import cx from 'classnames';

const _4pxBorder = {borderRadius: '4px'};
const styleSheet = createStyleSheet('MsonSlider',theme => ({
  mouseIsDown:{},
  negative:{},
  handle:{},
  current: {
    background: theme.vplayer.primaryColorVolume,
    ..._4pxBorder,
  },
  loaded: {
    background: theme.vplayer.loadedColor,
  },
  total: {
    background: theme.vplayer.totalColor,
    ..._4pxBorder,
    position: 'relative',
		display: 'flex',
		alignItems: 'center',
		height: theme.vplayer.totalheightVolume,
  },
  hovered: {
    background: theme.vplayer.hoveredColor,
    opacity: 0,
    zIndex: 2,
    '& $negative': {
       background: theme.vplayer.negativehoveredColor,
    }
  },
  rails: {
    position: 'relative',
    padding: '0px',
    boxSizing: 'border-box',
    cursor: 'pointer',
    zIndex: '1',
    '&$mouseIsDown':{
      '& $current':{
        transition: 'none'
      },
      '& $handle':{
        transition: 'none'
      },
      '& $handle_baby':{
        transition: 'none',
        transform: 'scale(1)',
      },
    },
    '&:hover':{
      '& $handle_baby':{
        transform: 'scale(1)',
      },
      '& $hovered':{
        opacity: '1'
      },
    },
  },
  handle_baby: {
    width: theme.vplayer.handleDimension,
    height: theme.vplayer.handleDimension,
    transform: 'scale(1)',
    borderRadius: '50%',
    border: `${theme.vplayer.handleBorderVolume} solid ${theme.vplayer.primaryColorVolume}`,
    background: theme.vplayer.primaryColorLightVolume,
  },
  transition: {
    transition: 'all .15s ease-in'
    //.ut-loaded, .ut-current,.ut-handle,.ut-handle-baby{
  },
  bars: {
    //.ut-loaded, .ut-current,.ut-hovered{
    height: '100%',
    width: '100%',
    position: 'absolute',
    left: '0',
    transform: 'scaleX(0)',
    transformOrigin: '0 0',
  },
  handle_root: {
    /*SO/21557476 some genius shit here dont worry bout it*/
     position: 'absolute',
     width: '100%',
     zIndex: '4',
  },
  handles: {
    //.ut-handle,.ut-handle-baby{
      zIndex: '11',
      transform: 'translateX(0px)',
      borderRadius: '50%',
  },
}));

@withStyles(styleSheet)
class Slider extends React.Component{
  constructor(props){
    super(props);
      this.state = {
        mouseIsDown: false,
        percentage: props.value,
      };
    }
  static propTypes = {
    classes: PropTypes.object.isRequired,
    onDown: PropTypes.func,
    onUp:  PropTypes.func,
    onMove:  PropTypes.func,
    onMouseLeave:  PropTypes.func,
    onMouseEnter:  PropTypes.func,
    isReady: PropTypes.bool,
    step: PropTypes.number,
    labelArray: PropTypes.array,
    middleMouse: PropTypes.bool,
    speedFactor: PropTypes.number,
    hasHovered: PropTypes.bool,
    hasLoaded: PropTypes.bool,
  }
  static defaultProps = {
    onDown: ()=>{},
    onUp: ()=>{},
    onMove: ()=>{},
    onMouseEnter: ()=>{},
    onMouseLeave: ()=>{},
    isReady: true,
    middleMouse: false,
    speedFactor: 10,
    hasHovered: false,
    hasLoaded: false,
  }
  render(){
    const { _prefix, classes, hasHovered, hasLoaded, hoveredDirection, hoveredLeft, hoveredTransform, loadedTransform } = this.props;
    let mouseisDownClass = (this.state.mouseIsDown) ? classes.mouseIsDown : "";

    return(
       <div
          className={cx(
            classes.rails,
            {[classes.mouseIsDown]: this.state.mouseIsDown}
          )}

          onMouseDown={(e)=>{this.handleMouseDown(e)}}
          onMouseUp={(e) => {this.handleMouseup(e)}}
          onMouseMove={(e) => {this.handleMouseMove(e)}}
          onMouseLeave={() => {this.handleMouseLeave()}}
          onMouseEnter={() => {this.handleMouseEnter()}}
          onWheel={(e)=>{this.handleScroll(e)}}
         >
          <div className={cx(classes.total)} ref={(ref)=>{this.total = ref}}>
            {
              (hasHovered) ?
              <div
                className={cx(
                  classes.hovered,
                  classes.bars,
                  {[classes.negative]: !hoveredDirection},
                )}
              style={{
                left: `${hoveredLeft}px`,
                transform: `scaleX(${hoveredTransform})`
              }}></div> : ""
           }
           {
             (hasLoaded) ?
              <div className={cx(
                classes.loaded,
                classes.bars,
                classes.transition
              )}
                style={{transform: `scaleX(${loadedTransform})`}}></div>
              : ""
            }
            <div className={cx(
              classes.current,
              classes.bars,
              classes.transition)}
              style={{transform: `scaleX(${this.props.value})`}}></div>
            <div className={cx(classes.handle_root)}>
              <div
                className={cx(
                  classes.handle,
                  classes.handles,
                  classes.transition)}
                ref={(ref) => {this.handle = ref}}
                style={{transform: `translateX(${this.props.value*100}%)`}} >
                <div className={cx(
                  classes.handle_baby,
                  classes.handles,
                  classes.transition
                )}></div>
              </div>
            </div>
          </div>
        </div>
      );
  }
  handleScroll = (e) => {
    const { middleMouse, speedFactor } = this.props;

      if(middleMouse){
        const { nativeEvent } = e;
        const { deltaY } = nativeEvent;

        const plusMinus = (deltaY > 0) ? -1 : 1;
        let percentage = limitBetween(( speedFactor/100 * plusMinus ) + this.state.percentage,0,1);

        this.setState({ percentage });
        this.props.onMove(percentage);
        e.preventDefault();
        return false;
    }
  }
  handleSliderMove = (e) => {
    if(!this.props.isReady || !this.total){
      return false;
    }
    let x = getPageX(e),
            pos,
            percentage;

        const totalStyles = getComputedStyle(this.total),
        offsetStyles = offset(this.total),
        width = this.total.offsetWidth;


        if (x < offsetStyles.left) {
          x = offsetStyles.left;
        } else if (x > width + offsetStyles.left) {
          x = width + offsetStyles.left;
        }
        pos = x - offsetStyles.left;
        percentage = (pos / width);

        this.setState({ percentage });
        if(this.props.hasHovered || this.state.mouseIsDown){
          this.props.onMove(percentage,totalStyles,pos,this.state.mouseIsDown,this.handle);
        }
  }
  handleMouseMove = (e) => {
    if(!this.state.mouseIsDown){
      document.removeEventListener("mousemove",this.handleSliderMove);
    }
    this.handleSliderMove(e);
  }
  handleMouseLeave = () => {
    const { middleMouse } = this.props;

    if(this.state.mouseIsDown){
      document.addEventListener("mousemove",this.handleSliderMove);
      document.addEventListener("mouseup",this.handleSliderUp);
    }
    this.props.onMouseLeave();
  }
  handleMouseEnter = () => {
    this.props.onMouseEnter();
  }
  handleMouseDown = (e) => {
    e.preventDefault();
    if(parseInt(e.button) != 0){
      return false;
    }
    this.setState({mouseIsDown: true});
    this.props.onDown(this.state.percentage);
  }
  handleMouseup = (e) => {
    e.preventDefault();
    this.handleSliderUp();
    document.removeEventListener("mouseup",this.handleSliderUp);
  }
  handleSliderUp = () => {


    this.props.onUp(this.state.percentage);
    this.setState({mouseIsDown: false});
    document.removeEventListener("mousemove",this.handleSliderMove);
    document.removeEventListener("mouseup",this.handleSliderUp);
  }
}
export default Slider;
