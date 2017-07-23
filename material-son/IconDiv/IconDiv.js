//@flow weak

import React from 'react';
import PropTypes from 'prop-types';
import {IconButton, Icon} from 'material-ui';
import { default as FaDiv, Fa} from '../FaDiv';

class IconDiv extends React.Component{
  static propTypes = {
    onIconClick: PropTypes.func.isRequired,
    icon: PropTypes.string,
  }
  static defaultProps = {
    icon: 'close'
  }
  constructor(props){
    super(props);
  }
  render(){
    const {children, icon, onIconClick,...other} = this.props;

    return (
      <FaDiv {...other}>
        <Fa fs>
          {children}
        </Fa>
        <Fa>
          <IconButton onClick={onIconClick}><Icon>{icon}</Icon></IconButton>
        </Fa>
      </FaDiv>
    );
  }
}
export default IconDiv;
