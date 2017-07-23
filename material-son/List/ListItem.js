// @flow
import React from 'react';
import PropTypes from 'prop-types';
import {List,ListItem} from 'material-ui';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import classNames from 'classnames';

import Fa from '../FaDiv/Fa';

const styleSheetExport = createStyleSheet('OverridesClassNames',{
  gutters: {
    padding: "4px 16px"
  }
});

const AList = (props) => {
  const {classes, className, isVisible,...other} = props;
  return(
    <List className={classNames(
      classes.root,
      {[classes.visible]: isVisible},
      {[classes.invisible]: !isVisible},
      className
    )} {...other}>
      {other.children}
    </List>
  );
}

const AnimateList = withStyles(createStyleSheet('MsonLists',{
  root: {
    "transition": ".15s linear max-height",
    "overflow": "hidden"
  },
  visible: {
    "max-height": "350px"
  },
  invisible: {
    "max-height": "0",
    "padding": "0px",

  }
}))(AList);

class WListItem extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      isVisible: false
    };
  }
  static defaultProps = {
    nestedItems: []
  }
  static propTypes = {
    nestedItems: PropTypes.array
  }
  render(){
    const {nestedItems,...others} = this.props;
    let nest;
    if(nestedItems.length > 0){
      nest = (
        <AnimateList isVisible={this.state.isVisible}>
          {nestedItems.map((n)=>{
            return n;
          })}
        </AnimateList>
      );
      others.onClick = () => {
        this.setState({
          isVisible: !this.state.isVisible
        });
      };
    }
    let out;
    if(nest){
      out = (<ListItem {...others}>
        <Fa>
          {others.children}
        </Fa>
        <Fa fs>
          {nest}
        </Fa>
      </ListItem>)
    }else{
        out = (
          <ListItem {...others}>
            {others.children}
          </ListItem>
        )
    }
    return( out );
  }
}
export default withStyles(styleSheetExport)(WListItem);
