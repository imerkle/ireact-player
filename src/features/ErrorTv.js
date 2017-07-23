import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import { Fa } from 'material-son';

import { SHEET_NAME } from '../constants.js';

const styleSheet = createStyleSheet(SHEET_NAME.ERROR, {
  wrapper: {
    position: "absolute",
  	width: "100%",
  	height: "100%",
  	display: "flex",
  	alignItems: "center",
  	justifyContent: "center",
  },
  innerText: {
    position: "absolute",
  	color: "#FFF",
  	fontSize: "30px",
  	fontWeight: "bold",
  },
  canvas: {
    visibility: "visible!important",
  	height: "100%",
  	width: "100%",
    background: "#000",
  }
});

@withStyles(styleSheet)
class ErrorTv extends React.Component{
  static propTypes = {
    isError: PropTypes.bool.isRequired,
    errorText: PropTypes.string,
    _prefix: PropTypes.string.isRequired,
    width: PropTypes.number,
    height: PropTypes.number,
  }
  static defaultProps = {
    isError: false,
    errorText: 'There was an error in loading the Video.',
    _prefix: 'ut',
    width: 840,
    height: 400,
  }
  constructor(props){
    super(props);
  }
  componentDidMount(){
    this.prepareNoise();
  }
  prepareNoise = () => {
    this.w = this.errortvcanvas.width;
    this.h = this.errortvcanvas.height;

    this.ocanvas.width = this.w<<1;
    this.ocanvas.height = this.h<<1;

    const octx = this.ocanvas.getContext("2d", {alpha: false});
    this.idata = octx.createImageData(this.ocanvas.width, this.ocanvas.height);
    this.buffer32 = new Uint32Array(this.idata.data.buffer);
    this.noise(octx);

    this.ctx = this.errortvcanvas.getContext("2d", {alpha: false});
    this.loopTv();
  }

  loopTv = () => {

    const x = (this.w * Math.random())|0;
    const y = (this.h * Math.random())|0;

    this.ctx.drawImage(this.ocanvas, -x, -y);
    if(this.props.isError) window.requestAnimationFrame(this.loopTv);

    this.noise(this.ctx);
  }
  noise = (ctx) => {
    var len = this.buffer32.length - 1;
    while(len--) this.buffer32[len] = Math.random() < 0.5 ? 0 : -1>>0;
    ctx.putImageData(this.idata, 0, 0);
  }
  render(){
    const { classes } = this.props;
    return (
      <div className={`${classes.wrapper} ${(this.props.isError) ? "" : "invisible" }`}>
        <div className={`${classes.innerText}`}>{this.props.errorText}</div>
        <canvas ref={(ref)=>{this.errortvcanvas = ref}} className={`${classes.canvas}`}></canvas>
        <canvas ref={(ref)=>{this.ocanvas = ref}} className={`invisible`}></canvas>
      </div>
    );
  }
}
export default ErrorTv;
