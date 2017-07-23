import React from 'react';
import PropTypes from 'prop-types';


import filter from 'lodash.filter';
import remove from 'lodash.remove';
import uniqBy from 'lodash.uniqby';
import { withStyles, createStyleSheet } from 'material-ui/styles';

import { IconDiv, Div } from 'material-son';

import { SHEET_NAME } from '../constants.js';
import { getCueKeys, getCues } from '../utils/dom.js';


const defaultStyleAttributes = {
  left: "0%",
  top: "0%",
  width: "150px",
  height: "150px",
  fontSize: "14px",
  fontFamily: "inherit",
  color: "rgba(255,255,255,1)",
  backgroundColor: "rgba(0,0,0,.6)",
  borderWidth: "0px",
  borderColor: "rgba(255,255,255,1)",
  padding: "4px",
  borderRadius: "0px",
  cursor: 'pointer',
  '&:hover': {
    opacity: .5
  }
};
const styleSheet = createStyleSheet(SHEET_NAME.ANN, {
  root: {
    height: '90%',
    width: '100%',
    zIndex: 1

  },
  flaps: defaultStyleAttributes,
  innerText: {
    padding: '10px',
  }
});


@withStyles(styleSheet)
class Annotation extends React.Component{
  static propTypes = {
    isAnnotation: PropTypes.bool.isRequired,
    url: PropTypes.string.isRequired,
    duration: PropTypes.number.isRequired,
    currentTime: PropTypes.number.isRequired,
    _prefix: PropTypes.string,
  }
  static defaultProps = {
    _prefix: "ut"
  }
  constructor(props){
    super(props);

    this.state = {
      cues: []
    };
    this.observeTimeout = null;
  }
  componentWillReceiveProps(nextProps){
    if(!this.xhrGot && nextProps.isAnnotation){
      getCues(nextProps.url,(cues)=>{
        this.cues = getCueKeys(cues);
        this.xhrGot = true;
      })
    }
    if( (nextProps.isAnnotation && !this.props.isAnnotation) || (this.props.isAnnotation && (nextProps.currentTime != this.props.currentTime) ) ){
      //clearTimeout(this.observeTimeout);
      if(!this.observeTimeout){
        this.observeAnnotation(nextProps);
      }
    }
  }
  observeAnnotation(props = this.props){
    const cTime = parseInt(props.currentTime) * 1000;
    let newState = this.state.cues;
    newState.push(...filter(this.cues, (o) => { return (cTime>=o.start && cTime<=o.end ) }));
    remove(newState, (o) => { return (cTime>o.end || cTime<o.start) });
    this.setState({cues: uniqBy(newState, 'index') });
    this.observeTimeout = setTimeout(()=>{this.observeTimeout = null},500);
  }
  display = () => {
    const classes = this.props.classes;

    return this.state.cues.map((o,i)=>
        (
          (o.hide) ?  "" :
          <IconDiv className={`${this.props._prefix}-unhinder`} onIconClick={()=>{
            let cues = this.state.cues;
            cues[i].hide = true;
            this.setState(cues: cues);
           }} className={classes.flaps} key={i} style={o.style}>
            <Div className={classes.innerText}>{o.text}</Div>
          </IconDiv>
        )
    );
  }
  render(){
    const _prefix = this.props._prefix;
    const classes = this.props.classes;

    let out = (this.props.isAnnotation) ?
    <Div className={`${_prefix}-annotation-layer ${classes.root}`}>
      {this.display()}
    </Div> : null;

    return (out);
  }
}
export default Annotation;
