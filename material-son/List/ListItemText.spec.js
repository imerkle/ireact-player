import React from 'react';
import { shallow } from 'enzyme';
import {MuiThemeProvider} from 'material-ui/styles';
import ListItemText from './ListItemText';

describe('ListItemText', () => {
  it("Renders ListItemText",() => {
    const str = "Hello World";
    const element = shallow(<MuiThemeProvider><ListItemText primary={str} /></MuiThemeProvider>);
    expect(element.prop('primary')).toEqual(str);
  });
});
