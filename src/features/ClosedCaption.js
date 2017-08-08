import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import { Fa } from 'material-son';

import { SHEET_NAME } from '../constants.js';

const styleSheet = createStyleSheet(SHEET_NAME.CC,theme => ({
  isCaptionOn: {
    borderBottom: `2px solid ${theme.vplayer.primaryColor}`
  }
}));
@withStyles(styleSheet)
class ClosedCaption extends React.Component{
  static propTypes = {
    makeButton: PropTypes.func.isRequired,
    onCaptionClick: PropTypes.func.isRequired,
    isCaptionOn: PropTypes.bool.isRequired,
  }
  constructor(props){
    super(props);
  }
  render(){
    return (
      <Fa className={(this.props.isCaptionOn)? `${this.props.classes.isCaptionOn}` : ""} >
        {
          this.props.makeButton('closed_caption',()=>{this.props.onCaptionClick()},'Closed Caption')
        }
      </Fa>
    );
  }
}
export default ClosedCaption;
