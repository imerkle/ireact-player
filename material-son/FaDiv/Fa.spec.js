// @flow

import React from 'react';
import { shallow } from 'enzyme';
import {MuiThemeProvider} from 'material-ui/styles';
import Fa from './Fa';

describe('Fa', () => {
  it("Renders Fa",() => {
    const str = "Hello World";
    const element = shallow(<MuiThemeProvider><Fa >{str}</Fa></MuiThemeProvider>);
    expect(element.prop('children')).toEqual(str);
  });
  it("Renders With Props",() => {
    const str = "Hello World";
    const element = shallow(<MuiThemeProvider><Fa fs>{str}</Fa></MuiThemeProvider>);
    expect(element.prop('children')).toEqual(str);
  });
});
