import React from 'react';
import { shallow } from 'enzyme';
import {MuiThemeProvider} from 'material-ui/styles';
import ListItem from './ListItem';

describe('ListItem', () => {
  it("Renders ListItem",() => {
    const str = "Hello World";
    const element = shallow(<MuiThemeProvider><ListItem >{str}</ListItem></MuiThemeProvider>);
    expect(element.prop('children')).toEqual(str);
  });
});
