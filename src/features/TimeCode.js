import React from 'react';
import PropTypes from 'prop-types';
import { secondsToTimeCode } from '../utils/dom.js';
import { Fa } from 'material-son';

class TimeCode extends React.Component{
  static propTypes = {
    current: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    separator: PropTypes.string,
  }
  static defaultProps = {
    separator: "/"
  }
  constructor(props){
    super(props);
  }
  render(){
    return (
      <Fa>
        {
          `${secondsToTimeCode(this.props.current)} ${this.props.separator} ${secondsToTimeCode(this.props.total)}`
        }
      </Fa>
    );
  }
}
export default TimeCode;
