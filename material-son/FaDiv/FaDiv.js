//@flow weak

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import classNames from 'classnames';
import { Div } from '../Div';

console.log(withStyles);

const styleSheetExport = createStyleSheet('FaDivFlexbox', {
  fc: {
    display: "flex"
  },
  r: {
    "flex-flow": "row"
  },
  c: {
    "flex-flow": "column"
  },
  fa: {
    flex: "0 1 auto"
  },
  fs: {
    flex: "1 1 auto"
  }
});

const FaDivFlexbox = (props) => {
  const {children, classes, className, r, c, fa, fs,...other} = props;
  return(
    <Div
      className={classNames(
        classes.fc,
         {[classes.r]: !c },
         {[classes.c]: c},
         {[classes.fa]: fa },
         {[classes.fs]: fs },
        className)}
       {...other}>
      {children}
    </Div>
  );
  FaDivFlexbox.defaultProps = {
    c: false,
    fa: false,
    fs: false,
  }
  FaDivFlexbox.propTypes = {
    children: PropTypes.node.isRequired,
    c: PropTypes.bool,
    fa: PropTypes.bool,
    fc: PropTypes.bool,

  }
}

export default withStyles(styleSheetExport)(FaDivFlexbox)
