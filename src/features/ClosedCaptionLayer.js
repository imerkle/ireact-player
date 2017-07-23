import React from 'react';
import PropTypes from 'prop-types';

import filter from 'lodash.filter';
import remove from 'lodash.remove';
import uniqBy from 'lodash.uniqby';
import Rnd from 'react-rnd';

import { Div } from 'material-son';
import { withStyles, createStyleSheet } from 'material-ui/styles';

import { SHEET_NAME } from '../constants.js';
import { getCueKeys, getCues } from '../utils/dom.js';

const styleSheet = createStyleSheet(SHEET_NAME.CCLayer,theme => ({
 root: {
   width: '100%',
   height: '90%',
   zIndex: 20
 },
 flaps: {
   color: '#f8f8f8',
   backgroundColor: 'rgba(0,0,0,.8)',
   padding: '10px',
   borderRadius: '4px',
   '&:empty':{
     display: 'none',
   },
 }
}));


@withStyles(styleSheet)
class ClosedCaptionLayer extends React.Component{
  static propTypes = {
    classes: PropTypes.object.isRequired,
    isCaptionOn: PropTypes.bool.isRequired,
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
    if(!this.xhrGot && nextProps.isCaptionOn){
      getCues(nextProps.url,(cues)=>{
        this.cues = getCueKeys(cues);
        this.xhrGot = true;
      })
    }
    if( (nextProps.isCaptionOn && !this.props.isCaptionOn) || (this.props.isCaptionOn && (nextProps.currentTime != this.props.currentTime) ) ){
      //clearTimeout(this.observeTimeout);
      if(!this.observeTimeout){
        this.observeCaption(nextProps);
      }
    }
  }
  observeCaption(props = this.props){
    const cTime = parseInt(props.currentTime) * 1000;
    let newState = this.state.cues;
    newState.push(...filter(this.cues, (o) => { return (cTime>=o.start && cTime<=o.end ) }));
    remove(newState, (o) => { return (cTime>o.end || cTime<o.start) });
    this.setState({cues: uniqBy(newState, 'index') });
    this.observeTimeout = setTimeout(()=>{this.observeTimeout = null},500);
  }
  display = () => {
    return this.state.cues.slice(0,1).map((o,i)=> (o.text) );
  }
  render(){
    const _prefix = this.props._prefix;
    const classes = this.props.classes;

    let out = (this.props.isCaptionOn) ?
    <Div className={`${_prefix}-caption-layer ${classes.root}`}>
      <Rnd default={{x: 20,y: 50,width: 'auto', height: 'auto'}} enableResizing={0} bounds="parent">
        <Div className={`${_prefix}-unhinder ${classes.flaps}`}>{this.display()}</Div>
      </Rnd>
    </Div> : null;

    return (out);
  }
}
export default ClosedCaptionLayer;
