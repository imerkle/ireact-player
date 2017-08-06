import React from 'react';
import PropTypes from 'prop-types';

import { offset, getPageX, getCssMatrix, secondsToTimeCode, limitBetween } from '../utils/dom.js';
class Slider extends React.Component{
  constructor(props){
    super(props);
      this.state = {
        mouseIsDown: false,
        percentage: props.value,
      };
    }
  static defaultProps = {
    onDown: ()=>{},
    onUp: ()=>{},
    onMove: ()=>{},
    onMouseEnter: ()=>{},
    onMouseLeave: ()=>{},
    isReady: true,
    totalChild: "",
    doHover: false,
    middleMouse: false,
    speedFactor: 10,
  }

  static propTypes = {
    onDown: PropTypes.func,
    onUp:  PropTypes.func,
    onMove:  PropTypes.func,
    onMouseLeave:  PropTypes.func,
    onMouseEnter:  PropTypes.func,
    isReady: PropTypes.bool,
    doHover: PropTypes.bool,
    step: PropTypes.number,
    labelArray: PropTypes.array,
    middleMouse: PropTypes.bool,
    speedFactor: PropTypes.number,
  }
  render(){
    let _prefix= this.props._prefix;
    let mouseisDownClass = (this.state.mouseIsDown) ? "mouseIsDown" : "";

    return(
       <div
          className={`${_prefix}-rails ${mouseisDownClass}`}
          onMouseDown={(e)=>{this.handleMouseDown(e)}}
          onMouseUp={(e) => {this.handleMouseup(e)}}
          onMouseMove={(e) => {this.handleMouseMove(e)}}
          onMouseLeave={() => {this.handleMouseLeave()}}
          onMouseEnter={() => {this.handleMouseEnter()}}
          onWheel={(e)=>{this.handleScroll(e)}}
         >
          <div className={`${_prefix}-total`} ref={(ref)=>{this.total = ref}}>
            {this.props.totalChild}
            <div className={`${_prefix}-current`} style={{transform: `scaleX(${this.props.value})`}}></div>
            <div className={`${_prefix}-handle-wrapper`}>
              <div className={`${_prefix}-handle`} ref={(ref) => {this.handle = ref}} style={{transform: `translateX(${this.props.value*100}%)`}}>
                <div className={`${_prefix}-handle-baby`}></div>
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
        if(this.props.doHover || this.state.mouseIsDown){
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
