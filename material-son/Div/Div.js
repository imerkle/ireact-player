//@flow weak

import React from 'react';
import PropTypes from 'prop-types';

const Div = (props) => {
  const {children, ...other} = props;
  return(
    <div
       {...other}>
      {children}
    </div>
  );
  FaFlexbox.defaultProps = {
    children: null
  }
  FaFlexbox.propTypes = {
    children: PropTypes.node,
  }
}

export default Div;
